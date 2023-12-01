import MongoDBHealthCheck from "./health_check/MongoDBHealthCheck";
import { MysqlDbHealthCheck } from "./health_check/MysqlDbHealthCheck";
import { OracleDbHealthCheck } from "./health_check/OracleDbHealthCheck";
import { RabbitHealthCheck } from "./health_check/RabbitHealthCheck";

export async function testConnectionRabbitMQ(
    url: string,
    user: string,
    password: string
): Promise<boolean> {
    const result = new RabbitHealthCheck(url,user,password).getStatus();
    return result;
}

export async function testConnectionMongoDB(
    urlFull: string,
    host: string,
    user: string,
    password: string,
    database: string
): Promise<boolean> {
    const result = new MongoDBHealthCheck(urlFull,host,user,password,database).getStatus();
    return result;
}

export async function testConnectionMySql(
    host: string,
    user: string,
    password: string,
    database: string
): Promise<boolean> {
    const result = new MysqlDbHealthCheck(host,user,password,database).getStatus();
    return result;
}

export async function testConnectionOracle(
    user: string,
    password: string,
    connectString: string
): Promise<boolean> {
    const result = new OracleDbHealthCheck(user,password,connectString).getStatus();
    return result;
}

