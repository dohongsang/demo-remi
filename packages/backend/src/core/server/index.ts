import dotenv from "dotenv";
import { IncomingMessage, Server, ServerResponse } from "http";
import * as passportRes from "passport";
import { Action, createExpressServer } from "routing-controllers";
import { Database } from "../db";
import { Passport } from "../middlewares/passport.middleware";
import { Runner } from "../websocket";

dotenv.config();

export class Application {
  private server: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor() {}

  init(controllers: any[]) {
    this.server = createExpressServer({
      routePrefix: process.env.PREFIX_ENDPOINT,
      controllers,
      currentUserChecker: (action: Action) => action.request.user,
    });

    const passport = new Passport();
    passport.usePassportJWT();
    // passport.useLocalJWT();

    const websocket = new Runner();
    websocket.init(this.server);

    const database = new Database();
    database.init();
  }

  start() {
    if (this.server) {
      this.server.listen(8080, function () {
        console.log("Listening on http://0.0.0.0:8080");
      });
    }
  }
}
