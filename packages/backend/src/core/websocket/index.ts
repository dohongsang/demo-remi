import http from "http";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import WebSocket from "ws";

@Service()
export class Runner {
  private wsClients: any = {};

  constructor() {}

  init() {
    const server = http.createServer();
    const wsServer = new WebSocket.Server({ server });
    wsServer.on("connection", this.onConnection.bind(this));

    const port = process.env.WSS_SERVER_PORT;
    server.listen(port, () => {
      console.log(`Websocket started at ws://0.0.0.0:${port}`);
    });
  }

  onConnection(ws: WebSocket) {
    const userId = uuidv4();
    const bindFunc = (message: WebSocket.RawData) =>
      this.onMessage(userId, message);
    ws.on("message", bindFunc.bind(this));
    ws.on("error", this.onError.bind(this));
    ws.on("close", this.onClose.bind(this));
    this.wsClients[userId] = ws;
    console.log(`New Connection ${userId}`);
  }

  onMessage(userId: string, data: WebSocket.RawData) {
    this.handleMessage(data, userId);
  }

  onError() {
    console.log(`On Error Connection.`);
  }

  onClose() {
    console.log(`On Close Connection.`);
  }

  broadcastMessage(json: any, clientSentId: string) {
    const data = JSON.stringify(json);
    for (let userId in this.wsClients) {
      let client = this.wsClients[userId];
      if (client.readyState === WebSocket.OPEN && userId !== clientSentId) {
        client.send(data);
      }
    }
  }

  handleMessage(message: any, userId: string) {
    const dataFromClient = JSON.parse(message.toString());
    this.broadcastMessage(dataFromClient, userId);
  }
}
