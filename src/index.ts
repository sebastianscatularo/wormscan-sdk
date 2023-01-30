import {
  IHealth,
  IGovernorsConfigurationInput,
  IGovernorsConfiguration,
  IGovernorsConfigurationByGuardianId,
  IGovernorsEnqueuedVaasInput,
  IGovernorsEnqueuedVaas,
  IGovernorEnqueuedVaasByChainId,
} from "./interfaces";
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
        // do whatever you want with native error.
        throw new Error(errors.message);
      }
      // do what you want with your axios error.
      throw new Error(errors.message);
    }
  }

  /**
   * Health check.
   */
  public async checkHealth() {
    return this.request<IHealth>("/health");
  }

  /**
   * Returns governor configuration for all guardians.
   */
  public async getGovernorsConfiguration({
    page,
    pageSize,
    sortOrder,
  }: IGovernorsConfigurationInput) {
    return this.request<IGovernorsConfiguration>("/governor/config", {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   *
   * Returns governor configuration for a given guardian.
   */
  public async getGovernorConfigurationByGuardianId({
    guardianId,
    page,
    pageSize,
    sortOrder,
  }: { guardianId: string } & IGovernorsConfigurationInput) {
    return this.request<IGovernorsConfigurationByGuardianId>(`/governor/config/${guardianId}`, {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns enqueued VAAs for each blockchain.
   */
  public async getGovernorsEnqueuedVaas({
    page,
    pageSize,
    sortOrder,
  }: IGovernorsEnqueuedVaasInput) {
    return this.request<IGovernorsEnqueuedVaas>("/governor/enqueued_vaas", {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns all enqueued VAAs for a given blockchain.
   */
  public async getGovernorsEnqueuedVaasByChainId({
    chainId,
    page,
    pageSize,
    sortOrder,
  }: { chainId: string } & IGovernorsEnqueuedVaasInput) {
    return this.request<IGovernorEnqueuedVaasByChainId>(`/governor/enqueued_vaas/${chainId}`, {
      params: { page, pageSize, sortOrder },
    });
  }
}

export default WormScanSDK;
