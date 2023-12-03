// import MongoDBHealthCheck from "./health_check/MongoDBHealthCheck";
// import { MysqlDbHealthCheck } from "./health_check/MysqlDbHealthCheck";
// import { OracleDbHealthCheck } from "./health_check/OracleDbHealthCheck";
// import { RabbitHealthCheck } from "./health_check/RabbitHealthCheck";
import * as amqp from 'amqplib';
// import * as mysql from 'mysql';
// import { Connection } from 'oracledb';


interface ConnectionData {
  rabbitMQ: {
      url: string;
      user: string;
      password: string;
  };
//   rabbitMQ2: {
//     url: string;
// };
//   mysql: {
//       host: string;
//       user: string;
//       password: string;
//       database: string;
//   };
//   mongo: {
//     urlFull: string;
//     host: string;
//     user: string;
//     password: string;
//     database: string;
//   };
//   oracle: {
//     user: string;
//     password: string;
//     connectString: string;
//   };
}

class HealthConnector {

  constructor(private connectionData: ConnectionData) {}

    async testRabbitMQConnection(): Promise<boolean> {
        try {
            const connection = await amqp.connect(this.connectionData.rabbitMQ.url);

            if (connection) {
                console.log("[HEALTH] Successful connection to RabbitMQ");
                await connection.close();
                return true;
            } else {
                console.log("[HEALTH] Unable to establish connection with the RabbitMQ");
                return false;
            }
        } catch (error) {
            console.error('[HEALTH] Failed to connect to RabbitMQ:', error);
            return false;
        }
    }

}

export default HealthConnector;


