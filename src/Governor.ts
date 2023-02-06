import { APIClient } from "./APIClient";
import { DefaultPageRequest, PageRequest } from "./PageRequest";

export class Governor {
  constructor(private readonly _client: APIClient) {}

  async getConfiguration<T>(guardianId: number = null, page: PageRequest = DefaultPageRequest) {
    const effectivePath = guardianId ? `/governor/config/${guardianId}` : "/governor/config";
    return this._client.doGet<T>(effectivePath, {
      params: { ...page },
    });
  }

  async getEnqueuedVaas<T>(chainId: number = null, page: PageRequest = DefaultPageRequest) {
    const effectivePath = chainId ? `/governor/enqueued_vaa/${chainId}` : "/governor/enqueued_vaa";
    return this._client.doGet<T>(effectivePath, { params: { ...page } });
  }

  async getLimit(page: PageRequest = DefaultPageRequest) {
    return this._client.doGet("/governor/limit", { params: { ...page } });
  }

  async getMaxAvailableNotional(chainId: number, page: PageRequest = DefaultPageRequest) {
    return this._client.doGet(`/governor/notional/max_available/${chainId}`, {
      params: { ...page },
    });
  }

  async getAvailableNotional(chainId: number = null, page: PageRequest = DefaultPageRequest) {
    const effectivePath = chainId
      ? `/governor/notional/available/${chainId}`
      : "/governor/notional/available";
    return this._client.doGet(effectivePath, { params: { ...page } });
  }

  async getNotionalLimit(chainId: number = null, page: PageRequest = DefaultPageRequest) {
    const effectivePath = chainId
      ? `/governor/notional/limit/${chainId}`
      : "/governor/notional/limit";
    return this._client.doGet(effectivePath, { params: { ...page } });
  }

  async getStatus(guardianId: number = null, page: PageRequest = DefaultPageRequest) {
    const effectivePath = guardianId ? `/governor/status/${guardianId}` : "/governor/status";
    return this._client.doGet(effectivePath, { params: { ...page } });
  }
}
