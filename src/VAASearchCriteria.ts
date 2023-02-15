export type SpecificVAACriteria =
  | {
      sequence: number;
      signer?: undefined;
      hash?: undefined;
    }
  | {
      sequence: number;
      signer: string;
      hash: string;
    };

export type VAASearchCriteria =
  | {
      chainId: number;
      emmiter?: undefined;
      specific?: undefined;
    }
  | {
      chainId: number;
      emmiter: string;
      specific?: undefined;
    }
  | {
      chainId: number;
      emmiter: string;
      specific: SpecificVAACriteria;
    };
