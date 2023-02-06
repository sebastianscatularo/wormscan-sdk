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
  test("getVAAs", () => {
    guardian.getObservation({
      emmiter: "1",
      chainId: 0,
    });
  });
});
