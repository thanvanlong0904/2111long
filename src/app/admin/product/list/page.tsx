"use client";
import { useEffect, useState } from "react";
import { productApi } from "@/services/product.api";
import { Product } from "@/types/product.types";
import { formatPrice } from "@/lib/utils";
import {
  Search,
  Edit,
  Trash2,
  Package,
  Plus,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/Pagination";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset về trang 1 khi search thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "/placeholder-image.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3000${imagePath}`;
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Tính toán phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
   
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await productApi.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Danh Sách Sản Phẩm
            </h1>
            <p className="text-gray-600">
              Quản lý và theo dõi tất cả sản phẩm của bạn
            </p>
          </div>
          <Link
            href="/admin/product"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Thêm Sản Phẩm
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all duration-200 bg-white"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Tổng Sản Phẩm
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {products.length}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tổng Kho</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {products.reduce((sum, p) => sum + (p.stock || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Đang Hiển Thị
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {filteredProducts.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-12 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {search ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm nào"}
            </h3>
            <p className="text-gray-600 mb-6">
              {search
                ? "Thử tìm kiếm với từ khóa khác"
                : "Bắt đầu bằng cách thêm sản phẩm đầu tiên của bạn"}
            </p>
            {!search && (
              <Link
                href="/admin/product"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Thêm Sản Phẩm
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Ảnh
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Tên Sản Phẩm
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Danh Mục
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Kho
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-indigo-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                          {product.image ? (
                            <img
                              src={getImageUrl(product.image)}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder-image.jpg";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {product.name}
                        </div>
                        {product.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-indigo-600">
                          {formatPrice(product.price)}
                        </div>
                        {product.oldPrice &&
                          product.oldPrice > product.price && (
                            <div className="text-xs text-gray-500 line-through">
                              {formatPrice(product.oldPrice)}
                            </div>
                          )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                            product.stock > 10
                              ? "bg-green-100 text-green-800"
                              : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock} sản phẩm
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                            title="Sửa"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
