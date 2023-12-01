import CheckComponentsDTO from "./CheckComponentsDTO";
import CheckStatusDTO from "./CheckStatusDTO";

class CheckDetailedDTO extends CheckStatusDTO {
  private components: CheckComponentsDTO;
  constructor(
    status: string,
    statusRabbit: string | null,
    statusMongoDB: string | null,
    statusMysqlDB: string | null,
    statusOracleDB: string | null
  ) {
    super(status);
    this.components = new CheckComponentsDTO(
      statusRabbit == null ? null : new CheckStatusDTO(statusRabbit),
      statusMongoDB == null ? null : new CheckStatusDTO(statusMongoDB),
      statusMysqlDB == null ? null : new CheckStatusDTO(statusMysqlDB),
      statusOracleDB == null ? null : new CheckStatusDTO(statusOracleDB)
    );
  }
  getComponents(): CheckComponentsDTO {
    return this.components;
  }
}

export default CheckDetailedDTO;
