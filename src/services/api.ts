import axios from "axios";

const getBaseURL = () => {
  const apiUrl =
    import.meta.env.VITE_API_URL ||
    "https://rpg-system-api-staging-6bpup4cy7q-ew.a.run.app";

  if (import.meta.env.DEV) {
    return "/api";
  }

  return apiUrl;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    console.log(
      "Making request to:",
      (config.baseURL || "") + (config.url || "")
    );
    console.log("Request headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response?.status, error.message);
    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      console.log("CORS error detected, retrying with different headers...");
    }

    return Promise.reject(error);
  }
);

export default api;
