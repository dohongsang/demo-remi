import dotenv from "dotenv";
import { IncomingMessage, Server, ServerResponse } from "http";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { Database } from "../db";
import { Runner } from "../websocket";

dotenv.config();

export class Application {
  private server: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor() {}

  init(controllers: any[]) {
    this.server = createExpressServer({
      routePrefix: process.env.PREFIX_ENDPOINT,
      controllers,
    });

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
