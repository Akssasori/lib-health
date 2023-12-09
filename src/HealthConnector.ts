import amqplib from "amqplib";

interface ConnectionData {
  rabbitMQ: {
    url: string | null;
    user: string | null;
    password: string | null;
  };
}

class HealthConnector {
  constructor(private connectionData: ConnectionData) {}

  async testRabbitMQConnection(): Promise<boolean | undefined> {
    if (this.connectionData.rabbitMQ.url !== null) {
      try {
        const connection = await amqplib.connect(
          this.connectionData.rabbitMQ.url
        );

        if (connection) {
          console.log("[HEALTH-RABBIT] Successful connection to RabbitMQ");
          await connection.close();
          return true;
        } else {
          console.log(
            "[HEALTH-RABBIT] Unable to establish connection with the RabbitMQ"
          );
          return false;
        }
      } catch (error) {
        console.error("[HEALTH-RABBIT] Failed to connect to RabbitMQ:", error);
        return false;
      }
    }

  }
}

export default HealthConnector;
