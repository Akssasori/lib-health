import CheckStatusDTO from "./CheckStatusDTO";

class CheckComponentsDTO {
  mongoDB: CheckStatusDTO | null;
  rabbit: CheckStatusDTO | null;
  mysqlDB: CheckStatusDTO | null;
  oracleDB: CheckStatusDTO | null;

  constructor(
    rabbit: CheckStatusDTO | null,
    mongoDB: CheckStatusDTO | null,
    mysqlDB: CheckStatusDTO | null,
    oracleDB: CheckStatusDTO | null
  ) {
    this.mongoDB = mongoDB;
    this.rabbit = rabbit;
    this.mysqlDB = mysqlDB;
    this.oracleDB = oracleDB;
  }
}
export default CheckComponentsDTO;
