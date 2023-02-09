import axios from "axios";
import { AxiosClient } from "./APIClient";
import { Guardian } from "./Guardian";

jest.mock("axios");

const mocked = axios as jest.Mocked<typeof axios>;

describe("guardian", () => {
  let guardian: Guardian;

  beforeAll(() => {
    mocked.create.mockReturnThis();
    guardian = new Guardian(new AxiosClient());
  });

  afterAll(() => {
    mocked.get.mockClear();
  });

  test("getVAAs", () => {
    mocked.get.mockResolvedValueOnce({
      data: {
        data: [],
      },
    });
    guardian.getObservation({
      emmiter: "1",
      chainId: 0,
    });
  });
});
