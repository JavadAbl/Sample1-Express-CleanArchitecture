export const DITypes = {
  //Database
  PrismaClient: Symbol.for("PrismaClient"),
  UserRepository: Symbol.for("UserRepository"),

  //Controllers
  UserController: Symbol.for("UserController"),
  TestController: Symbol.for("TestController"),

  //Services
  UserService: Symbol.for("UserService"),

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
};

Object.freeze(DITypes);
