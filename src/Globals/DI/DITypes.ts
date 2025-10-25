export const DITypes = {
  //Database
  PrismaClient: Symbol.for("PrismaClient"),
  UserRepository: Symbol.for("UserRepository"),
  PostRepository: Symbol.for("PostRepository"),
  CommentRepository: Symbol.for("CommentRepository"),

  //Controllers
  UserController: Symbol.for("UserController"),
  AuthController: Symbol.for("AuthController"),
  PostController: Symbol.for("PostController"),
  CommentController: Symbol.for("CommentController"),

  //Services
  UserService: Symbol.for("UserService"),
  PostService: Symbol.for("PostService"),
  CommentService: Symbol.for("CommentService"),

  //Routes
  AppRoutes: Symbol.for("AppRoutes"),
  UserRoutes: Symbol.for("UserRoutes"),

  //Caches
  UserCache: Symbol.for("UserCache"),

  //Queues
  UserQueue: Symbol.for("UserQueue"),

  //Workers
  UserWorker: Symbol.for("UserWorker"),

  //Crons
  UserCron: Symbol.for("UserCron"),

  //Mailer
  Mailer: Symbol.for("Mailer"),
};

Object.freeze(DITypes);
