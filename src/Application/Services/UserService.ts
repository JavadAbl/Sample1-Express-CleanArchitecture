import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { IUserDto, toUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import { AppError } from "#Globals/Utils/AppError.js";
import { UserCache } from "#Infrastructure/Cache/UserCache.js";
import { buildFindManyArgs } from "#Globals/Utils/PrismaUtils.js";
import { UserQueue } from "#Infrastructure/Queue/Queues/UserQueue.js";
import {
  IUserServiceCreate,
  IUserServiceDelete,
  IUserServiceFindByUsername,
  IUserServiceLogin,
  IUserServiceRefreshToken,
  IUserServiceResetPassword,
  IUserServiceResetPasswordValidate,
  IUserServiceUpdate,
} from "#Application/Interfaces/ServiceMethodTypes/UserMethodTypes.js";
import status from "http-status";
import { IUserRepository } from "#Application/Interfaces/Repository/IUserRepository.js";
import { JwtUtil } from "#Globals/Utils/JwtUtils.js";
import { CryptoUtils } from "#Globals/Utils/CryptoUtils.js";
import { Mailer } from "#Infrastructure/Mail/Mailer.js";
import { join } from "path";
import { SentMessageInfo } from "nodemailer";
import { random8AlnumSecure } from "#Globals/Utils/AppUtils.js";
import { IFindByIdService, IFindManyService } from "#Application/Interfaces/ServiceMethodTypes/SharedMethodTypes.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(DITypes.UserRepository) private readonly rep: IUserRepository,
    @inject(DITypes.UserCache) private readonly userCache: UserCache,
    @inject(DITypes.UserQueue) private readonly userQueue: UserQueue,
    @inject(DITypes.Mailer) private readonly mailer: Mailer,
  ) {}

  async resetPassword(criteria: IUserServiceResetPassword): Promise<void> {
    await this.userQueue.resetPasswordEmailJob(criteria);
    return Promise.resolve();
  }

  async refreshToken(criteria: IUserServiceRefreshToken): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = criteria.refreshToken;

    let payload;
    try {
      payload = await JwtUtil.verifyRefreshToken(refreshToken);
    } catch (error: any) {
      throw new AppError("Invalid refresh token", status.UNAUTHORIZED, error);
    }

    return await JwtUtil.createTokens({ userId: payload.userId, username: payload.username });
  }

  async login(criteria: IUserServiceLogin): Promise<{ user: IUserDto; accessToken: string; refreshToken: string } | null> {
    const user = await this.rep.findUnique({ where: { username: criteria.username.toLowerCase() } });

    if (!user) throw new AppError("User not found", status.BAD_REQUEST);

    const isPasswordMatched = await CryptoUtils.verifyPassword(criteria.password, user.password);

    if (!isPasswordMatched) throw new AppError("Invalid password", status.UNAUTHORIZED);

    const tokens = await JwtUtil.createTokens({ userId: user.id, username: user.username });

    const userDto = toUserDto(user);
    this.userCache.addUser(userDto);

    return { user: userDto, ...tokens };
  }

  async findById(criteria: IFindByIdService): Promise<IUserDto> {
    // Try to get user from cache
    const cachedUser = await this.userCache.getUser(criteria.id);
    if (cachedUser) return cachedUser;

    // If not found in cache, get from database
    const user = await this.rep.findUnique({ where: { id: criteria.id } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);
    return toUserDto(user);
  }

  async findByUsername(criteria: IUserServiceFindByUsername): Promise<IUserDto> {
    const user = await this.rep.findUnique({ where: { username: criteria.username } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);
    return toUserDto(user);
  }

  async findMany(criteria: IFindManyService): Promise<IUserDto[]> {
    const args = buildFindManyArgs<"User">(criteria, {
      searchableFields: ["username"],
    });

    return this.rep.findMany(args).then((users) => users.map(toUserDto));
  }

  async create(criteria: IUserServiceCreate): Promise<IUserDto> {
    const existingUser = await this.rep.findUnique({
      where: { username: criteria.username.toLowerCase() },
      select: { id: true },
    });

    if (existingUser) throw new AppError("This user is already exists", status.BAD_REQUEST);

    const hashedPassword = await CryptoUtils.hashPassword(criteria.password);
    criteria.password = hashedPassword;

    const user = await this.rep.create({ data: { ...criteria, username: criteria.username.toLowerCase() } });

    const userDto = toUserDto(user);
    this.userCache.addUser(userDto);

    const tokens = await JwtUtil.createTokens({ userId: user.id, username: user.username });

    return { userDto, ...tokens } as unknown as IUserDto;
  }

  async delete(criteria: IUserServiceDelete): Promise<void> {
    const user = await this.rep.findUnique({ where: { id: criteria.id }, select: { id: true } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);
    await this.rep.delete({ where: { id: criteria.id }, select: { id: true } });
    this.userCache.removeUser(criteria.id);
  }

  async update(criteria: IUserServiceUpdate): Promise<void> {
    const user = await this.rep.findUnique({ where: { id: criteria.id }, select: { id: true } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...updateData } = criteria;
    const updatedUser = await this.rep.update({ data: updateData, where: { id: criteria.id }, omit: { password: true } });

    await this.userCache.removeUser(criteria.id!);
    this.userCache.addUser(updatedUser);
  }

  async sendResetPasswordEmail_JobHandler(criteria: IUserServiceResetPassword): Promise<SentMessageInfo> {
    let user;

    if (criteria.email)
      user = await this.rep.findUnique({ where: { email: criteria.email }, select: { id: true, username: true } });
    else user = await this.rep.findUnique({ where: { username: criteria.username }, select: { id: true, username: true } });

    if (!user) return;

    const passwordToken = await JwtUtil.createPasswordToken({ userId: user.id });

    const templatePath = join(import.meta.dirname, "..", "..", "..", "Public", "Templates", "ResetPassword.hbs");
    const context = { username: user.username, token: passwordToken };
    const options = {
      from: '"Acme Support" <support@acme.com>',
      to: "jane@example.com",
      subject: "Password Reset Request",
    };
    return await this.mailer.sendTemplate(templatePath, context, options);
  }

  async resetPasswordValidate(criteria: IUserServiceResetPasswordValidate): Promise<string> {
    let tokenPayload;
    try {
      tokenPayload = await JwtUtil.verifyResetPasswordToken(criteria.token);
    } catch (error: any) {
      throw new AppError("Invalid token", status.UNAUTHORIZED, error);
    }

    const newPassword = random8AlnumSecure();
    const newHashedPassword = await CryptoUtils.hashPassword(newPassword);

    await this.rep.update({ data: { password: newHashedPassword }, where: { id: Number(tokenPayload.userId) } });

    return newPassword;
  }
}
