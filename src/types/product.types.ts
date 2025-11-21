// Type definitions cho Product (Định nghĩa kiểu dữ liệu cho Sản phẩm)
// Match với backend schema: oldPrice, stock

export interface Product {
  _id?: string; // MongoDB ID
  name: string;
  price: number;
  description?: string;
  category: string;
  oldPrice: number; // Giá cũ
  stock: number; // Số lượng
  image?: string; // Đường dẫn ảnh
  createdAt?: string;
  updatedAt?: string;
}

// Type cho form tạo sản phẩm
export interface CreateProductForm {
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  stock: number;
  category: string;
  image: FileList; // File upload (required)
}
