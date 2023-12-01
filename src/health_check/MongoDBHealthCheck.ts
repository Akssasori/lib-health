import HealthCheckI from "./HealthCheckI";
const MongoClient = require("mongodb").MongoClient;

class MongoDBHealthCheck implements HealthCheckI {
  mongoClient:any;
  constructor(
    urlFull: string | null,
    host: string | null = null,
    user: string | null = null,
    password: string | null = null,
    database: string | null = null
  ) {
    
    if (urlFull == null) {
      urlFull = `mongodb://${user}:${password}@${host}:27017/${database}`;
    }
    this.mongoClient = new MongoClient(urlFull, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    this.status = false;
    this.finalizou = false;
  }
  status: boolean;
  finalizou: boolean;
  async getStatus(): Promise<boolean> {
    this.status = false;
    return await this.start();
  }

  async start(): Promise<boolean> {
    try {
      await this.mongoClient.connect();
      this.stop();
      console.log("[HEALTH] Sucesso ao conectar no MongoDB");
      return true;
    } catch (error) {
      console.error("[HEALTH] Erro ao conectar no MongoDB:", error);
      return false;
    }
  }
  stop() {
    this.mongoClient.close();
  }

}

export default MongoDBHealthCheck;
