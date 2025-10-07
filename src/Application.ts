import "reflect-metadata";
import { AppServer } from "#API/Server.js";
import express, { Application as ExpressApplication } from "express";

class Application {
  private server: AppServer;

  constructor(private readonly appServer: ExpressApplication) {
    this.server = new AppServer(this.appServer);
  }

  public run(): void {
    this.server.start();
  }
}

const application = new Application(express());
application.run();

// Handle unexpected errors
//Todo
