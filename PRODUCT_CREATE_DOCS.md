# 📚 Tài Liệu: Thêm Sản Phẩm (Product Creation)

## 📋 Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Backend API](#backend-api)
3. [Frontend Form](#frontend-form)
4. [Flow Hoạt Động](#flow-hoạt-động)
5. [Field Mapping](#field-mapping)
6. [Validation Rules](#validation-rules)
7. [Image Upload Process](#image-upload-process)

---

## 🎯 Tổng Quan

Hệ thống thêm sản phẩm bao gồm:

- **Backend**: NestJS API với MongoDB
- **Frontend**: Next.js form với React Hook Form + Yup validation
- **Image Upload**: Multer file upload với validation

---

## 🔧 Backend API

### 1. Endpoint: Tạo Sản Phẩm

**POST** `/products`

**Request Body:**

```typescript
{
  name: string;           // Bắt buộc, tên sản phẩm
  description?: string;   // Tùy chọn, mô tả
  price: number;          // Bắt buộc, giá hiện tại (>= 0)
  oldPrice: number;       // Bắt buộc, giá cũ (>= 0)
  category: string;       // Bắt buộc, danh mục
  stock: number;          // Bắt buộc, số lượng (>= 0)
  image?: string;         // Tùy chọn, đường dẫn ảnh
}
```

**Response:**

```typescript
{
  _id: string;
  name: string;
  description?: string;
  price: number;
  oldPrice: number;
  category: string;
  stock: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Controller:** `longapi/src/modules/product/product.controller.ts`

```typescript
@Post()
async create(@Body() data: CreateProductDto): Promise<Product> {
  return this.productService.create(data);
}
```

**Service:** `longapi/src/modules/product/product.service.ts`

```typescript
async create(product: CreateProductDto): Promise<Product> {
  const newProduct = new this.productModel(product);
  return newProduct.save();
}
```

**DTO:** `longapi/src/modules/product/dto/create-product.dto.ts`

```typescript
export class CreateProductDto {
  @IsString({ message: "Tên sản phẩm phải là chuỗi" })
  @IsNotEmpty({ message: "Tên sản phẩm không được để trống" })
  name: string;

  @IsString({ message: "Mô tả phải là chuỗi" })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: "Giá sản phẩm phải là số" })
  @Min(0, { message: "Giá sản phẩm phải >= 0" })
  price: number;

  @IsNumber({}, { message: "Giá cũ phải là số" })
  @Min(0, { message: "Giá cũ phải >= 0" })
  oldPrice: number;

  @IsString({ message: "Danh mục phải là chuỗi" })
  @IsNotEmpty({ message: "Danh mục không được để trống" })
  category: string;

  @IsNumber({}, { message: "Số lượng phải là số" })
  @Min(0, { message: "Số lượng phải >= 0" })
  stock: number;

  @IsString({ message: "Ảnh phải là chuỗi" })
  @IsOptional()
  image?: string;
}
```

**Schema:** `longapi/src/modules/product/product.schema.ts`

```typescript
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  oldPrice: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  stock: number;

  @Prop()
  image?: string;
}
```

---

### 2. Endpoint: Upload Ảnh

**POST** `/products/upload`

**Request:**

- Content-Type: `multipart/form-data`
- Field name: `image`
- File types: `jpg`, `jpeg`, `png`, `gif`
- Max size: `5MB`

**Response:**

```typescript
{
  message: string;
  data: {
    path: string; // Ví dụ: "/uploads/image-1234567890.jpg"
  }
}
```

**Controller:** `longapi/src/modules/product/product.controller.ts`

```typescript
@Post('upload')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, filename);
      },
    }),
    fileFilter: imageFileFilter,  // Chỉ cho phép jpg, jpeg, png, gif
    limits: {
      fileSize: 5 * 1024 * 1024,  // 5MB
    },
  }),
)
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    throw new BadRequestException('File không hợp lệ!');
  }
  // Chỉ trả về path, không lưu vào database
  return {
    message: 'Upload thành công!',
    data: {
      path: `/uploads/${file.filename}`,
    },
  };
}
```

**Lưu ý:** Endpoint này chỉ upload file lên server và trả về path. Không lưu thông tin ảnh vào database Image collection.

---

## 🎨 Frontend Form

### File: `longshop/src/app/admin/product/page.tsx`

### 1. Form Setup

```typescript
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "@/app/schema/product.schema";
import { CreateProductForm } from "@/types/product.types";

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
```

### 2. Form Fields

| Field         | Type     | Required | Validation            |
| ------------- | -------- | -------- | --------------------- |
| `name`        | string   | ✅       | Min 3 ký tự           |
| `price`       | number   | ✅       | Min 1,000đ            |
| `oldPrice`    | number   | ✅       | Min 1,000đ            |
| `description` | string   | ✅       | Min 10 ký tự          |
| `stock`       | number   | ✅       | Min 1                 |
| `category`    | string   | ✅       | Min 3 ký tự           |
| `image`       | FileList | ✅       | JPG/PNG/GIF, Max 10MB |

### 3. Image Preview

```typescript
const imageFile = watch("image");
const [preview, setPreview] = useState<string | null>(null);

React.useEffect(() => {
  if (imageFile && imageFile.length > 0) {
    const file = imageFile[0];
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    return () => URL.revokeObjectURL(imageUrl); // Cleanup
  } else {
    setPreview(null);
  }
}, [imageFile]);
```

### 4. Image Upload Handler

```typescript
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    setValue("image", files, { shouldValidate: true });
  } else {
    const emptyFileList = new DataTransfer().files;
    setValue("image", emptyFileList, { shouldValidate: true });
  }
};
```

### 5. Submit Handler

```typescript
const postProduct = async (data: CreateProductForm) => {
  try {
    setUploading(true);

    // Bước 1: Upload ảnh trước (nếu có)
    const imagePath = data.image?.length
      ? (await productApi.uploadImage(data.image[0])).data.path
      : "";

    // Bước 2: Gửi data trực tiếp, không cần map field names
    const { image: _image, ...productData } = data;
    await productApi.postProduct({
      ...productData,
      ...(imagePath && { image: imagePath }),
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    setUploading(false);
  }
};
```

---

## 🔄 Flow Hoạt Động

```
1. User điền form
   ↓
2. Real-time validation (onChange)
   ↓
3. User click "Tạo Sản Phẩm"
   ↓
4. Form validation (Yup schema)
   ↓
5. Nếu có ảnh:
   - Upload ảnh lên /products/upload
   - Nhận về image path
   ↓
6. Gửi POST /products với product data (không cần map field names)
   ↓
7. Backend validation (class-validator)
   ↓
8. Lưu vào MongoDB
   ↓
9. Trả về product đã tạo
```

---

## 🔀 Field Mapping

**Không cần mapping field names!** Backend và Frontend đã đồng bộ:

| Frontend (Form)    | Backend (DTO)         | Ghi Chú               |
| ------------------ | --------------------- | --------------------- |
| `oldPrice`         | `oldPrice`            | ✅ Giống nhau         |
| `stock`            | `stock`               | ✅ Giống nhau         |
| `name`             | `name`                | ✅ Giống nhau         |
| `price`            | `price`               | ✅ Giống nhau         |
| `description`      | `description`         | ✅ Giống nhau         |
| `category`         | `category`            | ✅ Giống nhau         |
| `image` (FileList) | `image` (string path) | Chuyển đổi sau upload |

**Code:**

```typescript
// Gửi data trực tiếp, không cần map
const { image: _image, ...productData } = data;
await productApi.postProduct({
  ...productData,
  ...(imagePath && { image: imagePath }),
});
```

---

## ✅ Validation Rules

### Frontend (Yup Schema)

**File:** `longshop/src/app/schema/product.schema.ts`

```typescript
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
    }),
});
```

### Backend (class-validator)

**File:** `longapi/src/modules/product/dto/create-product.dto.ts`

```typescript
@IsString({ message: 'Tên sản phẩm phải là chuỗi' })
@IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
name: string;

@IsNumber({}, { message: 'Giá sản phẩm phải là số' })
@Min(0, { message: 'Giá sản phẩm phải >= 0' })
price: number;

@IsNumber({}, { message: 'Giá cũ phải là số' })
@Min(0, { message: 'Giá cũ phải >= 0' })
oldPrice: number;

@IsNumber({}, { message: 'Số lượng phải là số' })
@Min(0, { message: 'Số lượng phải >= 0' })
stock: number;
```

**Lưu ý:** Backend validation ít strict hơn frontend (chỉ check >= 0, không check min 1000).

---

## 📸 Image Upload Process

### 1. Frontend: Chọn Ảnh

```typescript
// Input file với onChange handler
<input
  type="file"
  id="image-upload"
  className="hidden"
  accept="image/jpeg,image/jpg,image/png,image/gif"
  onChange={handleImageChange}
/>

// Label để trigger file picker
<label htmlFor="image-upload" className="cursor-pointer">
  Click để upload
</label>
```

### 2. Frontend: Preview Ảnh

```typescript
// Tạo object URL từ File để preview
const imageUrl = URL.createObjectURL(file);
setPreview(imageUrl);

// Cleanup khi component unmount hoặc file thay đổi
return () => URL.revokeObjectURL(imageUrl);
```

### 3. Frontend: Upload Ảnh

**File:** `longshop/src/services/product.api.ts`

```typescript
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
};
```

### 4. Backend: Xử Lý Upload

```typescript
// Multer config
FileInterceptor("image", {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `image-${uniqueSuffix}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: imageFileFilter, // Chỉ jpg, jpeg, png, gif
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
```

### 5. Backend: Trả Về Path

```typescript
// Chỉ trả về path, không lưu vào database
return {
  message: 'Upload thành công!',
  data: {
    path: `/uploads/${file.filename}`, // Đường dẫn để lưu vào product
  },
};
```

**Lưu ý:** File được lưu vào thư mục `./uploads` trên server, nhưng thông tin không được lưu vào database Image collection.

### 6. Frontend: Sử Dụng Image Path

```typescript
// Sau khi upload thành công, lấy path
const uploadResponse = await productApi.uploadImage(data.image[0]);
const imagePath = uploadResponse.data.path; // "/uploads/image-1234567890.jpg"

// Thêm vào product payload
const productPayload = {
  ...restData,
  image: imagePath, // Gửi path lên backend
};
```

---

## 📁 File Structure

### Backend

```
longapi/
├── src/
│   └── modules/
│       └── product/
│           ├── product.controller.ts    # API endpoints
│           ├── product.service.ts       # Business logic
│           ├── product.schema.ts        # MongoDB schema
│           ├── product.module.ts        # Module definition
│           └── dto/
│               └── create-product.dto.ts # Validation DTO
```

### Frontend

```
longshop/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── product/
│   │   │       └── page.tsx             # Form component
│   │   └── schema/
│   │       └── product.schema.ts        # Yup validation
│   ├── services/
│   │   └── product.api.ts               # API client
│   └── types/
│       └── product.types.ts             # TypeScript types
```

---

## 🐛 Troubleshooting

### Lỗi 400 Bad Request

**Nguyên nhân:**

- Validation fail ở backend
- Field names không đúng format

**Giải pháp:**

- Kiểm tra console log để debug payload
- Đảm bảo tất cả required fields đã được điền
- Kiểm tra data types (number, string, etc.)

### Không chọn được ảnh

**Nguyên nhân:**

- `htmlFor` không khớp với `id` của input
- Conflict giữa `register` và `onChange`

**Giải pháp:**

- Đảm bảo `htmlFor="image-upload"` khớp với `id="image-upload"`
- Không dùng `register` cho file input, chỉ dùng `onChange` trực tiếp

### Ảnh không upload được

**Nguyên nhân:**

- File quá lớn (> 5MB backend, > 10MB frontend)
- File type không đúng (không phải jpg/png/gif)

**Giải pháp:**

- Kiểm tra file size và type trước khi upload
- Xem error message từ backend

---

## 📝 Notes

1. **Field Naming Convention:**

   - Frontend và Backend đã đồng bộ: `oldPrice`, `stock`
   - Không cần map field names khi gửi request
   - Tất cả fields đều dùng camelCase

2. **Image Upload:**

   - Upload ảnh trước khi tạo product
   - Lưu image path vào product, không lưu file trực tiếp
   - Không lưu thông tin ảnh vào database Image collection

3. **Validation:**

   - Frontend: Strict validation (min values, required fields)
   - Backend: Basic validation (type checking, >= 0)

4. **Real-time Validation:**
   - Sử dụng `mode: "onChange"` để validate ngay khi user gõ
   - Hiển thị error message dưới mỗi field

---

## 🔗 Related Files

- Backend Controller: `longapi/src/modules/product/product.controller.ts`
- Backend Service: `longapi/src/modules/product/product.service.ts`
- Backend DTO: `longapi/src/modules/product/dto/create-product.dto.ts`
- Backend Schema: `longapi/src/modules/product/product.schema.ts`
- Frontend Form: `longshop/src/app/admin/product/page.tsx`
- Frontend Schema: `longshop/src/app/schema/product.schema.ts`
- Frontend API: `longshop/src/services/product.api.ts`
- Frontend Types: `longshop/src/types/product.types.ts`
