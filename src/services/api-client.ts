// Axios client configuration (Cấu hình Axios client)
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Backend NestJS URL
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
