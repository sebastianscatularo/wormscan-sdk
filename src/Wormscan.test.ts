import createClient, { Status, Wormscan } from "./Wormscan";
import { Environment } from "./Environment";
import axios, { AxiosResponse } from "axios";

jest.mock("axios");

const mocked = axios as jest.Mocked<typeof axios>;
const response: AxiosResponse = { status: 200, statusText: "ok" } as AxiosResponse;

describe("createClient", () => {
  afterEach(() => {
    mocked.create.mockClear();
  });

  test("should return a new client with the default environment", () => {
    mocked.create.mockReturnThis();
    createClient();
    expect(mocked.create.mock.calls).toHaveLength(1);
    expect(mocked.create.mock.calls[0][0]).toStrictEqual({
      baseURL: "http://api.staging.wormscan.io/api/v1",
    });
  });

  test("should return a new client for the given environment", () => {
    mocked.create.mockReturnThis();
    createClient(Environment.STAGING);
    expect(mocked.create.mock.calls).toHaveLength(1);
    expect(mocked.create.mock.calls[0][0]).toStrictEqual({
      baseURL: Environment.STAGING,
    });
  });
});

describe("status", () => {
  let wormscan: Wormscan;
  beforeAll(() => {
    mocked.create.mockReturnThis();
    wormscan = createClient();
  });

  test("status is ok", async () => {
    mocked.get.mockResolvedValue({ ...response, data: { status: "ok" } });
    expect(await wormscan.isHealth()).toStrictEqual({ status: "ok" });
  });
});
