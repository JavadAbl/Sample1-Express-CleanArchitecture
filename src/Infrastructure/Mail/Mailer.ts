// src/mailer.ts
import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
import { readFile } from "fs/promises";
import Handlebars from "handlebars";
import { AppError } from "#Globals/Utils/AppError.js";
import { config } from "#Globals/Configs/AppConfig.js";
import { injectable } from "inversify";

@injectable()
export class Mailer {
  private transporter: Transporter;

  constructor() {
    const host = config.MAIL_ADDRESS;
    const port = config.MAIL_PORT;
    const user = config.MAIL_USER;
    const pass = config.MAIL_PASSWORD;

    if (!host || !user || !pass) {
      throw new AppError("Missing required SMTP configuration");
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: false,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });
  }

  /** Send a plain email (text, html, attachments, etc.). */
  async send(options: SendMailOptions): Promise<SentMessageInfo> {
    if (!options.to || !options.subject) {
      throw new AppError("`to` and `subject` are required fields");
    }

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await this.transporter.sendMail(options);
      } catch (err) {
        if (attempt === maxAttempts) throw err;
        const delay = 2 ** attempt * 100; // 200 ms → 400 ms → 80 ms
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    // Unreachable – TypeScript needs a return
    throw new AppError("Unexpected failure in send()");
  }

  /** Render a Handlebars template and send the result as HTML. */
  async sendTemplate(
    templatePath: string,
    context: Record<string, unknown>,
    baseOptions: Omit<SendMailOptions, "html" | "text">,
  ): Promise<SentMessageInfo> {
    const source = await readFile(templatePath, "utf8");
    const compiled = Handlebars.compile(source)(context);
    return this.send({ ...baseOptions, html: compiled });
  }
}

/*
/////////////////////Example Usage
// src/app.ts
import path from "path";
 const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

(async () => {
  const mailer = new Mailer(); // reads env vars automatically

  // 1️⃣ Simple text email
  await mailer.send({
    from: '"Acme Corp" <no-reply@acme.com>',
    to: "work.javadabl@gmail.com",
    subject: "Welcome!",
    text: "Your account has been created.",
  });

  // 2️⃣ HTML email with attachment
  await mailer.send({
    from: '"Acme Corp" <no-reply@acme.com>',
    to: "work.javadabl@gmail.com",
    subject: "Invoice #1234",
    html: "<p>Please find your invoice attached.</p>",
    attachments: [{ filename: "invoice-1234.pdf", path: "/tmp/invoice-1234.pdf" }],
  });
 
  // 3️⃣ Templated email
  const tmpl = path.resolve(__dirname, "templates", "reset-password.hbs");
  await mailer.sendTemplate(
    tmpl,
    { name: "Jane", link: "https://example.com/reset?token=abc" },
    {
      from: '"Acme Support" <support@acme.com>',
      to: "jane@example.com",
      subject: "Password Reset Request",
    },
  ); 
})(); */
