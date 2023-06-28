import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Action, useExpressServer } from "routing-controllers";
import { Database } from "../db";
import { HttpErrorHandler } from "../middlewares/error.middleware";
import { Passport } from "../middlewares/passport.middleware";
import { Runner } from "../websocket";

dotenv.config();

export class Application {
  private app: express.Express;

  constructor() {}

  init(controllers: any[]) {
    this.app = express();
    this.app.use(cors());
    useExpressServer(this.app, {
      routePrefix: process.env.PREFIX_ENDPOINT,
      controllers,
      currentUserChecker: (action: Action) => action.request.user,
      middlewares: [HttpErrorHandler, cors()],
      defaultErrorHandler: false,
    });

    const passport = new Passport();
    passport.usePassportJWT();

    const websocket = new Runner();
    websocket.init();

    const database = new Database();
    database.init();
  }

  start() {
    this.app.listen(8080, function () {
      console.log("Listening on http://0.0.0.0:8080");
    });
  }
}
