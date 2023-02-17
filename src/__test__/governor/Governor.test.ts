import axios from "axios";
import { createClient } from "src/wormscan/Wormscan";
import { ChainId } from "src/model";
import { Governor, NodeConfiguration, NodeStatus, NotionalLimit } from "src/governor";

jest.mock("axios");
const mocked = axios as jest.Mocked<typeof axios>;

const data = [
  {
    id: "f93124b7c738843cbb89e864c862c38cddcccf95",
    createdAt: "2022-12-15T18:37:05.751Z",
    updatedAt: "2023-02-06T20:48:53.309Z",
    nodename: "P2P Validator",
    counter: 2,
    chains: [
      {
        chainid: 5,
        notionallimit: 5000000,
        bigtransactionsize: 500000,
      },
    ],
    tokens: [
      {
        originchainid: 2,
        originaddress: "0x0000000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e",
        price: 8037.91,
      },
    ],
  },
];

describe("governor", () => {
  let governor: Governor;

  beforeAll(async () => {
    mocked.create.mockReturnThis();
    governor = createClient().governor;
  });

  afterEach(() => mocked.get.mockClear());

  test("getConfiguration for all nodes", async () => {
    mocked.get.mockResolvedValue({ data: { data } });
    const configuration: NodeConfiguration[] = await governor.getConfiguration();
    expect(configuration).toStrictEqual([
      {
        id: "f93124b7c738843cbb89e864c862c38cddcccf95",
        createdAt: new Date("2022-12-15T18:37:05.751Z"),
        updatedAt: new Date("2023-02-06T20:48:53.309Z"),
        nodeName: "P2P Validator",
        counter: 2,
        chains: [
          { chainId: ChainId[ChainId.Polygon], notionalLimit: 5000000, bigTransactionSize: 500000 },
        ],
        tokens: [
          {
            originChainId: ChainId[ChainId.Ethereum],
            originAddress: "0x0000000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e",
            price: 8037.91,
          },
        ],
      },
    ]);
  });

  test("getConfiguration for all nodes throws (5xx) server error", async () => {
    mocked.get.mockRejectedValueOnce({
      statusCode: 500,
      data: undefined,
    });
    try {
      await governor.getConfiguration();
    } catch (err: any) {
      expect(err).not.toBeUndefined();
    }
  });

  test("getConfiguration for a single node", async () => {
    mocked.get.mockResolvedValue({ data: { data } });
    const configuration: NodeConfiguration = await governor.getConfiguration(
      "f93124b7c738843cbb89e864c862c38cddcccf95",
    );
    expect(configuration).toStrictEqual({
      id: "f93124b7c738843cbb89e864c862c38cddcccf95",
      createdAt: new Date("2022-12-15T18:37:05.751Z"),
      updatedAt: new Date("2023-02-06T20:48:53.309Z"),
      nodeName: "P2P Validator",
      counter: 2,
      chains: [
        { chainId: ChainId[ChainId.Polygon], notionalLimit: 5000000, bigTransactionSize: 500000 },
      ],
      tokens: [
        {
          originChainId: ChainId[ChainId.Ethereum],
          originAddress: "0x0000000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e",
          price: 8037.91,
        },
      ],
    });
  });

  test("getEnqueuedVaas for all nodes", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            chainId: 7,
            enqueuedVaas: [
              {
                sequence: 10482,
                chainId: 7,
                emitterAddress:
                  "0x0000000000000000000000005848c791e09901b40a9ef749f2a6735b418d7564",
                notionalValue: 0,
                txHash: "0xefb30fe6b181449ff84be6a66f89b2537209c718330f7141b4ef79519e971edf",
              },
            ],
          },
        ],
      },
    });
    const enqueuedVaas = await governor.getEnqueuedVaas();
    const vaa = enqueuedVaas.pop();
    expect(vaa.chainId).toBe(ChainId[ChainId.Oasis]);
    const data = vaa.enqueuedVAA.pop();
    expect(data.sequence).toBe(10482);
    expect(data.chainId).toBe(ChainId[ChainId.Oasis]);
    expect(data.emitterAddress).toBe(
      "0x0000000000000000000000005848c791e09901b40a9ef749f2a6735b418d7564",
    );
    expect(data.notionalValue).toBe(0);
    expect(data.txHash).toBe("0xefb30fe6b181449ff84be6a66f89b2537209c718330f7141b4ef79519e971edf");
  });

  test("getEnqueuedVaas for a single chaind", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            sequence: 11971,
            chainid: 7,
            emitterAddress: "0x0000000000000000000000005848c791e09901b40a9ef749f2a6735b418d7564",
            notionalValue: 0,
            txHash: "0xe1d411b8f796b37cef1474eb12f1a74b0beebc2b2e8d30f69213f667233acb32",
            releaseTime: 1675894720,
          },
        ],
      },
    });

    const vaas = await governor.getEnqueuedVaas(ChainId.Oasis);
    const vaa = vaas.pop();
    expect(vaa.sequence).toBe(11971);
    expect(vaa.chainId).toBe(ChainId[ChainId.Oasis]);
    expect(vaa.emitterAddress).toBe(
      "0x0000000000000000000000005848c791e09901b40a9ef749f2a6735b418d7564",
    );
    expect(vaa.notionalValue).toBe(0);
    expect(vaa.txHash).toBe("0xe1d411b8f796b37cef1474eb12f1a74b0beebc2b2e8d30f69213f667233acb32");
    expect(vaa.releaseTime);
    expect(mocked.get.mock.calls[0][0]).toBe("/governor/enqueued_vaa/7");
  });

  test("getAvailableNotional", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            chainId: 1,
            availableNotional: 49298112,
          },
        ],
      },
    });
    const notionalAvailables = await governor.getAvailableNotional();
    const notionalAvailable = notionalAvailables.pop();
    expect(notionalAvailable.chainId).toBe(ChainId[ChainId.Solana]);
    expect(notionalAvailable.availableNotional).toBe(49298112);
    expect(mocked.get.mock.calls[0][0]).toStrictEqual("/governor/notional/available");
  });

  test("getAvailableNotional with chainId", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: "d2cc37a4dc036a8d232b48f62cdd4731412f4890",
            chainId: 12,
            nodeName: "01node",
            availableNotional: 48484378,
            createdAt: "2022-12-15T18:37:21.349Z",
            updatedAt: "2023-02-08T19:00:05.988Z",
          },
        ],
      },
    });
    const chainNotionalAvailables = await governor.getAvailableNotional(ChainId.Acala);
    const chainNotionalAvailable = chainNotionalAvailables.pop();
    expect(chainNotionalAvailable.id).toBe("d2cc37a4dc036a8d232b48f62cdd4731412f4890");
    expect(chainNotionalAvailable.chainId).toBe(ChainId[ChainId.Acala]);
    expect(chainNotionalAvailable.nodeName).toBe("01node");
    expect(chainNotionalAvailable.availableNotional).toBe(48484378);
    expect(chainNotionalAvailable.createdAt).toStrictEqual(new Date("2022-12-15T18:37:21.349Z"));
    expect(chainNotionalAvailable.updatedAt).toStrictEqual(new Date("2023-02-08T19:00:05.988Z"));
    expect(mocked.get.mock.calls[0][0]).toStrictEqual("/governor/notional/available/12");
  });

  test("getNotionalLimit", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            chainid: 1,
            notionalLimit: 50000000,
            maxTransactionSize: 5000000,
          },
        ],
      },
    });
    const notionalLimits = await governor.getNotionalLimit();
    const notionalLimit: NotionalLimit = notionalLimits.pop();
    expect(notionalLimit.chainId).toBe(ChainId[ChainId.Solana]);
    expect(notionalLimit.notionalLimit).toBe(50000000);
    expect(notionalLimit.maxTransactionSize).toBe(5000000);
    expect(mocked.get.mock.calls[0][0]).toBe("/governor/notional/limit");
  });

  test("getNotionalLimit with chainId", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: "f93124b7c738843cbb89e864c862c38cddcccf95",
            chainId: 1,
            nodename: "P2P Validator",
            notionalLimit: 50000000,
            maxTransactionSize: 5000000,
            createdAt: "2022-12-15T18:37:05.751Z",
            updatedAt: "2023-02-08T18:01:04.628Z",
          },
        ],
      },
    });
    const notionalLimits = await governor.getNotionalLimit(ChainId.Solana);
    const notionalLimit = notionalLimits.pop();
    expect(notionalLimit.id).toBe("f93124b7c738843cbb89e864c862c38cddcccf95");
    expect(notionalLimit.chainId).toBe(ChainId[ChainId.Solana]);
    expect(notionalLimit.nodeName).toBe("P2P Validator");
    expect(notionalLimit.notionalLimit).toBe(50000000);
    expect(notionalLimit.maxTransactionSize).toBe(5000000);
    expect(notionalLimit.createdAt).toStrictEqual(new Date("2022-12-15T18:37:05.751Z"));
    expect(notionalLimit.updatedAt).toStrictEqual(new Date("2023-02-08T18:01:04.628Z"));
    expect(mocked.get.mock.calls[0][0]).toBe("/governor/notional/limit/1");
  });

  test("getStatus", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: "d2cc37a4dc036a8d232b48f62cdd4731412f4890",
            createdAt: "2022-12-15T18:37:21.349Z",
            updatedAt: "2023-02-08T15:43:51.18Z",
            nodename: "01node",
            chains: [
              {
                chainid: 15,
                remainingavailablenotional: 5000000,
                emitters: [
                  {
                    emitteraddress:
                      "0x148410499d3fcda4dcfd68a1ebfcdddda16ab28326448d4aae4d2f0465cdfcb7",
                    totalenqueuedvaas: 0,
                  },
                ],
              },
              {
                chainid: 22,
                remainingavailablenotional: 4587691,
                emitters: [
                  {
                    emitteraddress:
                      "0x0000000000000000000000000000000000000000000000000000000000000001",
                    totalenqueuedvaas: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    const status = await governor.getStatus();
    const singleStatus: NodeStatus = status.pop();
    expect(singleStatus.id).toBe("d2cc37a4dc036a8d232b48f62cdd4731412f4890");
    expect(singleStatus.nodeName).toBe("01node");
    expect(singleStatus.chains).toHaveLength(2);
    expect(singleStatus.createdAt).toStrictEqual(new Date("2022-12-15T18:37:21.349Z"));
    expect(singleStatus.updatedAt).toStrictEqual(new Date("2023-02-08T15:43:51.18Z"));
    expect(singleStatus.chains[0].chainId).toBe(ChainId[ChainId.Near]);
    expect(singleStatus.chains[0].remainingAvailableNotional).toBe(5000000);
    expect(singleStatus.chains[0].emitters[0].emitterAddress).toBe(
      "0x148410499d3fcda4dcfd68a1ebfcdddda16ab28326448d4aae4d2f0465cdfcb7",
    );
    expect(singleStatus.chains[0].emitters[0].totalEnqueuedVAAs).toBe(0);
    expect(singleStatus.chains[1].chainId).toBe(ChainId[ChainId.Aptos]);
    expect(singleStatus.chains[1].remainingAvailableNotional).toBe(4587691);
    expect(singleStatus.chains[1].emitters[0].emitterAddress).toBe(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(singleStatus.chains[1].emitters[0].totalEnqueuedVAAs).toBe(0);
  });

  test("getStatus with guardianId", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: {
          id: "d2cc37a4dc036a8d232b48f62cdd4731412f4890",
          createdAt: "2022-12-15T18:37:21.349Z",
          updatedAt: "2023-02-08T15:43:51.18Z",
          nodename: "01node",
          chains: [
            {
              chainid: 15,
              remainingavailablenotional: 5000000,
              emitters: [
                {
                  emitteraddress:
                    "0x148410499d3fcda4dcfd68a1ebfcdddda16ab28326448d4aae4d2f0465cdfcb7",
                  totalenqueuedvaas: 0,
                },
              ],
            },
            {
              chainid: 22,
              remainingavailablenotional: 4587691,
              emitters: [
                {
                  emitteraddress:
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                  totalenqueuedvaas: 0,
                },
              ],
            },
          ],
        },
      },
    });

    const singleStatus = await governor.getStatus("d2cc37a4dc036a8d232b48f62cdd4731412f4890");
    expect(singleStatus.id).toBe("d2cc37a4dc036a8d232b48f62cdd4731412f4890");
    expect(singleStatus.nodeName).toBe("01node");
    expect(singleStatus.chains).toHaveLength(2);
    expect(singleStatus.createdAt).toStrictEqual(new Date("2022-12-15T18:37:21.349Z"));
    expect(singleStatus.updatedAt).toStrictEqual(new Date("2023-02-08T15:43:51.18Z"));
    expect(singleStatus.chains[0].chainId).toBe(ChainId[ChainId.Near]);
    expect(singleStatus.chains[0].remainingAvailableNotional).toBe(5000000);
    expect(singleStatus.chains[0].emitters[0].emitterAddress).toBe(
      "0x148410499d3fcda4dcfd68a1ebfcdddda16ab28326448d4aae4d2f0465cdfcb7",
    );
    expect(singleStatus.chains[0].emitters[0].totalEnqueuedVAAs).toBe(0);
    expect(singleStatus.chains[1].chainId).toBe(ChainId[ChainId.Aptos]);
    expect(singleStatus.chains[1].remainingAvailableNotional).toBe(4587691);
    expect(singleStatus.chains[1].emitters[0].emitterAddress).toBe(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(singleStatus.chains[1].emitters[0].totalEnqueuedVAAs).toBe(0);
  });

  test("getLimit", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            chainId: 1,
            availableNotional: 49253436,
            notionalLimit: 50000000,
            maxTransactionSize: 5000000,
          },
        ],
      },
    });

    const limits = await governor.getLimit();
    const limit = limits.pop();
    expect(limit.chainId).toBe(ChainId[ChainId.Solana]);
    expect(limit.availableNotional).toBe(49253436);
    expect(limit.notionalLimit).toBe(50000000);
    expect(limit.maxTransactionSize).toBe(5000000);
  });
});
