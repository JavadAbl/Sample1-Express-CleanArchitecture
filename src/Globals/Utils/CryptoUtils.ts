import * as bcrypt from "bcryptjs";

export class CryptoUtils {
  private static readonly SALT_ROUNDS = 10;

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
