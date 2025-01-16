import amqplib from "amqplib";
import mysql from "mysql2/promise";
import oracledb from "oracledb";
// import mongoose from "mongoose";

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

  // ORACLE
  async oracleDBConnection(): Promise<boolean> {
    const config = this.connectionData.oracleDB;
    if (config?.user && config.password && config.connectString) {
      try {
        const connection = await oracledb.getConnection({
          user: config.user,
          password: config.password,
          connectString: config.connectString,
        });
        console.log("[HEALTH-ORACLE] Successful connection to OracleDB");
        await connection.close();
        return true;
      } catch (error) {
        console.error("[HEALTH-ORACLE] Failed to connect to OracleDB:", error);
        return false;
      }
    }
    console.log("[HEALTH-ORACLE] OracleDB configuration is missing");
    return false;
  }

  // MONGODB
  // async testMongoDBConnection(): Promise<boolean> {
  //   const config = this.connectionData.mongoDB;
  //   if (config?.uri) {
  //     try {
  //       const connection = await mongoose.connect(config.uri);
  //       console.log("[HEALTH-MONGO] Successful connection to MongoDB");
  //       await connection.disconnect();
  //       return true;
  //     } catch (error) {
  //       console.error("[HEALTH-MONGO] Failed to connect to MongoDB:", error);
  //       return false;
  //     }
  //   }
  //   console.log("[HEALTH-MONGO] MongoDB configuration is missing");
  //   return false;
  // }
}

export default HealthConnector;
