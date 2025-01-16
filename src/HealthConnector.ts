import amqplib from "amqplib";

interface RabbitMQConfig {
  url: string | null;
  user?: string | null;
  password?: string | null;
}

interface MongoDBConfig {
  uri: string | null;
}

interface MySQLConfig {
  host: string | null;
  user: string | null;
  password: string | null;
  database: string | null;
}

interface OracleDBConfig {
  user: string | null;
  password: string | null;
  connectString: string | null;
}

interface ConnectionData {
  rabbitMQ?: RabbitMQConfig;
  mongoDB?: MongoDBConfig;
  mySQL?: MySQLConfig;
  oracleDB?: OracleDBConfig;
}

class HealthConnector {
  constructor(private connectionData: ConnectionData) {}

  //RABBITMQ
  async rabbitMQConnection(): Promise<boolean | undefined> {
    const config = this.connectionData.rabbitMQ;
    if (config?.url) {
      try {
        const connection = await amqplib.connect(config.url);
        console.log("[HEALTH-RABBIT] Successful connection to RabbitMQ");
        await connection.close();
        return true;
      } catch (error) {
        console.error("[HEALTH-RABBIT] Failed to connect to RabbitMQ:", error);
        return false;
      }
    }
    console.log("[HEALTH-RABBIT] RabbitMQ configuration is missing");
    return false;

  }

  //MYSQL
  async mySQLConnection(): Promise<boolean | undefined> {
    const config = this.connectionData.mySQL;
    if (config?.host && config?.user && config?.password && config?.database) {
      try {
        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection({
          host: config.host,
          user: config.user,
          password: config.password,
          database: config.database,
        });
        console.log("[HEALTH-MYSQL] Successful connection to MySQL");
        await connection.end();
        return true;
      } catch (error) {
        console.error("[HEALTH-MYSQL] Failed to connect to MySQL:", error);
        return false;
      }
    }
    console.log("[HEALTH-MYSQL] MySQL configuration is missing");
    return false;
  }
}

export default HealthConnector;
