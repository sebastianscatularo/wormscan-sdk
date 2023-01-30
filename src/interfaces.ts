export interface IHealth {
  status: string;
}

export interface IGovernorsConfigurationInput {
  page?: number;
  pageSize?: number;
  sortOrder?: "ASC" | "DESC";
}

export interface IGovernorsConfiguration {
  data: TGovernorConfiguration[];
  pagination: {
    next: string;
  };
}

export interface IGovernorsConfigurationByGuardianId {
  data: TGovernorConfiguration;
  pagination: {
    next: string;
  };
}

type TGovernorConfiguration = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nodename: string;
  counter: number;
  chains: {
    chainid: number;
    notionallimit: number;
    bigtransactionsize: number;
  }[];
  tokens: {
    originchainid: number;
    originaddress: string;
    price: number;
  }[];
};

export interface IGovernorsEnqueuedVaasInput {
  page?: number;
  pageSize?: number;
  sortOrder?: "ASC" | "DESC";
}

export interface IGovernorsEnqueuedVaas {
  data: {
    chainId: number;
    enqueuedVaas: TGovernorEnqueuedVaas[];
  }[];
  pagination: {
    next: string;
  };
}

export interface IGovernorEnqueuedVaasByChainId {
  data: TGovernorEnqueuedVaas[];
  pagination: {
    next: string;
  };
}

type TGovernorEnqueuedVaas = {
  chainId: number;
  emitterAddress: string;
  notionalValue: number;
  sequence: string;
  txHash: string;
};
