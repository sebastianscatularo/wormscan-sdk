declare global {
  interface Window {
    wormscan: {
      baseUrl?: string;
    };
  }
}

if (!!window.wormscan) {
  window.wormscan = {};
}

const baseUrl = window.wormscan.baseUrl ?? "https://api.wormscan.io/api/v1";

export default baseUrl;
