import { DataSource } from "typeorm";
import entities from "./entities";

export class Database {
  static datasource: DataSource;

  constructor() {}

  init() {
    if (!Database.datasource) {
      Database.datasource = new DataSource({
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
    return Database.datasource;
  }

  destroy() {
    this.disconnect();
  }

  static getDatasource(): DataSource {
    if (Database.datasource) return Database.datasource;
    const database = new Database();
    return database.init();
  }

  static init(): DataSource {
    throw new Error("Method not implemented.");
  }

  private connect() {
    if (Database.datasource) {
      Database.datasource
        .initialize()
        .then(() => console.log("Connected!"))
        .catch((error) => console.log("Connection Fail!", error));
    }
  }

  private disconnect() {
    if (Database.datasource && Database.datasource.isInitialized) {
      Database.datasource
        .destroy()
        .then(() => console.log("Connected!"))
        .catch((error) => console.log("Connection Fail!", error));
    }
  }
}
