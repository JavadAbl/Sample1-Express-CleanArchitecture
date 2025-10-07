import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { IUserDto, toUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";
import { AppError } from "#Globals/Utils/AppError.js";
import { UserCache } from "#Infrastructure/Cache/UserCache.js";
import { buildFindManyArgs } from "#Globals/Utils/PrismaUtils.js";
import { IUserServiceCreate } from "#Application/Interfaces/ServiceCriteria/User/IUserServiceCreate.js";
import status from "http-status";
import { IServiceFindById } from "#Application/Interfaces/ServiceCriteria/Shared/IServiceFindById.js";
import { IUserServiceFindByUsername } from "#Application/Interfaces/ServiceCriteria/User/IUserServiceFindByUsername.js";
import { IServiceFindMany } from "#Application/Interfaces/ServiceCriteria/Shared/IServiceFindMany.js";
import { IUserServiceUpdate } from "#Application/Interfaces/ServiceCriteria/User/IUserServiceUpdate.js";
import { IUserServiceDelete } from "#Application/Interfaces/ServiceCriteria/User/IUserServiceDelete.js";
import { IUserRepository } from "#Application/Interfaces/Repository/IUserRepository.js";
import { JwtUtil } from "#Globals/Utils/Jwt.js";
import { IUserServiceLogin } from "#Application/Interfaces/ServiceCriteria/User/IUserServiceLogin.js";
import { CryptoUtils } from "#Application/Utils/CryptoUtils.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(DITypes.UserRepository) private readonly rep: IUserRepository,
    @inject(DITypes.UserCache) private readonly userCache: UserCache,
  ) {}

  async login(criteria: IUserServiceLogin): Promise<{ user: IUserDto; accessToken: string; refreshToken: string } | null> {
    const user = await this.rep.findUnique({ where: { username: criteria.username } });

    if (!user) throw new AppError("User not found", status.NOT_FOUND);

    const isPasswordMatched = await CryptoUtils.verifyPassword(criteria.password, user.password);

    if (!isPasswordMatched) throw new AppError("Invalid password", status.UNAUTHORIZED);

    const tokens = await JwtUtil.createTokens({ userId: user.id, username: user.username });

    return { user: toUserDto(user), ...tokens };
  }

  async findById(criteria: IServiceFindById): Promise<IUserDto> {
    const user = await this.rep.findUnique({ where: { id: criteria } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);
    return toUserDto(user);
  }

  async findByUsername(criteria: IUserServiceFindByUsername): Promise<IUserDto> {
    const user = await this.rep.findUnique({ where: { username: criteria.username } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);
    return toUserDto(user);
  }

  async findMany(criteria: IServiceFindMany): Promise<IUserDto[]> {
    const args = buildFindManyArgs<"User">(criteria, {
      searchableFields: ["username"],
    });

    return this.rep.findMany(args).then((users) => users.map(toUserDto));
  }

  async create(criteria: IUserServiceCreate): Promise<IUserDto> {
    const existingUser = await this.rep.findUnique({ where: { username: criteria.username }, select: { id: true } });

    if (existingUser) throw new AppError("This user is already exists", status.BAD_REQUEST);

    const hashedPassword = await CryptoUtils.hashPassword(criteria.password);
    criteria.password = hashedPassword;

    const user = await this.rep.create({ data: criteria });

    const userDto = toUserDto(user);
    this.userCache.addUser(userDto);

    const tokens = await JwtUtil.createTokens({ userId: user.id, username: user.username });

    return { userDto, ...tokens } as unknown as IUserDto;
  }

  async delete(criteria: IUserServiceDelete): Promise<void> {
    const user = await this.rep.findUnique({ where: { id: criteria.id }, select: { id: true } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);
    await this.rep.delete({ where: { id: criteria.id }, select: { id: true } });
  }

  async update(criteria: IUserServiceUpdate): Promise<void> {
    const user = await this.rep.findUnique({ where: { id: criteria.id }, select: { id: true } });
    if (!user) throw new AppError("User not found", status.NOT_FOUND);
    await this.rep.update({ data: criteria, where: { id: criteria.id }, select: { id: true } });
  }
}
