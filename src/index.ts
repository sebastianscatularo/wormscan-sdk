import { IHealth } from "./interfaces";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

class WormScanSDK {
  private API_BASE_URL: string = "http://api.staging.wormscan.io/api/v1";

  constructor() {}

  protected async request<T>(endpoint: string, options?: AxiosRequestConfig) {
    const url = `${this.API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
    };

    try {
      const response = await axios<T>(url, config);
      const { data } = response;
      return data;
    } catch (e: any) {
      const errors = e as Error | AxiosError;
      if (!axios.isAxiosError(errors)) {
        // do whatever you want with native error
        throw new Error(errors.message);
      }
      // do what you want with your axios error
      throw new Error(errors.message);
    }
  }

  public async checkHealth() {
    return this.request<IHealth>("/health");
  }
}

export default WormScanSDK;
