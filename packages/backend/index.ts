import express from "express";
import { createServer } from "http";
import path from "path";
import { Runner } from "./src/runner";

const app = express();
const server = createServer(app);
app.use(express.static(path.join(__dirname, "/public")));

const websocket = new Runner();
websocket.start(server);

server.listen(8080, function () {
  console.log("Listening on http://0.0.0.0:8080");
});
