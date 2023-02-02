type TSortOptions = {
  page?: number;
  pageSize?: number;
  sortOrder?: "ASC" | "DESC";
};

type Pagination = {
  next: string;
};

export interface IHealth {
  status: string;
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

export interface IGovernorsConfigurationInput extends TSortOptions {}
export interface IGovernorsConfiguration {
  data: TGovernorConfiguration[];
  pagination: Pagination;
}

export interface IGovernorsConfigurationByGuardianIdInput extends TSortOptions {
  guardianId: string;
}

export interface IGovernorsConfigurationByGuardianId {
  data: TGovernorConfiguration;
  pagination: Pagination;
}

type TGovernorEnqueuedVaas = {
  chainId: number;
  emitterAddress: string;
  notionalValue: number;
  sequence: string;
  txHash: string;
};

export interface IGovernorsEnqueuedVaasInput extends TSortOptions {}

export interface IGovernorsEnqueuedVaas {
  data: {
    chainId: number;
    enqueuedVaas: TGovernorEnqueuedVaas[];
  }[];
  pagination: Pagination;
}

export interface IGovernorsEnqueuedVaasByChainIdInput extends TSortOptions {
  chainId: number;
}

export interface IGovernorEnqueuedVaasByChainId {
  data: TGovernorEnqueuedVaas[];
  pagination: Pagination;
}

export interface IGovernorsLimitInput extends TSortOptions {}

export interface IGovernorsLimit {
  data: {
    availableNotional: number;
    chainId: number;
    maxTransactionSize: number;
    notionalLimit: number;
  }[];
  pagination: Pagination;
}

export interface IGovernorMaxAvailableNotionalInput extends TSortOptions {
  chainId: number;
}

export interface IGovernorMaxAvailableNotional {
  data: {
    availableNotional: number;
    chainId: number;
    createdAt: string;
    emitters: {
      emitterAddress: string;
      enqueuedVaas: number;
      totalEnqueuedVaas: number;
    }[];
    id: string;
    nodeName: string;
    updatedAt: string;
  };
  pagination: Pagination;
}

type TGovernorAvailableNotional = {
  availableNotional: number;
  chainId: number;
  createdAt?: string;
  id?: string;
  nodeName?: string;
  updatedAt?: string;
};

export interface IGovernorAvailableNotionalInput extends TSortOptions {}

export interface IGovernorAvailableNotional {
  data: TGovernorAvailableNotional[];
  pagination: Pagination;
}

export interface IGovernorAvailableNotionalByChainIdInput extends TSortOptions {
  chainId: number;
}

export interface IGovernorAvailableNotionalByChainId {
  data: TGovernorAvailableNotional[];
  pagination: Pagination;
}

type TGovernorLimitNotional = {
  chainId: number;
  createdAt: string;
  id: string;
  maxTransactionSize: number;
  nodename: string;
  notionalLimit: number;
  updatedAt: string;
};

export interface IGovernorLimitNotionalInput extends TSortOptions {}

export interface IGovernorLimitNotional {
  data: TGovernorLimitNotional[];
  pagination: Pagination;
}

export interface IGovernorLimitNotionalByChainIdInput extends TSortOptions {
  chainId: number;
}

export interface IGovernorLimitNotionalByChainId {
  data: TGovernorLimitNotional[];
  pagination: Pagination;
}

type TGovernorStatus = {
  chains: {
    chainid: number;
    emitters: {
      emitteraddress: string;
      enqueuedvaas: string;
      totalenqueuedvaas: number;
    }[];
    remainingavailablenotional: number;
  }[];
  createdAt: string;
  id: string;
  nodename: string;
  updatedAt: string;
};

export interface IGovernorStatusInput extends TSortOptions {}

export interface IGovernorStatus {
  data: TGovernorStatus[];
  pagination: Pagination;
}

export interface IGovernorStatusByGuardianIdInput extends TSortOptions {
  guardianId: string;
}

export interface IGovernorStatusByGuardianId {
  data: TGovernorStatus;
  pagination: Pagination;
}

type TObservation = {
  emitterAddr: string;
  emitterChain: number;
  guardianAddr: string;
  hash: number[];
  id: string;
  indexedAt: string;
  sequence: string;
  signature: number[];
  txHash: number[];
  updatedAt: string;
  version: number;
};

export interface IObservationsInput extends TSortOptions {}

export type IObservations = IObservation[];

type TObservationsInputs =
  | {
      chainId: number;
      emitter?: undefined;
      sequence?: undefined;
      specific?: undefined;
    }
  | {
      chainId: number;
      emitter: string;
      sequence?: undefined;
      specific?: undefined;
    }
  | {
      chainId: number;
      emitter: string;
      sequence: number;
      specific?: {
        signer: string;
        hash: string;
      };
    };

export type IObservationInput = TObservationsInputs & TSortOptions;
export type IVAAInput = TObservationsInputs & TSortOptions;

export type IObservation = TObservation[];

type TVAA = {
  emitterAddr: string;
  emitterChain: number;
  guardianSetIndex: number;
  id: string;
  indexedAt: string;
  sequence?: number;
  timestamp: string;
  txHash?: string;
  updatedAt: string;
  vaa: string;
  version: number;
};

type TVAACount = {
  chainId: number;
  count: number;
};

export interface IVAAsInput extends TSortOptions {}

export interface IVAAs {
  data: TVAA[];
  pagination: Pagination;
}

export interface IVAAsCount {
  data: TVAACount[];
  pagination: Pagination;
}

export interface IVAA {
  data: TVAA[];
  pagination: Pagination;
}
