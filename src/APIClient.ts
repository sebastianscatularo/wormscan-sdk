import axios, { Axios, AxiosError } from "axios";
import { Environment } from "./Environment";

export interface APIClient {
  doGet<T>(path: string, params?: any): Promise<T> | T;
}

export class AxiosClient implements APIClient {
  private readonly _client: Axios;

  constructor(baseURL: Environment = Environment.STAGING) {
    this._client = axios.create({ baseURL });
  }

  async doGet<T>(path: string, params?: any) {
    try {
      const response = await this._client.get(path, { params });
      const data = response?.data;
      return data as T;
    } catch (e: any) {
      const errors = e as Error | AxiosError;
      throw new Error(errors.message);
    }
  }
}
