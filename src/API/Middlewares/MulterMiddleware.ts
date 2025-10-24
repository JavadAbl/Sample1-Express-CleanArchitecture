import multer, { diskStorage } from "multer";
import { randomUUID } from "crypto";
import { extractExtensionFromFileName } from "#Globals/Utils/AppUtils.js";
import { AppError } from "#Globals/Utils/AppError.js";
import status from "http-status";

export class MulterMiddleware {
  public static get multer() {
    return multer({
      storage: diskStorage({
        destination: "Uploads/Posts",
        filename: (req, file, cb) => {
          const extension = extractExtensionFromFileName(file.originalname);
          if (!extension) return cb(new AppError("Invalid file", status.BAD_REQUEST), "");

          const fileName = randomUUID() + `.${extension}`;

          cb(null, fileName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MiB
    });
  }
}
