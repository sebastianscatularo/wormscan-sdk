import { APIClient } from "./APIClient";
import { DefaultPageRequest, PageRequest } from "./PageRequest";
import { VAASearchCriteria } from "./VAASearchCriteria";

export class Guardian {
  constructor(private readonly _client: APIClient) {}

  async getVAAs(page: PageRequest = DefaultPageRequest) {
    return this._client.doGet("/vaas", { params: { ...page } });
  }

  async getVAACount() {
    return this._client.doGet("/vaas/vaa-counts");
  }

  async getVAA(criteria: VAASearchCriteria, page: PageRequest = DefaultPageRequest) {
    const effectivePath = this._vaaSearchCriteriaToPathSegmentFilter("/vaas", criteria);
    return this._client.doGet(effectivePath, { params: { ...page } });
  }

  async getObservation(criteria: VAASearchCriteria = null, page: PageRequest = DefaultPageRequest) {
    if (criteria) {
      const effectivePath = this._vaaSearchCriteriaToPathSegmentFilter("/observations", criteria);
      return this._client.doGet(effectivePath, { params: { ...page } });
    } else {
      return this._client.doGet("/observations", { params: { ...page } });
    }
  }

  private _vaaSearchCriteriaToPathSegmentFilter(
    prefix: string,
    { chainId, emmiter, specific }: VAASearchCriteria,
  ) {
    const { sequence, signer, hash } = specific || {};
    return [prefix, chainId, emmiter, sequence, signer, hash].join("/");
  }
}
