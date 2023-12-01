class CheckStatusDTO {
  private status: string | null;
  constructor(status: string | null) {
    this.status = status;
  }
  getStatus(): string | null {
    return this.status;
  }
  setStatus(status: string) {
    this.status = status;
  }
}
export default CheckStatusDTO;
