import oracledb, { Connection } from "oracledb";
import HealthCheckI from "./HealthCheckI";

export class OracleDbHealthCheck implements HealthCheckI {
  private connection: Connection | null;

  private user: string;
  private password: string;
  private connectString: string;
  status: boolean;

  constructor(user: string, password: string, connectString: string) {
    this.connection = null;
    this.user = user;
    this.password = password;
    this.connectString = connectString;
    this.status = false;
  }

  async getStatus(): Promise<boolean> {
    return this.status = await this.checkOracleDBConnection();
  }

  async checkOracleDBConnection(): Promise<boolean> {
    try {
      this.connection = await oracledb.getConnection({
        user: this.user,
        password: this.password,
        connectString: this.connectString,
      });
      console.log("[HEALTH] Sucesso ao conectar no Oracle");
      return true;
    } catch (error) {
      console.error("[HEALTH] Erro ao conectar ao banco de dados:", error);
      return false;
    } finally {
      if (this.connection) {
        await this.connection.close();
      }
    }
  }
}
