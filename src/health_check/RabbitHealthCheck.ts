import HealthCheckI from "./HealthCheckI";
import * as amqp from "amqplib";

export class RabbitHealthCheck implements HealthCheckI {
  private url: string ;
  private user: string | undefined;
  private password: string | undefined;
  status: boolean;

  constructor(
    url: string ,
    user: string | undefined,
    password: string | undefined,
  ) {
    this.url = url;
    this.user = user;
    this.password = password;
    this.status = false;
  }

  async getStatus(): Promise<boolean> {
    return this.status = await this.checkRabbitMQConnection();
  }

  async checkRabbitMQConnection(): Promise<boolean> {
    try {

      const passwordKey = this.password;
      const conexao = await amqp.connect(this.url, { username: this.user, passwordKey });

      if (conexao) {
        console.log("[HEALTH] Conexão bem-sucedida com o RabbitMQ");
        await conexao.close();
        return true;
      } else {
        console.log("[HEALTH] Não foi possível estabelecer conexão com o RabbitMQ");
        return false;
      }
    } catch (error) {
      console.error("[HEALTH] Erro ao conectar com o RabbitMQ:", error);
      return false;
    }
  }

}
