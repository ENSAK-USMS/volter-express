import axios from "axios";
import { API } from "./config";
// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    // "ngrok-auth": "true",
    // "ngrok-skip-browser-warning": "69420",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);
export default axiosInstance;
