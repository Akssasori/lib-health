import * as mysql from "mysql2/promise";
import HealthCheckI from "./HealthCheckI";


export class MysqlDbHealthCheck implements HealthCheckI {
  private connection: mysql.Connection | null;

  private host: string;
  private user: string;
  private password: string;
  private database: string;
  status: boolean;

  constructor(host:string, user:string, password:string, database:string) {
    this.connection = null;
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    this.status = false;
  }

  async getStatus(): Promise<boolean> {
    return this.status = await this.checkMySQLConnection();
  }

  async checkMySQLConnection(): Promise<boolean> {
    try {
      this.connection = await mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
      });
      await this.connection.ping();
      console.log("[HEALTH] Sucesso ao conectar no Mysql");
      return true;
    } catch (error) {
      console.error("[HEALTH] Erro ao conectar ao banco de dados:", error);
      return false;
    } finally {
      if (this.connection) {
        await this.connection.end();
      }
    }
  }

}
