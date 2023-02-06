import axios from "axios";
import { AxiosClient } from "./APIClient";
import { Governor } from "./Governor";
jest.mock("axios");
const mocked = axios as jest.Mocked<typeof axios>;

describe("governor", () => {
  let governor: Governor;

  beforeAll(() => {
    mocked.create.mockReturnThis();
    governor = new Governor(new AxiosClient());
  });

  test("getConfiguration", () => {
    governor.getConfiguration();
  });
});
