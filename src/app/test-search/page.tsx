"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { productApi } from "@/services/api";

export default function TestSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearch = searchParams.get("search") || "";
  const urlSortBy = searchParams.get("sortBy") || "";
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [sortBy, setSortBy] = useState(urlSortBy);

  // Query tìm kiếm hoặc lấy tất cả với sort
  const { data: products = [] } = useQuery({
    queryKey: ["products", urlSearch || "all", urlSortBy],
    queryFn: () => {
      if (urlSearch || urlSortBy) {
        return productApi.search(urlSearch, urlSortBy);
      }
      return productApi.getAll();
    },
  });

  // Cập nhật URL với params
  const updateUrl = (search: string, sort: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort) params.set("sortBy", sort);
    const queryString = params.toString();
    router.push(`/test-search${queryString ? `?${queryString}` : ""}`);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    updateUrl(searchTerm.trim(), sortBy);
  };

  const handleGetAll = () => {
    setSearchTerm("");
    setSortBy("");
    router.push("/test-search");
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    updateUrl(urlSearch, newSortBy);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 Tìm kiếm Sản phẩm</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Nhập tên sản phẩm..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tìm kiếm
            </button>
            <button
              onClick={handleGetAll}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Tất cả
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Sắp xếp theo giá:
            </label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Mặc định</option>
              <option value="price-asc">Giá: Thấp → Cao</option>
              <option value="price-desc">Giá: Cao → Thấp</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Kết quả ({products.length} sản phẩm)
          </h2>

          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Không tìm thấy sản phẩm nào
            </p>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex gap-4 text-sm text-gray-500">
                    {product.category && (
                      <span>
                        <strong>Danh mục:</strong> {product.category}
                      </span>
                    )}
                    <span>
                      <strong>Giá:</strong>{" "}
                      {product.price?.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
