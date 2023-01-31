import {
  IHealth,
  IGovernorsConfigurationInput,
  IGovernorsConfiguration,
  IGovernorsConfigurationByGuardianId,
  IGovernorsEnqueuedVaasInput,
  IGovernorsEnqueuedVaas,
  IGovernorEnqueuedVaasByChainId,
  IGovernorsLimitInput,
  IGovernorsLimit,
  IGovernorMaxAvailableNotionalInput,
  IGovernorMaxAvailableNotional,
  IGovernorAvailableNotionalInput,
  IGovernorAvailableNotional,
  IGovernorAvailableNotionalByChainIdInput,
  IGovernorAvailableNotionalByChainId,
  IGovernorLimitNotionalInput,
  IGovernorLimitNotionalByChainIdInput,
  IGovernorLimitNotionalByChainId,
  IGovernorLimitNotional,
  IGovernorsConfigurationByGuardianIdInput,
  IGovernorsEnqueuedVaasByChainIdInput,
  IGovernorStatusInput,
  IGovernorStatus,
  IGovernorStatusByGuardianIdInput,
  IGovernorStatusByGuardianId,
  IVAAsInput,
  IVAAs,
  IVAAsCount,
  IVAAInput,
  IVAA,
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
   * Ready check.
   */
  public async checkReady() {
    return this.request<IHealth>("/ready");
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
  }: IGovernorsConfigurationByGuardianIdInput) {
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
  public async getGovernorEnqueuedVaasByChainId({
    chainId,
    page,
    pageSize,
    sortOrder,
  }: IGovernorsEnqueuedVaasByChainIdInput) {
    return this.request<IGovernorEnqueuedVaasByChainId>(`/governor/enqueued_vaas/${chainId}`, {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns the governor limit for all blockchains.
   */
  public async getGovernorsLimit({ page, pageSize, sortOrder }: IGovernorsLimitInput) {
    return this.request<IGovernorsLimit>("/governor/limit", {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns the maximum amount of notional value available for a given blockchain.
   */
  public async getGovernorMaxAvailableNotionalByChainId({
    chainId,
    page,
    pageSize,
    sortOrder,
  }: IGovernorMaxAvailableNotionalInput) {
    return this.request<IGovernorMaxAvailableNotional>(
      `/governor/notional/max_available/${chainId}`,
      {
        params: { page, pageSize, sortOrder },
      },
    );
  }

  /**
   * Returns the amount of notional value available for each blockchain.
   */
  public async getGovernorsAvailableNotional({
    page,
    pageSize,
    sortOrder,
  }: IGovernorAvailableNotionalInput) {
    return this.request<IGovernorAvailableNotional>("/governor/notional/available", {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns the amount of notional value available for a given blockchain.
   */
  public async getGovernorAvailableNotionalByChainId({
    chainId,
    page,
    pageSize,
    sortOrder,
  }: IGovernorAvailableNotionalByChainIdInput) {
    return this.request<IGovernorAvailableNotionalByChainId>(
      `/governor/notional/available/${chainId}`,
      {
        params: { page, pageSize, sortOrder },
      },
    );
  }

  /**
   * Returns the detailed notional limit for all blockchains.
   */
  public async getGovernorsLimitNotional({
    page,
    pageSize,
    sortOrder,
  }: IGovernorLimitNotionalInput) {
    return this.request<IGovernorLimitNotional>("/governor/notional/limit", {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns the detailed notional limit available for a given blockchain.
   */
  public async getGovernorLimitNotionalByChainId({
    chainId,
    page,
    pageSize,
    sortOrder,
  }: IGovernorLimitNotionalByChainIdInput) {
    return this.request<IGovernorLimitNotionalByChainId>(`/governor/notional/limit/${chainId}`, {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns the governor status for all guardians.
   */
  public async getGovernorsStatus({ page, pageSize, sortOrder }: IGovernorStatusInput) {
    return this.request<IGovernorStatus>("/governor/status", {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns the governor status for a given guardian.
   */
  public async getGovernorStatusByGuardianId({
    guardianId,
    page,
    pageSize,
    sortOrder,
  }: IGovernorStatusByGuardianIdInput) {
    return this.request<IGovernorStatusByGuardianId>(`/governor/status/${guardianId}`, {
      params: { page, pageSize, sortOrder },
    });
  }

  /**
   * Returns all VAAs. Output is paginated and can also be be sorted.
   */
  public async getVAAs({ page, pageSize, sortOrder }: IVAAsInput) {
    return this.request<IVAAs>("/vaas", { params: { page, pageSize, sortOrder } });
  }

  /**
   * Returns the total number of VAAs emitted for each blockchain.
   */
  public async getVAAsCount() {
    return this.request<IVAAsCount>("/vaas/vaa-counts");
  }

  /**
   * Returns all the VAAs generated in a specific blockchain, optionally in a
   *   specific emitter and optionally with a specific hash id.
   */
  public async getSpecificVAA({
    chainId,
    emitter,
    specific,
    page,
    pageSize,
    sortOrder,
  }: IVAAInput) {
    let path = `/vaas/${chainId}`;
    if (emitter) {
      path = `${path}/${emitter}`;

      if (specific) {
        const { sequence, signer, hash } = specific;
        path = `${path}/${sequence}/${signer}/${hash}`;
      }
    }
    return this.request<IVAA>(path, {
      params: { page, pageSize, sortOrder },
    });
  }
}

export default WormScanSDK;
