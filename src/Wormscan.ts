import { AxiosClient, APIClient } from "./APIClient";
import { Governor } from "./Governor";
import { Environment } from "./Environment";
import { GuardianNetwork } from "./GuardianNetwork";
import { _get } from "./Objects";

export class Wormscan {
  private readonly _governor: Governor;
  private readonly _guardian: GuardianNetwork;

  constructor(private readonly _client: APIClient) {
    this._governor = new Governor(this._client);
    this._guardian = new GuardianNetwork(this._client);
  }

  get governor(): Governor {
    return this._governor;
  }

  get guardian(): GuardianNetwork {
    return this._guardian;
  }

  async isReady(): Promise<boolean> {
    return this._getStatus("/ready");
  }

  async isHealth(): Promise<boolean> {
    return this._getStatus("/health");
  }

  private async _getStatus(path: string) {
    try {
      const payload = await this._client.doGet<{ status: string }>(path);
      const status = payload.status || "";
      return status === "OK";
    } catch (err) {
      return false;
    }
  }
}

export function createClient(env?: Environment) {
  return new Wormscan(new AxiosClient(env));
}

export default createClient;
