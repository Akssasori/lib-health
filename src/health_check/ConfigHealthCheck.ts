import HealthCheckI from "./HealthCheckI";
import MongoDBHealthCheck from "./MongoDBHealthCheck";
import { RabbitHealthCheck } from "./RabbitHealthCheck";
// import {config} from "../config/index";

class ConfigHealthCheck {
  private mongoHealth: HealthCheckI | null;
  private mysqlHealth: HealthCheckI | null;
  private oracleHealth: HealthCheckI | null;
  private rabbitHealth: HealthCheckI | null;

  private mongoDBKey = "MONGODB";
  private mysqlDBKey = "MYSQLDB";
  private oracleDBKey = "ORACLEDB";
  private rabbitKey = "RABBIT";

  constructor() {
    this.mongoHealth = null;
    this.mysqlHealth = null;
    this.oracleHealth = null;
    this.rabbitHealth = null;

    const healthCheckService = "mongoDB,rabbit";
    const lista: string[] = healthCheckService.split(",");

    let found = lista.find((obj) => {
      return obj.toUpperCase().trim() === this.mongoDBKey;
    });
    if (found != undefined) {
      this.mongoHealth = new MongoDBHealthCheck(null, config.MONGODB_HOST, config.MONGODB_USER, 
      config.MONGODB_PASSWORD, config.MONGODB_DATABASE);
    }
    found = lista.find((obj) => {
      return obj.toUpperCase().trim() === this.mysqlDBKey;
    });
    if (found != undefined) {
      this.mysqlHealth = null;
    }
    found = lista.find((obj) => {
      return obj.toUpperCase().trim() === this.oracleDBKey;
    });
    if (found != undefined) {
      this.oracleHealth = null;
    }
    found = lista.find((obj) => {
      return obj.toUpperCase().trim() === this.rabbitKey;
    });
    if (found != undefined) {
      console.log(config.AMQP_URI)
      this.rabbitHealth = new RabbitHealthCheck((config.AMQP_URI as string), config.AMQP_USER, config.AMQP_PASSWORD);
    }
  }
  async getMongoDBStatus(): Promise<string | null> {
    if (this.mongoHealth == null) {
      return null;
    } else {
      return await this.mongoHealth.getStatus() ? "UP" : "DOWN";
    }
  }
  async getMysqlDBStatus(): Promise<string | null> {
    if (this.mysqlHealth == null) {
      return null;
    } else {
      return await this.mysqlHealth.getStatus() ? "UP" : "DOWN";
    }
  }
  async getOracleDBStatus(): Promise<string | null> {
    if (this.oracleHealth == null) {
      return null;
    } else {
      return await this.oracleHealth.getStatus() ? "UP" : "DOWN";
    }
  }
  async getRabbitStatus(): Promise<string | null> {
    if (this.rabbitHealth == null) {
      return null;
    } else {
      return await this.rabbitHealth.getStatus() ? "UP" : "DOWN";
    }
  }
  async getStatus(): Promise<string> {
    if (this.mongoHealth != null && !await this.mongoHealth.getStatus()) {
      return "DOWN";
    }
    if (this.mysqlHealth != null && !await this.mysqlHealth.getStatus()) {
      return "DOWN";
    }
    if (this.oracleHealth != null && !await this.oracleHealth.getStatus()) {
      return "DOWN";
    }
    if (this.rabbitHealth != null && !await this.rabbitHealth.getStatus()) {
      return "DOWN";
    }
    return "UP";
  }
}
export default ConfigHealthCheck;
