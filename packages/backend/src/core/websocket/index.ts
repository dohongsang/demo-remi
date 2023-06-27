import { IncomingMessage, Server, ServerResponse } from "http";
import WebSocket from "ws";

export class Runner {
  private wss: WebSocket.Server;

  constructor() {}

  init(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
    if (!this.wss) {
      this.wss = new WebSocket.Server({ server });
    }

    //start our server
    server.listen(process.env.PORT || 8999, () => {
      console.log(`Server started on port ${process.env.PORT || 8999}`);
    });

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
