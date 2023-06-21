import { IncomingMessage, Server, ServerResponse } from "http";
import WebSocket from "ws";

export class Runner {
  wss: WebSocket.Server;

  constructor() {}

  start(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
    if (!this.wss) {
      this.wss = new WebSocket.Server({ server });
    }
    this.listener();
  }

  private listener() {
    if (this.wss) {
      this.wss.on("connection", function (ws) {
        ws.on("error", console.error);

        ws.on("message", function message(data) {
          console.log("received: %s", data);
        });

        ws.on("close", function () {
          console.log("stopping client interval");
        });
      });
    }
  }
}
