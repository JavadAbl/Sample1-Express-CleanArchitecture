export const DITypes = {
  //Database
  PrismaClient: Symbol.for("PrismaClient"),
  UserRepository: Symbol.for("UserRepository"),
  PostRepository: Symbol.for("PostRepository"),

  //Controllers
  UserController: Symbol.for("UserController"),
  AuthController: Symbol.for("AuthController"),
  PostController: Symbol.for("PostController"),

  //Services
  UserService: Symbol.for("UserService"),
  PostService: Symbol.for("PostService"),

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
