// Product API functions (Các hàm API cho Sản phẩm)
import { apiClient } from "./api-client";
import { Product } from "@/types/product.types";

export interface UploadResponse {
  message: string;
  data: {
    path: string;
  };
}

export const productApi = {
  // Lấy tất cả sản phẩm
  getAll: async (
    sortBy?: string,
    search?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<Product[]> => {
    const params: Record<string, string> = {};
    if (sortBy) {
      params.sortBy = sortBy;
    }
    if (search) {
      params.search = search;
    }
    if (minPrice !== undefined) {
      params.minPrice = minPrice.toString();
    }
    if (maxPrice !== undefined) {
      params.maxPrice = maxPrice.toString();
    }
    const response = await apiClient.get<Product[]>("/products", { params });
    return response.data;
  },

  postProduct: async (product: Product): Promise<Product> => {
    const response = await apiClient.post<Product>("/products", product);
    return response.data;
  },

  // Upload ảnh - chỉ trả về path, không lưu vào database
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post<UploadResponse>(
      "/products/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteProduct: async (id?: string | null): Promise<void> => {
    if (!id) {
      throw new Error("ID is required");
    }
    const response = await apiClient.delete<void>(`/products/${id}`);
    return response.data;
  },
};
