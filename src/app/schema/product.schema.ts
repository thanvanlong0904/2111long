import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("Vui lòng nhập tên sản phẩm")
    .min(3, "Tên phải có ít nhất 3 ký tự"),

  price: Yup.number()
    .typeError("Giá phải là số")
    .required("Vui lòng nhập giá")
    .min(1000, "Giá tối thiểu là 1.000đ"),
  oldPrice: Yup.number()
    .typeError("Giá phải là số")
    .required("Vui lòng nhập giá")
    .min(1000, "Giá tối thiểu là 1.000đ"),

  description: Yup.string()
    .min(10, "Mô tả phải ít nhất 10 ký tự")
    .required("Vui lòng nhập mô tả"),
  stock: Yup.number()
    .typeError("Số lượng phải là số")
    .required("Vui lòng nhập số lượng")
    .min(1, "Số lượng tối thiểu là 1"),
  category: Yup.string()
    .required("Vui lòng chọn danh mục")
    .min(3, "Danh mục phải có ít nhất 3 ký tự"),
  image: Yup.mixed<FileList>()
    .required("Vui lòng chọn ảnh")
    .test("fileRequired", "Vui lòng chọn ảnh", (value) => {
      return value && value.length > 0;
    })
    .test("fileSize", "Kích thước ảnh tối đa 10MB", (value) => {
      if (!value || value.length === 0) return false;
      return value[0].size <= 10 * 1024 * 1024; // 10MB
    })
    .test("fileType", "Chỉ chấp nhận file ảnh (JPG, PNG, GIF)", (value) => {
      if (!value || value.length === 0) return false;
      const acceptedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return acceptedTypes.includes(value[0].type);
    }) as Yup.Schema<FileList>,
});
