"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { productApi } from "@/services/product.api";

export default function TestSearchPage() {
  // State để track button nào đang active
  const [sortBy, setSortBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // Query value (để gọi API)

  // State cho input giá (UI only - bạn tự viết logic)
  const [minPriceInput, setMinPriceInput] = useState<string>("");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");
  const [minPriceInputSearch, setMinPriceInputSearch] = useState<
    number | undefined
  >(undefined);
  const [maxPriceInputSearch, setMaxPriceInputSearch] = useState<
    number | undefined
  >(undefined);

  // Query API - Lấy tất cả sản phẩm
  const { data: products = [] } = useQuery({
    queryKey: [
      "products",
      sortBy,
      searchQuery,
      minPriceInputSearch,
      maxPriceInputSearch,
    ],
    queryFn: () =>
      productApi.getAll(
        sortBy,
        searchQuery,
        minPriceInputSearch,
        maxPriceInputSearch
      ),
    placeholderData: keepPreviousData, // Giữ dữ liệu cũ trong lúc fetch mới, tránh nhấp nháy
  });

  // Handler khi click button xóa
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Handler khi click button áp dụng filter giá (UI only - bạn tự viết logic)
  const handleApplyPriceFilter = () => {
    const min = minPriceInput.trim() ? Number(minPriceInput) : undefined;
    const max = maxPriceInput.trim() ? Number(maxPriceInput) : undefined;

    setMinPriceInputSearch(min);
    setMaxPriceInputSearch(max);
    console.log("Áp dụng filter giá:", min, max);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Trà pha chế || Nguyên liệu pha chế trà sữa, trà trái cây
        </h1>

        {/* Search Box */}
        <div className="mb-6">
          <div className="flex gap-4 max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-4 max-w-2xl">
            <span className="text-gray-700 font-medium whitespace-nowrap">
              Khoảng giá:
            </span>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="number"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                placeholder="Từ (₫)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                placeholder="Đến (₫)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleApplyPriceFilter}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-gray-700 font-medium">Sắp xếp:</span>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => {
                setSortBy("letter-asc");
              }}
              className={`hover:underline cursor-pointer ${
                sortBy === "letter-asc"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Tên A → Z
            </button>
            <button
              onClick={() => {
                setSortBy("letter-desc");
              }}
              className={`hover:underline cursor-pointer ${
                sortBy === "letter-desc"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Tên Z → A
            </button>
            <button
              onClick={() => {
                setSortBy("price-asc");
              }}
              className={`hover:underline cursor-pointer ${
                sortBy === "price-asc"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Giá tăng dần
            </button>
            <button
              onClick={() => {
                setSortBy("price-desc");
              }}
              className={`hover:underline cursor-pointer ${
                sortBy === "price-desc"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Giá giảm dần
            </button>
            <button
              className={`hover:underline cursor-pointer ${
                sortBy === "new"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Hàng mới
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            Không có sản phẩm nào
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* Product Image Demo */}
                <div className="w-full h-64 bg-gray-200 relative overflow-hidden">
                  <Image
                    src={`https://zizoou.com/cdn/shop/files/Ao-khoac-nam-nu-dep-form-rong-oversize-Ao-khoac-trang-9-3-ZiZoou-Store_4472x.jpg?v=1698750497`}
                    alt={p.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-10">
                    {p.name}
                  </h3>
                  <p className="text-lg font-bold text-red-600">
                    {p.price?.toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
