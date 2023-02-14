declare global {
  interface Window {
    wormscan: {
      baseUrl?: string;
    };
  }
}

window.wormscan = {};

const baseUrl = window.wormscan.baseUrl ?? "https://api.wormscan.io/api/v1";

export default baseUrl;
