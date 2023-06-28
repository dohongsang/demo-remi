import { WebSocket } from "vite";

export default class SocketIOApp {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("ws://localhost:8999");
    this.socket.on("open", () => {
      console.log("opening");
    });
  }
}
