import axios from "axios";

// Cấu hình axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Backend NestJS URL
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Type cho Product
export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// API functions
export const productApi = {
  // Lấy tất cả sản phẩm
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  },

  // Tìm kiếm sản phẩm với sort
  search: async (searchTerm?: string, sortBy?: string): Promise<Product[]> => {
    const params: Record<string, string> = {};
    if (searchTerm) params.search = searchTerm;
    if (sortBy) params.sortBy = sortBy;

    const response = await apiClient.get<Product[]>("/products", { params });
    return response.data;
  },
};

export default apiClient;
