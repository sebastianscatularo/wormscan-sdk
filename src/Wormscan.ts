import { AxiosClient, APIClient } from "./APIClient";
import { Governor } from "./Governor";
import { Environment } from "./Environment";
import { Guardian } from "./Guardian";

export enum Status {
  OK = "ok",
  ERROR = "error",
}

export class Wormscan {
  private readonly _governor: Governor;
  private readonly _guardian: Guardian;

  constructor(private readonly _client: APIClient) {
    this._governor = new Governor(this._client);
    this._guardian = new Guardian(this._client);
  }

  get governor(): Governor {
    return this._governor;
  }

  get guardian(): Guardian {
    return this._guardian;
  }

  async isReady() {
    return this._client.doGet<Status>("/ready");
  }

  async isHealth(): Promise<Status> {
    return this._client.doGet<Status>("/health");
  }
}

export function createClient(env?: Environment) {
  return new Wormscan(new AxiosClient(env));
}

export default createClient;
