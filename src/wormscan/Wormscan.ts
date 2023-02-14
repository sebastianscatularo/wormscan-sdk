import { AxiosClient, APIClient } from "../api-client";
import { Governor } from "../governor";
import environment from "../model/Environment";
import { GuardianNetwork } from "../guardian-network";
import { _get } from "../utils/Objects";

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

  get guardianNetwork(): GuardianNetwork {
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

export function createClient(env: string = environment) {
  return new Wormscan(new AxiosClient(env));
}

const client: Wormscan = createClient();

export default client;
