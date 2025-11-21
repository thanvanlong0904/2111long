"use client";
import { useState } from "react";
import React from "react";
import {
  Package,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { productSchema } from "@/app/schema/product.schema";
import { useForm } from "react-hook-form";
import { CreateProductForm } from "@/types/product.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { productApi } from "@/services/product.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateProductForm>({
    resolver: yupResolver(productSchema),
    mode: "onChange", // Validate ngay khi gõ
    reValidateMode: "onChange", // Re-validate khi thay đổi
  });

  const imageFile = watch("image");

  // Watch image file để preview
  React.useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("image", files, { shouldValidate: true });
    } else {
      // Reset image field
      const emptyFileList = new DataTransfer().files;
      setValue("image", emptyFileList, { shouldValidate: true });
    }
  };

  const removePreview = () => {
    setPreview(null);
    // Reset file input
    const fileInput1 = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    const fileInput2 = document.getElementById(
      "image-upload-change"
    ) as HTMLInputElement;
    if (fileInput1) {
      fileInput1.value = "";
    }
    if (fileInput2) {
      fileInput2.value = "";
    }
    // Reset image field
    const emptyFileList = new DataTransfer().files;
    setValue("image", emptyFileList, { shouldValidate: true });
  };

  const createProductMutation = useMutation({
    mutationFn: async (data: CreateProductForm) => {
      let imagePath = "";

      // 1. Upload ảnh nếu có
      if (data.image?.length) {
        const uploaded = await productApi.uploadImage(data.image[0]);
        imagePath = uploaded.data.path;
      }

      // 2. Loại bỏ key image trước khi gửi
      const { image: _image, ...rest } = data;

      // 3. POST product
      return await productApi.postProduct({
        ...rest,
        ...(imagePath && { image: imagePath }),
      });
    },

    // Khi thành công
    onSuccess: () => {
      alert("🎉 Thêm sản phẩm thành công!");
      router.push("/admin/product/list");
    },

    // Khi lỗi
    onError: (err) => {
      console.error("❌ Failed:", err);
      alert("Có lỗi xảy ra khi thêm sản phẩm");
    },
  });

  const onSubmit = (data: CreateProductForm) => {
    console.log("✅ Form Data:", data);
    createProductMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Thêm Sản Phẩm Mới
          </h1>
          <p className="text-gray-600">
            Điền thông tin sản phẩm vào form bên dưới
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* GRID 2 CỘT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TÊN SẢN PHẨM */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <Package className="w-4 h-4 text-indigo-600" />
                  Tên Sản Phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  }`}
                  placeholder="Nhập tên sản phẩm..."
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* GIÁ SẢN PHẨM */}
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Giá Bán <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    ₫
                  </span>
                  <input
                    type="number"
                    id="price"
                    {...register("price", { valueAsNumber: true })}
                    min="0"
                    step="1000"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                      errors.price
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                    placeholder="0"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* GIÁ CŨ */}
              <div className="space-y-2">
                <label
                  htmlFor="oldPrice"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <DollarSign className="w-4 h-4 text-orange-600" />
                  Giá Cũ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    ₫
                  </span>
                  <input
                    type="number"
                    id="oldPrice"
                    {...register("oldPrice", { valueAsNumber: true })}
                    min="0"
                    step="1000"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                      errors.oldPrice
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                    placeholder="0"
                  />
                  {errors.oldPrice && (
                    <p className="text-red-500 text-sm">
                      {errors.oldPrice.message}
                    </p>
                  )}
                </div>
              </div>

              {/* SỐ LƯỢNG */}
              <div className="space-y-2">
                <label
                  htmlFor="stock"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <Package className="w-4 h-4 text-blue-600" />
                  Số Lượng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  {...register("stock", { valueAsNumber: true })}
                  min="0"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                    errors.stock
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  }`}
                  placeholder="Nhập số lượng..."
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
              </div>
            </div>

            {/* MÔ TẢ */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <FileText className="w-4 h-4 text-purple-600" />
                Mô Tả Sản Phẩm
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={5}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 resize-none placeholder:text-gray-400 ${
                  errors.description
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                placeholder="Nhập mô tả chi tiết về sản phẩm..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* DANH MỤC */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <Tag className="w-4 h-4 text-pink-600" />
                Danh Mục <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                {...register("category")}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 bg-white cursor-pointer ${
                  errors.category
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="rau-cu">Rau củ</option>
                <option value="trai-cay">Trái cây</option>
                <option value="thit-ca">Thịt cá</option>
                <option value="gao-thoc">Gạo thóc</option>
                <option value="gia-vi">Gia vị</option>
                <option value="khac">Khác</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* UPLOAD ẢNH */}
            <div className="space-y-2">
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <ImageIcon className="w-4 h-4 text-cyan-600" />
                Hình Ảnh Sản Phẩm <span className="text-red-500">*</span>
              </label>
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}

              {!preview ? (
                <label
                  htmlFor="image-upload"
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer hover:bg-indigo-50 transition-all duration-200 group ${
                    errors.image
                      ? "border-red-500"
                      : "border-gray-300 hover:border-indigo-500"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    <p className="mb-2 text-sm font-medium text-gray-600 group-hover:text-indigo-600">
                      <span className="font-semibold">Click để upload</span>{" "}
                      hoặc kéo thả
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (Tối đa 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative inline-block">
                  <div className="relative w-48 h-48 rounded-xl overflow-hidden border-2 border-gray-300 shadow-lg group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePreview}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <label
                    htmlFor="image-upload-change"
                    className="mt-4 inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors text-sm font-medium"
                  >
                    Chọn ảnh khác
                  </label>
                  <input
                    type="file"
                    id="image-upload-change"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className={`flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                 
                    : "hover:from-indigo-700 hover:to-purple-700"
                `}
              >
                Thêm sản phẩm
              </button>
              <button
                type="reset"
                onClick={() => setPreview(null)}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
