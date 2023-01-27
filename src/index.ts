import { IHealth } from "./interfaces";

class WormScanClient {
  constructor() {}

  async checkHealth() {
    return fetch("http://api.staging.wormscan.io/api/v1/health").then(response => {
      if (response.ok) {
        return response.json() as Promise<IHealth>;
      } else {
        throw new Error(response.statusText);
      }
    });
  }
}

export default WormScanClient;
