declare global {
  interface Window {
    wormscan: {
      baseUrl?: string;
    };
  }
}

const { baseUrl = "https://api.wormscan.io/api/v1" } = window.wormscan || {};

export default baseUrl;
