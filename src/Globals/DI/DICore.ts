import { Container } from "inversify";
import { DITypes } from "./DITypes.js";
import { IUserService } from "#Application/Interfaces/Service/IUserService.js";
import { UserService } from "#Application/Services/UserService.js";
import { UserRepository } from "#Infrastructure/Database/Repository/UserRepository.js";
import { UserController } from "#API/Controllers/UserController.js";
import { PrismaClient } from "#Infrastructure/Database/Prisma/index.js";
import { UserCache } from "#Infrastructure/Cache/UserCache.js";
import { UserQueue } from "#Infrastructure/Queue/Queues/UserQueue.js";
import { UserWorker } from "#Infrastructure/Queue/Workers/UserWorker.js";
import { IUserRepository } from "#Application/Interfaces/Repository/IUserRepository.js";
import { UserCron } from "#Infrastructure/Cron/UserCron.js";
import { AuthController } from "#API/Controllers/AuthController.js";
import { Mailer } from "../../Infrastructure/Mail/Mailer.js";
import { PostController } from "#API/Controllers/PostController.js";
import { IPostService } from "#Application/Interfaces/Service/IPostService.js";
import { PostService } from "#Application/Services/PostService.js";
import { IPostRepository } from "#Application/Interfaces/Repository/IPostRepository.js";
import { PostRepository } from "#Infrastructure/Database/Repository/PostRepository.js";
import { CommentController } from "#API/Controllers/CommentController.js";
import { ICommentRepository } from "#Application/Interfaces/Repository/ICommentRepository.js";
import { CommentRepository } from "#Infrastructure/Database/Repository/CommentRepository.js";
import { ICommentService } from "#Application/Interfaces/Service/ICommentService.js";
import { CommentService } from "#Application/Services/CommentService.js";
import { ILikeRepository } from "#Application/Interfaces/Repository/ILikeRepository.js";
import { LikeRepository } from "#Infrastructure/Database/Repository/LikeRepository.js";

export const container = new Container();

// Bind controllers
container.bind<UserController>(DITypes.UserController).to(UserController).inSingletonScope();
container.bind<AuthController>(DITypes.AuthController).to(AuthController).inSingletonScope();
container.bind<PostController>(DITypes.PostController).to(PostController).inSingletonScope();
container.bind<CommentController>(DITypes.CommentController).to(CommentController).inSingletonScope();

// Bind Services
container.bind<IUserService>(DITypes.UserService).to(UserService).inSingletonScope();
container.bind<IPostService>(DITypes.PostService).to(PostService).inSingletonScope();
container.bind<ICommentService>(DITypes.CommentService).to(CommentService).inSingletonScope();

// Bind Repositories
container.bind<PrismaClient>(DITypes.PrismaClient).toConstantValue(new PrismaClient());
container.bind<IUserRepository>(DITypes.UserRepository).to(UserRepository).inSingletonScope();
container.bind<IPostRepository>(DITypes.PostRepository).to(PostRepository).inSingletonScope();
container.bind<ICommentRepository>(DITypes.CommentRepository).to(CommentRepository).inSingletonScope();
container.bind<ILikeRepository>(DITypes.LikeRepository).to(LikeRepository).inSingletonScope();

// Bind Caches
container.bind<UserCache>(DITypes.UserCache).to(UserCache).inSingletonScope();

// Bind Queues
container.bind<UserQueue>(DITypes.UserQueue).to(UserQueue).inSingletonScope();

// Bind Workers
container.bind<UserWorker>(DITypes.UserWorker).to(UserWorker).inSingletonScope();

// Bind Crons
container.bind<UserCron>(DITypes.UserCron).to(UserCron).inSingletonScope();

// Bind Mailer
container.bind<Mailer>(DITypes.Mailer).to(Mailer).inSingletonScope();
