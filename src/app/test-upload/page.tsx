"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { productApi, ImageInfo } from "@/services/product.api";

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Query để lấy danh sách ảnh đã upload
  const { data: images = [], refetch } = useQuery({
    queryKey: ["uploaded-images"],
    queryFn: () => productApi.getAllImages(),
  });

  // Query để lấy danh sách ảnh (giả sử có endpoint này, nếu chưa có thì bỏ qua)
  // const { data: images = [], refetch } = useQuery({
  //   queryKey: ["uploaded-images"],
  //   queryFn: async () => {
  //     const response = await fetch("http://localhost:3000/products/images");
  //     return response.json();
  //   },
  // });

  // Mutation để upload ảnh
  const uploadMutation = useMutation({
    mutationFn: (file: File) => productApi.uploadImage(file),
    onSuccess: () => {
      // Reset state sau khi upload thành công
      setFile(null);
      setPreview(null);
      // Refetch danh sách ảnh
      refetch();
      alert("Upload thành công!");
    },
    onError: (error) => {
      console.error("Upload thất bại:", error);
      alert("Upload thất bại! Vui lòng thử lại.");
    },
  });

  // Xử lý khi chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh!");
        return;
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
        return;
      }

      setFile(selectedFile);

      // Tạo preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Xử lý upload
  const handleUpload = () => {
    if (!file) {
      alert("Vui lòng chọn file ảnh!");
      return;
    }
    uploadMutation.mutate(file);
  };

  // Xóa preview
  const handleClear = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          Test Upload Ảnh
        </h1>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Ảnh</h2>

          {/* Input file */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn file ảnh
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Chỉ chấp nhận file ảnh (jpg, jpeg, png, gif) - Tối đa 5MB
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-xs max-h-64 rounded-lg border border-gray-300"
                />
                <button
                  onClick={handleClear}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Button upload */}
          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              disabled={!file || uploadMutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {uploadMutation.isPending ? "Đang upload..." : "Upload Ảnh"}
            </button>
          </div>

          {/* Kết quả upload */}
          {uploadMutation.isSuccess && uploadMutation.data && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">
                {uploadMutation.data.message}
              </p>
              {uploadMutation.data.data && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    File: {uploadMutation.data.data.filename}
                  </p>
                  <p className="text-sm text-gray-600">
                    Size: {(uploadMutation.data.data.size / 1024).toFixed(2)} KB
                  </p>
                  {uploadMutation.data.data.path && (
                    <div className="mt-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`http://localhost:3000${uploadMutation.data.data.path}`}
                        alt="Uploaded"
                        className="max-w-xs rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Error message */}
          {uploadMutation.isError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Upload thất bại! Vui lòng thử lại.</p>
            </div>
          )}
        </div>

        {/* Danh sách ảnh đã upload */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Danh sách ảnh đã upload ({images.length})
          </h2>
          {images.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Chưa có ảnh nào được upload
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image: ImageInfo) => (
                <div
                  key={image._id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`http://localhost:3000${image.path}`}
                      alt={image.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-600 truncate">
                      {image.filename}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(image.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Hướng dẫn sử dụng:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Chọn file ảnh từ máy tính của bạn</li>
            <li>Xem preview ảnh trước khi upload</li>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <li>Click nút "Upload Ảnh" để upload lên server</li>
            <li>
              Ảnh sẽ được lưu vào database và hiển thị trong danh sách bên dưới
            </li>
            <li>
              Ảnh được lưu tại:{" "}
              <code className="bg-blue-100 px-1 rounded">
                http://localhost:3000/uploads/
              </code>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
