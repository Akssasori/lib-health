 interface HealthCheckI {
        status: boolean;

        getStatus(): Promise<boolean>;

}
export default HealthCheckI;