import axios from "axios";
import { createClient } from "src/wormscan/Wormscan";
import { ChainId } from "src/model";
import { GuardianNetwork } from "src/guardian-network";

jest.mock("axios");

const mocked = axios as jest.Mocked<typeof axios>;

const data = [
  {
    sequence: 9269,
    id: "22/0000000000000000000000000000000000000000000000000000000000000001/9269",
    version: 1,
    emitterChain: 22,
    emitterAddr: "0000000000000000000000000000000000000000000000000000000000000001",
    guardianSetIndex: 3,
    vaa: "AQAAAAMNAJ1+u47+6YXcmKgxPAZFne5jVfQ6V4oAzbRjPaJdsrUpS/KQ+4l1zxzhOXehHKM6iDx1vhB6iAQsmoQvebXgGIIAAtcvDyBgu+DrY/MAWKQTdn7Cmx64QxHlaomN4fuKInEDC+Q9OQK0MELFoGRG9i/4cVocK8/B19S6zuV0oFiCMaYABVb1D3VKMb6VEA/7uI4ALpym8vkPIVfBeOJI2HhcoeIyZG6FVyH5nd8NAU8HhVd599zcDGjEECoMF6zDBMaSvvMABs1ht/tqb5FAVERgSNedBxtXJfP2LHFZJvn1gTJz5kzcU6Zm/0lHNprjMtEmrRJcR9Ge3QVTVqdW9A32RHae+8QABzgXwMntAoqaPapB09F8rJ5bZWVo/Ua6Yq4TvMixD66SWGZYcwgo74kgYKEf1MtQJwEPkqp8tiN+dH3G30wQAVQACLlnyMqCrFpSkL42U0Egp1bjV/KeAJGkT2eMgunR8r44atdXCugSBmaV5Xm+FGcS1hRUiG8Qf6+GXMbTxGKKb/IACUDV7n6I3iz6jLMnfTL5LTwwYn5+NsqJY++vq+k2P+dxEvLpvru3SFgGflMG/S289bWgbghGMHI1lTM0oMZgPIgAC1A+GaXiukNIhnbkgE0UWeBBjj3p3ZXudDNMGWvXGufGcJoUn/EZX0mEC0GyCqFjahS/UKW/sFnPgN37QbhfLWYADFW5cjxX2Xe32+mWZvHuUIlF00vvD+eiQf/sZYNxDCypB3xKUr71lcZxi1Mv8dvbaFm4GZZwbOtGR8crFzY02aQBDQxzP8TM3b9OjTz1Lg2con1snOk2g0AGJJu4NaDgjTNHfMvlriSDkpt4Nfszp2EFd3rkwHvcNEEzK+yKdTWF9VUBD4V06TWlWyxfDlTwpcpknQ0wxg+qP0KmT1OhKtL7vX30NwXkJGBKjh50da6so+ROOjorQiLpqR1tkOQSRaKJNcsBEHOpDJlR8i0UwYA/mG+Bsf6xd438vqWleGhGOViLq2BPcDB7BUgBWdIRMCcSe4uo0ppzYOSph7MtG/dar4F8Q0YBEZ4sRyEGUGJqzZ4MeT/6pXk8eVZYQ2dSxc8OIXVWm+SUFyZY+Eo7YlRTWwp1bSPUw0MNZ918qdiBOqP8SNJk1ZQBY+T5jwABadEAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAJDUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAysN3sr/AAAAAAAAAAAAAAAADgn6u3O9Ot4KF+zDIf0ToZ6BzoIABAAAAAAAAAAAAAAAAI1CQWNNnJ9B/c0/vLGzFi8aNlrJAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    timestamp: "2023-02-09T13:47:59Z",
    updatedAt: "2023-02-09T13:48:01.287Z",
    indexedAt: "2023-02-09T13:48:01.287Z",
    txHash: "0000000000000000000000000000000000000000000000000000000000002435",
  },
];

const observations = [
  {
    sequence: 231494,
    id: "4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494/74a3bf913953d695260d88bc1aa25a4eee363ef0/9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
    version: 0,
    emitterChain: 4,
    emitterAddr: "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    hash: "nyDv7p1Heq6zcNqpLv58jfqws2aauZ9OpCZs4Ps0EJ4=",
    txHash: "p6SRfGF31X9Kdw5g/4VFKQd8l9657QZGr7H6AHUUgZk=",
    guardianAddr: "0x74a3bf913953D695260D88BC1aA25A4eeE363ef0",
    signature:
      "X6QM78Lk0J3zxe3WGAGA9XwEduzNYJ6xmEK7jPnTGvU6ni/+GV9wXoRh4YlJbk5OPWHruQ64V0A1iekpAkfawgA=",
    updatedAt: "2023-02-09T14:10:15.415Z",
    indexedAt: "2023-02-09T14:10:15.25Z",
  },
];

describe("guardian", () => {
  let guardian: GuardianNetwork;

  beforeAll(async () => {
    mocked.create.mockReturnThis();
    guardian = createClient().guardianNetwork;
  });

  afterEach(() => {
    mocked.get.mockClear();
  });

  test("getVAAs", async () => {
    mocked.get.mockResolvedValueOnce({ data: { data } });
    const vaas = await guardian.getVAA();
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe("/vaas");
    expect(vaa.sequence).toBe(9269);
    expect(vaa.id).toBe("22/0000000000000000000000000000000000000000000000000000000000000001/9269");
    expect(vaa.version).toBe(1);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.Aptos]);
    expect(vaa.emitterAddr).toBe(
      "0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(vaa.guardianSetIndex).toBe(3);
    expect(vaa.vaa).toBe(
      "AQAAAAMNAJ1+u47+6YXcmKgxPAZFne5jVfQ6V4oAzbRjPaJdsrUpS/KQ+4l1zxzhOXehHKM6iDx1vhB6iAQsmoQvebXgGIIAAtcvDyBgu+DrY/MAWKQTdn7Cmx64QxHlaomN4fuKInEDC+Q9OQK0MELFoGRG9i/4cVocK8/B19S6zuV0oFiCMaYABVb1D3VKMb6VEA/7uI4ALpym8vkPIVfBeOJI2HhcoeIyZG6FVyH5nd8NAU8HhVd599zcDGjEECoMF6zDBMaSvvMABs1ht/tqb5FAVERgSNedBxtXJfP2LHFZJvn1gTJz5kzcU6Zm/0lHNprjMtEmrRJcR9Ge3QVTVqdW9A32RHae+8QABzgXwMntAoqaPapB09F8rJ5bZWVo/Ua6Yq4TvMixD66SWGZYcwgo74kgYKEf1MtQJwEPkqp8tiN+dH3G30wQAVQACLlnyMqCrFpSkL42U0Egp1bjV/KeAJGkT2eMgunR8r44atdXCugSBmaV5Xm+FGcS1hRUiG8Qf6+GXMbTxGKKb/IACUDV7n6I3iz6jLMnfTL5LTwwYn5+NsqJY++vq+k2P+dxEvLpvru3SFgGflMG/S289bWgbghGMHI1lTM0oMZgPIgAC1A+GaXiukNIhnbkgE0UWeBBjj3p3ZXudDNMGWvXGufGcJoUn/EZX0mEC0GyCqFjahS/UKW/sFnPgN37QbhfLWYADFW5cjxX2Xe32+mWZvHuUIlF00vvD+eiQf/sZYNxDCypB3xKUr71lcZxi1Mv8dvbaFm4GZZwbOtGR8crFzY02aQBDQxzP8TM3b9OjTz1Lg2con1snOk2g0AGJJu4NaDgjTNHfMvlriSDkpt4Nfszp2EFd3rkwHvcNEEzK+yKdTWF9VUBD4V06TWlWyxfDlTwpcpknQ0wxg+qP0KmT1OhKtL7vX30NwXkJGBKjh50da6so+ROOjorQiLpqR1tkOQSRaKJNcsBEHOpDJlR8i0UwYA/mG+Bsf6xd438vqWleGhGOViLq2BPcDB7BUgBWdIRMCcSe4uo0ppzYOSph7MtG/dar4F8Q0YBEZ4sRyEGUGJqzZ4MeT/6pXk8eVZYQ2dSxc8OIXVWm+SUFyZY+Eo7YlRTWwp1bSPUw0MNZ918qdiBOqP8SNJk1ZQBY+T5jwABadEAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAJDUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAysN3sr/AAAAAAAAAAAAAAAADgn6u3O9Ot4KF+zDIf0ToZ6BzoIABAAAAAAAAAAAAAAAAI1CQWNNnJ9B/c0/vLGzFi8aNlrJAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    );
    expect(vaa.timestamp).toStrictEqual(new Date("2023-02-09T13:47:59Z"));
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.txHash).toBe("0000000000000000000000000000000000000000000000000000000000002435");
  });

  test("getVAAs for a given chainId", async () => {
    mocked.get.mockResolvedValueOnce({ data: { data } });

    const vaas = await guardian.getVAA({
      chainId: ChainId.Solana,
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe("/vaas/1");
    expect(vaa.sequence).toBe(9269);
    expect(vaa.id).toBe("22/0000000000000000000000000000000000000000000000000000000000000001/9269");
    expect(vaa.version).toBe(1);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.Aptos]);
    expect(vaa.emitterAddr).toBe(
      "0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(vaa.guardianSetIndex).toBe(3);
    expect(vaa.vaa).toBe(
      "AQAAAAMNAJ1+u47+6YXcmKgxPAZFne5jVfQ6V4oAzbRjPaJdsrUpS/KQ+4l1zxzhOXehHKM6iDx1vhB6iAQsmoQvebXgGIIAAtcvDyBgu+DrY/MAWKQTdn7Cmx64QxHlaomN4fuKInEDC+Q9OQK0MELFoGRG9i/4cVocK8/B19S6zuV0oFiCMaYABVb1D3VKMb6VEA/7uI4ALpym8vkPIVfBeOJI2HhcoeIyZG6FVyH5nd8NAU8HhVd599zcDGjEECoMF6zDBMaSvvMABs1ht/tqb5FAVERgSNedBxtXJfP2LHFZJvn1gTJz5kzcU6Zm/0lHNprjMtEmrRJcR9Ge3QVTVqdW9A32RHae+8QABzgXwMntAoqaPapB09F8rJ5bZWVo/Ua6Yq4TvMixD66SWGZYcwgo74kgYKEf1MtQJwEPkqp8tiN+dH3G30wQAVQACLlnyMqCrFpSkL42U0Egp1bjV/KeAJGkT2eMgunR8r44atdXCugSBmaV5Xm+FGcS1hRUiG8Qf6+GXMbTxGKKb/IACUDV7n6I3iz6jLMnfTL5LTwwYn5+NsqJY++vq+k2P+dxEvLpvru3SFgGflMG/S289bWgbghGMHI1lTM0oMZgPIgAC1A+GaXiukNIhnbkgE0UWeBBjj3p3ZXudDNMGWvXGufGcJoUn/EZX0mEC0GyCqFjahS/UKW/sFnPgN37QbhfLWYADFW5cjxX2Xe32+mWZvHuUIlF00vvD+eiQf/sZYNxDCypB3xKUr71lcZxi1Mv8dvbaFm4GZZwbOtGR8crFzY02aQBDQxzP8TM3b9OjTz1Lg2con1snOk2g0AGJJu4NaDgjTNHfMvlriSDkpt4Nfszp2EFd3rkwHvcNEEzK+yKdTWF9VUBD4V06TWlWyxfDlTwpcpknQ0wxg+qP0KmT1OhKtL7vX30NwXkJGBKjh50da6so+ROOjorQiLpqR1tkOQSRaKJNcsBEHOpDJlR8i0UwYA/mG+Bsf6xd438vqWleGhGOViLq2BPcDB7BUgBWdIRMCcSe4uo0ppzYOSph7MtG/dar4F8Q0YBEZ4sRyEGUGJqzZ4MeT/6pXk8eVZYQ2dSxc8OIXVWm+SUFyZY+Eo7YlRTWwp1bSPUw0MNZ918qdiBOqP8SNJk1ZQBY+T5jwABadEAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAJDUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAysN3sr/AAAAAAAAAAAAAAAADgn6u3O9Ot4KF+zDIf0ToZ6BzoIABAAAAAAAAAAAAAAAAI1CQWNNnJ9B/c0/vLGzFi8aNlrJAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    );
    expect(vaa.timestamp).toStrictEqual(new Date("2023-02-09T13:47:59Z"));
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.txHash).toBe("0000000000000000000000000000000000000000000000000000000000002435");
  });

  test("getVAAs for a given chainId and emitter", async () => {
    mocked.get.mockResolvedValueOnce({ data: { data } });

    const vaas = await guardian.getVAA({
      chainId: ChainId.Solana,
      emmiter: "0000000000000000000000000000000000000000000000000000000000000001",
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe(
      "/vaas/1/0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(vaa.sequence).toBe(9269);
    expect(vaa.id).toBe("22/0000000000000000000000000000000000000000000000000000000000000001/9269");
    expect(vaa.version).toBe(1);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.Aptos]);
    expect(vaa.emitterAddr).toBe(
      "0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(vaa.guardianSetIndex).toBe(3);
    expect(vaa.vaa).toBe(
      "AQAAAAMNAJ1+u47+6YXcmKgxPAZFne5jVfQ6V4oAzbRjPaJdsrUpS/KQ+4l1zxzhOXehHKM6iDx1vhB6iAQsmoQvebXgGIIAAtcvDyBgu+DrY/MAWKQTdn7Cmx64QxHlaomN4fuKInEDC+Q9OQK0MELFoGRG9i/4cVocK8/B19S6zuV0oFiCMaYABVb1D3VKMb6VEA/7uI4ALpym8vkPIVfBeOJI2HhcoeIyZG6FVyH5nd8NAU8HhVd599zcDGjEECoMF6zDBMaSvvMABs1ht/tqb5FAVERgSNedBxtXJfP2LHFZJvn1gTJz5kzcU6Zm/0lHNprjMtEmrRJcR9Ge3QVTVqdW9A32RHae+8QABzgXwMntAoqaPapB09F8rJ5bZWVo/Ua6Yq4TvMixD66SWGZYcwgo74kgYKEf1MtQJwEPkqp8tiN+dH3G30wQAVQACLlnyMqCrFpSkL42U0Egp1bjV/KeAJGkT2eMgunR8r44atdXCugSBmaV5Xm+FGcS1hRUiG8Qf6+GXMbTxGKKb/IACUDV7n6I3iz6jLMnfTL5LTwwYn5+NsqJY++vq+k2P+dxEvLpvru3SFgGflMG/S289bWgbghGMHI1lTM0oMZgPIgAC1A+GaXiukNIhnbkgE0UWeBBjj3p3ZXudDNMGWvXGufGcJoUn/EZX0mEC0GyCqFjahS/UKW/sFnPgN37QbhfLWYADFW5cjxX2Xe32+mWZvHuUIlF00vvD+eiQf/sZYNxDCypB3xKUr71lcZxi1Mv8dvbaFm4GZZwbOtGR8crFzY02aQBDQxzP8TM3b9OjTz1Lg2con1snOk2g0AGJJu4NaDgjTNHfMvlriSDkpt4Nfszp2EFd3rkwHvcNEEzK+yKdTWF9VUBD4V06TWlWyxfDlTwpcpknQ0wxg+qP0KmT1OhKtL7vX30NwXkJGBKjh50da6so+ROOjorQiLpqR1tkOQSRaKJNcsBEHOpDJlR8i0UwYA/mG+Bsf6xd438vqWleGhGOViLq2BPcDB7BUgBWdIRMCcSe4uo0ppzYOSph7MtG/dar4F8Q0YBEZ4sRyEGUGJqzZ4MeT/6pXk8eVZYQ2dSxc8OIXVWm+SUFyZY+Eo7YlRTWwp1bSPUw0MNZ918qdiBOqP8SNJk1ZQBY+T5jwABadEAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAJDUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAysN3sr/AAAAAAAAAAAAAAAADgn6u3O9Ot4KF+zDIf0ToZ6BzoIABAAAAAAAAAAAAAAAAI1CQWNNnJ9B/c0/vLGzFi8aNlrJAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    );
    expect(vaa.timestamp).toStrictEqual(new Date("2023-02-09T13:47:59Z"));
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.txHash).toBe("0000000000000000000000000000000000000000000000000000000000002435");
  });

  test("getVAAs for a given chainId, emitter and sequence", async () => {
    mocked.get.mockResolvedValueOnce({ data: { data } });

    const vaas = await guardian.getVAA({
      chainId: ChainId.Solana,
      emmiter: "0000000000000000000000000000000000000000000000000000000000000001",
      specific: {
        sequence: 9269,
      },
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe(
      "/vaas/1/0000000000000000000000000000000000000000000000000000000000000001/9269",
    );
    expect(vaa.sequence).toBe(9269);
    expect(vaa.id).toBe("22/0000000000000000000000000000000000000000000000000000000000000001/9269");
    expect(vaa.version).toBe(1);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.Aptos]);
    expect(vaa.emitterAddr).toBe(
      "0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(vaa.guardianSetIndex).toBe(3);
    expect(vaa.vaa).toBe(
      "AQAAAAMNAJ1+u47+6YXcmKgxPAZFne5jVfQ6V4oAzbRjPaJdsrUpS/KQ+4l1zxzhOXehHKM6iDx1vhB6iAQsmoQvebXgGIIAAtcvDyBgu+DrY/MAWKQTdn7Cmx64QxHlaomN4fuKInEDC+Q9OQK0MELFoGRG9i/4cVocK8/B19S6zuV0oFiCMaYABVb1D3VKMb6VEA/7uI4ALpym8vkPIVfBeOJI2HhcoeIyZG6FVyH5nd8NAU8HhVd599zcDGjEECoMF6zDBMaSvvMABs1ht/tqb5FAVERgSNedBxtXJfP2LHFZJvn1gTJz5kzcU6Zm/0lHNprjMtEmrRJcR9Ge3QVTVqdW9A32RHae+8QABzgXwMntAoqaPapB09F8rJ5bZWVo/Ua6Yq4TvMixD66SWGZYcwgo74kgYKEf1MtQJwEPkqp8tiN+dH3G30wQAVQACLlnyMqCrFpSkL42U0Egp1bjV/KeAJGkT2eMgunR8r44atdXCugSBmaV5Xm+FGcS1hRUiG8Qf6+GXMbTxGKKb/IACUDV7n6I3iz6jLMnfTL5LTwwYn5+NsqJY++vq+k2P+dxEvLpvru3SFgGflMG/S289bWgbghGMHI1lTM0oMZgPIgAC1A+GaXiukNIhnbkgE0UWeBBjj3p3ZXudDNMGWvXGufGcJoUn/EZX0mEC0GyCqFjahS/UKW/sFnPgN37QbhfLWYADFW5cjxX2Xe32+mWZvHuUIlF00vvD+eiQf/sZYNxDCypB3xKUr71lcZxi1Mv8dvbaFm4GZZwbOtGR8crFzY02aQBDQxzP8TM3b9OjTz1Lg2con1snOk2g0AGJJu4NaDgjTNHfMvlriSDkpt4Nfszp2EFd3rkwHvcNEEzK+yKdTWF9VUBD4V06TWlWyxfDlTwpcpknQ0wxg+qP0KmT1OhKtL7vX30NwXkJGBKjh50da6so+ROOjorQiLpqR1tkOQSRaKJNcsBEHOpDJlR8i0UwYA/mG+Bsf6xd438vqWleGhGOViLq2BPcDB7BUgBWdIRMCcSe4uo0ppzYOSph7MtG/dar4F8Q0YBEZ4sRyEGUGJqzZ4MeT/6pXk8eVZYQ2dSxc8OIXVWm+SUFyZY+Eo7YlRTWwp1bSPUw0MNZ918qdiBOqP8SNJk1ZQBY+T5jwABadEAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAJDUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAysN3sr/AAAAAAAAAAAAAAAADgn6u3O9Ot4KF+zDIf0ToZ6BzoIABAAAAAAAAAAAAAAAAI1CQWNNnJ9B/c0/vLGzFi8aNlrJAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    );
    expect(vaa.timestamp).toStrictEqual(new Date("2023-02-09T13:47:59Z"));
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.txHash).toBe("0000000000000000000000000000000000000000000000000000000000002435");
  });

  test("getVAAs for a given chainId, emitter, sequence, signer and hash", async () => {
    mocked.get.mockResolvedValueOnce({ data: { data } });

    const vaas = await guardian.getVAA({
      chainId: ChainId.Solana,
      emmiter: "01",
      specific: {
        sequence: 9269,
        signer: "abc123",
        hash: "2435",
      },
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe("/vaas/1/01/9269/abc123/2435");
    expect(vaa.sequence).toBe(9269);
    expect(vaa.id).toBe("22/0000000000000000000000000000000000000000000000000000000000000001/9269");
    expect(vaa.version).toBe(1);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.Aptos]);
    expect(vaa.emitterAddr).toBe(
      "0000000000000000000000000000000000000000000000000000000000000001",
    );
    expect(vaa.guardianSetIndex).toBe(3);
    expect(vaa.vaa).toBe(
      "AQAAAAMNAJ1+u47+6YXcmKgxPAZFne5jVfQ6V4oAzbRjPaJdsrUpS/KQ+4l1zxzhOXehHKM6iDx1vhB6iAQsmoQvebXgGIIAAtcvDyBgu+DrY/MAWKQTdn7Cmx64QxHlaomN4fuKInEDC+Q9OQK0MELFoGRG9i/4cVocK8/B19S6zuV0oFiCMaYABVb1D3VKMb6VEA/7uI4ALpym8vkPIVfBeOJI2HhcoeIyZG6FVyH5nd8NAU8HhVd599zcDGjEECoMF6zDBMaSvvMABs1ht/tqb5FAVERgSNedBxtXJfP2LHFZJvn1gTJz5kzcU6Zm/0lHNprjMtEmrRJcR9Ge3QVTVqdW9A32RHae+8QABzgXwMntAoqaPapB09F8rJ5bZWVo/Ua6Yq4TvMixD66SWGZYcwgo74kgYKEf1MtQJwEPkqp8tiN+dH3G30wQAVQACLlnyMqCrFpSkL42U0Egp1bjV/KeAJGkT2eMgunR8r44atdXCugSBmaV5Xm+FGcS1hRUiG8Qf6+GXMbTxGKKb/IACUDV7n6I3iz6jLMnfTL5LTwwYn5+NsqJY++vq+k2P+dxEvLpvru3SFgGflMG/S289bWgbghGMHI1lTM0oMZgPIgAC1A+GaXiukNIhnbkgE0UWeBBjj3p3ZXudDNMGWvXGufGcJoUn/EZX0mEC0GyCqFjahS/UKW/sFnPgN37QbhfLWYADFW5cjxX2Xe32+mWZvHuUIlF00vvD+eiQf/sZYNxDCypB3xKUr71lcZxi1Mv8dvbaFm4GZZwbOtGR8crFzY02aQBDQxzP8TM3b9OjTz1Lg2con1snOk2g0AGJJu4NaDgjTNHfMvlriSDkpt4Nfszp2EFd3rkwHvcNEEzK+yKdTWF9VUBD4V06TWlWyxfDlTwpcpknQ0wxg+qP0KmT1OhKtL7vX30NwXkJGBKjh50da6so+ROOjorQiLpqR1tkOQSRaKJNcsBEHOpDJlR8i0UwYA/mG+Bsf6xd438vqWleGhGOViLq2BPcDB7BUgBWdIRMCcSe4uo0ppzYOSph7MtG/dar4F8Q0YBEZ4sRyEGUGJqzZ4MeT/6pXk8eVZYQ2dSxc8OIXVWm+SUFyZY+Eo7YlRTWwp1bSPUw0MNZ918qdiBOqP8SNJk1ZQBY+T5jwABadEAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAJDUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAysN3sr/AAAAAAAAAAAAAAAADgn6u3O9Ot4KF+zDIf0ToZ6BzoIABAAAAAAAAAAAAAAAAI1CQWNNnJ9B/c0/vLGzFi8aNlrJAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    );
    expect(vaa.timestamp).toStrictEqual(new Date("2023-02-09T13:47:59Z"));
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T13:48:01.287Z"));
    expect(vaa.txHash).toBe("0000000000000000000000000000000000000000000000000000000000002435");
  });

  test("getVAACount", async () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            chainId: 1,
            count: 100,
          },
        ],
      },
    });
    const counts = await guardian.getVAACount();
    const count = counts.pop();
    expect(mocked.get.mock.calls[0][0]).toBe("/vaas/vaa-counts");
    expect(count.chainId).toBe(ChainId[ChainId.Solana]);
    expect(count.count).toBe(100);
  });

  test("getObservation", async () => {
    mocked.get.mockResolvedValueOnce({ data: observations });
    const vaas = await guardian.getObservation();
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe("/observations");
    expect(vaa.sequence).toBe(231494);
    expect(vaa.id).toBe(
      "4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494/74a3bf913953d695260d88bc1aa25a4eee363ef0/9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
    );
    expect(vaa.version).toBe(0);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.BSC]);
    expect(vaa.emitterAddr).toBe(
      "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    );
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T14:10:15.415Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T14:10:15.250Z"));
    expect(vaa.txHash).toBe("p6SRfGF31X9Kdw5g/4VFKQd8l9657QZGr7H6AHUUgZk=");
  });

  test("getObservation for a given chainId", async () => {
    mocked.get.mockResolvedValueOnce({ data: observations });
    const vaas = await guardian.getObservation({
      chainId: ChainId.BSC,
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe("/observations/4");
    expect(vaa.sequence).toBe(231494);
    expect(vaa.id).toBe(
      "4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494/74a3bf913953d695260d88bc1aa25a4eee363ef0/9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
    );
    expect(vaa.version).toBe(0);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.BSC]);
    expect(vaa.emitterAddr).toBe(
      "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    );
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T14:10:15.415Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T14:10:15.250Z"));
    expect(vaa.txHash).toBe("p6SRfGF31X9Kdw5g/4VFKQd8l9657QZGr7H6AHUUgZk=");
  });

  test("getObservation for a given chainId and emitter", async () => {
    mocked.get.mockResolvedValueOnce({ data: observations });

    const vaas = await guardian.getObservation({
      chainId: ChainId.BSC,
      emmiter: "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe(
      "/observations/4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    );
    expect(vaa.sequence).toBe(231494);
    expect(vaa.id).toBe(
      "4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494/74a3bf913953d695260d88bc1aa25a4eee363ef0/9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
    );
    expect(vaa.version).toBe(0);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.BSC]);
    expect(vaa.emitterAddr).toBe(
      "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    );
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T14:10:15.415Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T14:10:15.250Z"));
    expect(vaa.txHash).toBe("p6SRfGF31X9Kdw5g/4VFKQd8l9657QZGr7H6AHUUgZk=");
  });

  test("getObservation for a given chainId, emitter and sequence", async () => {
    mocked.get.mockResolvedValueOnce({ data: observations });

    const vaas = await guardian.getObservation({
      chainId: ChainId.BSC,
      emmiter: "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
      specific: {
        sequence: 231494,
      },
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe(
      "/observations/4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494",
    );
    expect(vaa.sequence).toBe(231494);
    expect(vaa.id).toBe(
      "4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494/74a3bf913953d695260d88bc1aa25a4eee363ef0/9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
    );
    expect(vaa.version).toBe(0);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.BSC]);
    expect(vaa.emitterAddr).toBe(
      "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    );
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T14:10:15.415Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T14:10:15.250Z"));
    expect(vaa.txHash).toBe("p6SRfGF31X9Kdw5g/4VFKQd8l9657QZGr7H6AHUUgZk=");
  });

  test("getObservation for a given chainId, emitter, sequence, signer and hash", async () => {
    mocked.get.mockResolvedValueOnce({ data: observations });

    const vaas = await guardian.getObservation({
      chainId: ChainId.BSC,
      emmiter: "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
      specific: {
        sequence: 231494,
        signer: "74a3bf913953d695260d88bc1aa25a4eee363ef0",
        hash: "9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
      },
    });
    const vaa = vaas.pop();
    expect(mocked.get.mock.calls[0][0]).toBe(
      "/observations/4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494/74a3bf913953d695260d88bc1aa25a4eee363ef0/9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
    );
    expect(vaa.sequence).toBe(231494);
    expect(vaa.id).toBe(
      "4/000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7/231494/74a3bf913953d695260d88bc1aa25a4eee363ef0/9f20efee9d477aaeb370daa92efe7c8dfab0b3669ab99f4ea4266ce0fb34109e",
    );
    expect(vaa.version).toBe(0);
    expect(vaa.emitterChain).toBe(ChainId[ChainId.BSC]);
    expect(vaa.emitterAddr).toBe(
      "000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7",
    );
    expect(vaa.updatedAt).toStrictEqual(new Date("2023-02-09T14:10:15.415Z"));
    expect(vaa.indexedAt).toStrictEqual(new Date("2023-02-09T14:10:15.250Z"));
    expect(vaa.txHash).toBe("p6SRfGF31X9Kdw5g/4VFKQd8l9657QZGr7H6AHUUgZk=");
  });
});
