import { DataSource } from "typeorm";
import entities from "./entities";

export class Database {
  database: DataSource;

  constructor() {}

  init() {
    if (!this.database) {
      this.database = new DataSource({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities,
        synchronize: true,
        logging: false,
      });
    }
    this.connect();
  }

  private connect() {
    if (this.database) {
      this.database
        .initialize()
        .then(() => console.log("Connected!"))
        .catch((error) => console.log("Connection Fail!", error));
    }
  }
}
