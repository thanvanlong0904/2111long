# 📚 Hướng dẫn Tìm kiếm và Sắp xếp từng bước (Step-by-Step Search & Sort Tutorial)

## 🎯 Mục tiêu (Goal)

Tạo tính năng tìm kiếm sản phẩm và sắp xếp theo giá trong Next.js + NestJS.

Create product search and price sorting feature in Next.js + NestJS.

---

## 📋 Tổng quan các bước (Overview Steps)

1. **Backend (NestJS)**: Thêm sort vào service và controller
2. **Frontend API Service**: Cập nhật API call để gửi sort params
3. **Frontend UI**: Thêm dropdown để chọn sort
4. **URL Sync**: Đồng bộ sort với URL

---

## 🔧 BƯỚC 1: Backend - Cập nhật Service (Backend - Update Service)

### File: `longapi/src/modules/product/product.service.ts`

**Mục tiêu:** Thêm tham số `sortBy` vào method `findAll()` và xử lý logic sắp xếp.

**Cách làm:**

1. Mở file `product.service.ts`
2. Tìm method `findAll()` hiện tại:

```typescript
async findAll(search?: string): Promise<Product[]> {
  const query: any = {};
  if (search && search.trim()) {
    query.name = { $regex: search.trim(), $options: 'i' };
  }
  return this.productModel.find(query).exec();
}
```

3. **Thêm tham số `sortBy`** vào method:

```typescript
async findAll(search?: string, sortBy?: string): Promise<Product[]> {
  // ... code hiện tại ...
}
```

4. **Thêm logic sắp xếp** sau phần tìm kiếm:

```typescript
async findAll(search?: string, sortBy?: string): Promise<Product[]> {
  const query: any = {};

  // Tìm kiếm (giữ nguyên)
  if (search && search.trim()) {
    query.name = { $regex: search.trim(), $options: 'i' };
  }

  // ⭐ THÊM PHẦN NÀY: Sắp xếp
  let sort: any = {};
  if (sortBy === 'price-asc') {
    sort = { price: 1 }; // Tăng dần (1 = ascending)
  } else if (sortBy === 'price-desc') {
    sort = { price: -1 }; // Giảm dần (-1 = descending)
  }

  // Áp dụng sort vào query
  return this.productModel.find(query).sort(sort).exec();
}
```

**Giải thích:**
- `sortBy === 'price-asc'` → Sắp xếp giá tăng dần (1)
- `sortBy === 'price-desc'` → Sắp xếp giá giảm dần (-1)
- `.sort(sort)` → Áp dụng sort vào MongoDB query

---

## 🔧 BƯỚC 2: Backend - Cập nhật Controller (Backend - Update Controller)

### File: `longapi/src/modules/product/product.controller.ts`

**Mục tiêu:** Nhận query param `sortBy` từ request và truyền vào service.

**Cách làm:**

1. Mở file `product.controller.ts`
2. Tìm method `findAll()` hiện tại:

```typescript
@Get()
async findAll(@Query('search') search?: string): Promise<Product[]> {
  return this.productService.findAll(search);
}
```

3. **Thêm `@Query('sortBy')`** vào method:

```typescript
@Get()
async findAll(
  @Query('search') search?: string,
  @Query('sortBy') sortBy?: string,  // ⭐ THÊM DÒNG NÀY
): Promise<Product[]> {
  return this.productService.findAll(search, sortBy);  // ⭐ THÊM sortBy vào đây
}
```

**Giải thích:**
- `@Query('sortBy')` → Lấy query param `sortBy` từ URL (ví dụ: `?sortBy=price-asc`)
- Truyền `sortBy` vào `productService.findAll()`

---

## 🔧 BƯỚC 3: Frontend - Cập nhật API Service (Frontend - Update API Service)

### File: `longshop/src/services/api.ts`

**Mục tiêu:** Cập nhật function `search()` để nhận và gửi tham số `sortBy`.

**Cách làm:**

1. Mở file `api.ts`
2. Tìm function `search()` hiện tại:

```typescript
search: async (searchTerm: string): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('/products', {
    params: {
      search: searchTerm,
    },
  });
  return response.data;
},
```

3. **Thêm tham số `sortBy`** và cập nhật params:

```typescript
search: async (searchTerm?: string, sortBy?: string): Promise<Product[]> => {
  const params: Record<string, string> = {};  // ⭐ Dùng Record thay vì any
  
  // Chỉ thêm vào params nếu có giá trị
  if (searchTerm) params.search = searchTerm;
  if (sortBy) params.sortBy = sortBy;  // ⭐ THÊM DÒNG NÀY

  const response = await apiClient.get<Product[]>('/products', { params });
  return response.data;
},
```

**Giải thích:**
- `searchTerm?: string` → Tham số tùy chọn (có thể có hoặc không)
- `sortBy?: string` → Tham số tùy chọn
- `Record<string, string>` → Type an toàn cho object params
- Chỉ thêm vào `params` nếu có giá trị (tránh gửi `undefined`)

---

## 🔧 BƯỚC 4: Frontend - Thêm State và URL Params (Frontend - Add State & URL Params)

### File: `longshop/src/app/test-search/page.tsx`

**Mục tiêu:** Đọc `sortBy` từ URL và quản lý state.

**Cách làm:**

1. Mở file `page.tsx`
2. **Thêm đọc `sortBy` từ URL** (sau dòng đọc `search`):

```typescript
const urlSearch = searchParams.get("search") || "";
const urlSortBy = searchParams.get("sortBy") || "";  // ⭐ THÊM DÒNG NÀY
```

3. **Thêm state cho sortBy**:

```typescript
const [searchTerm, setSearchTerm] = useState(urlSearch);
const [sortBy, setSortBy] = useState(urlSortBy);  // ⭐ THÊM DÒNG NÀY
```

**Giải thích:**
- `searchParams.get("sortBy")` → Lấy giá trị `sortBy` từ URL query params
- `useState(urlSortBy)` → Khởi tạo state với giá trị từ URL

---

## 🔧 BƯỚC 5: Frontend - Cập nhật Query (Frontend - Update Query)

**Mục tiêu:** Gửi `sortBy` vào API call.

**Cách làm:**

1. Tìm `useQuery` hiện tại:

```typescript
const { data: products = [] } = useQuery({
  queryKey: ["products", urlSearch || "all"],
  queryFn: () =>
    urlSearch ? productApi.search(urlSearch) : productApi.getAll(),
});
```

2. **Cập nhật queryKey và queryFn**:

```typescript
const { data: products = [] } = useQuery({
  queryKey: ["products", urlSearch || "all", urlSortBy],  // ⭐ THÊM urlSortBy
  queryFn: () => {
    if (urlSearch || urlSortBy) {  // ⭐ Nếu có search HOẶC sort
      return productApi.search(urlSearch, urlSortBy);  // ⭐ Gửi cả 2
    }
    return productApi.getAll();
  },
});
```

**Giải thích:**
- `queryKey` thêm `urlSortBy` → React Query cache riêng cho mỗi sort option
- `queryFn` gửi cả `urlSearch` và `urlSortBy` vào API

---

## 🔧 BƯỚC 6: Frontend - Tạo hàm update URL (Frontend - Create Update URL Function)

**Mục tiêu:** Tạo hàm để cập nhật URL với cả search và sort.

**Cách làm:**

1. **Thêm function `updateUrl`** (trước `handleSearch`):

```typescript
// Cập nhật URL với params
const updateUrl = (search: string, sort: string) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (sort) params.set("sortBy", sort);  // ⭐ THÊM DÒNG NÀY
  
  const queryString = params.toString();
  router.push(`/test-search${queryString ? `?${queryString}` : ""}`);
};
```

**Giải thích:**
- `URLSearchParams()` → Tạo object để quản lý query params
- `params.set()` → Thêm param vào URL
- `router.push()` → Cập nhật URL (không reload trang)

---

## 🔧 BƯỚC 7: Frontend - Cập nhật handleSearch (Frontend - Update handleSearch)

**Mục tiêu:** Gửi cả search và sort khi tìm kiếm.

**Cách làm:**

1. Tìm `handleSearch()` hiện tại:

```typescript
const handleSearch = () => {
  if (!searchTerm.trim()) return;
  router.push(`/test-search?search=${encodeURIComponent(searchTerm.trim())}`);
};
```

2. **Cập nhật để dùng `updateUrl`**:

```typescript
const handleSearch = () => {
  if (!searchTerm.trim()) return;
  updateUrl(searchTerm.trim(), sortBy);  // ⭐ Dùng updateUrl với cả sortBy
};
```

---

## 🔧 BƯỚC 8: Frontend - Cập nhật handleGetAll (Frontend - Update handleGetAll)

**Mục tiêu:** Reset cả search và sort khi lấy tất cả.

**Cách làm:**

1. Tìm `handleGetAll()` hiện tại:

```typescript
const handleGetAll = () => {
  setSearchTerm("");
  router.push("/test-search");
};
```

2. **Thêm reset sortBy**:

```typescript
const handleGetAll = () => {
  setSearchTerm("");
  setSortBy("");  // ⭐ THÊM DÒNG NÀY
  router.push("/test-search");
};
```

---

## 🔧 BƯỚC 9: Frontend - Tạo handleSortChange (Frontend - Create handleSortChange)

**Mục tiêu:** Xử lý khi user chọn sort option.

**Cách làm:**

1. **Thêm function mới** (sau `handleGetAll`):

```typescript
const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newSortBy = e.target.value;  // Lấy giá trị từ select
  setSortBy(newSortBy);  // Cập nhật state
  updateUrl(urlSearch, newSortBy);  // Cập nhật URL
};
```

**Giải thích:**
- `e.target.value` → Giá trị option được chọn (ví dụ: "price-asc")
- Cập nhật state và URL ngay lập tức

---

## 🔧 BƯỚC 10: Frontend - Thêm UI Dropdown (Frontend - Add UI Dropdown)

**Mục tiêu:** Thêm dropdown để user chọn sort option.

**Cách làm:**

1. Tìm phần form search (sau các button):

```typescript
<div className="flex gap-4">
  {/* Input và buttons */}
</div>
```

2. **Thêm dropdown sau các button** (trong cùng div `bg-white`):

```typescript
<div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <div className="flex gap-4 mb-4">
    {/* Input và buttons hiện tại */}
  </div>
  
  {/* ⭐ THÊM PHẦN NÀY: Dropdown sort */}
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
```

**Giải thích:**
- `value={sortBy}` → Hiển thị giá trị hiện tại
- `onChange={handleSortChange}` → Gọi function khi thay đổi
- 3 options: Mặc định, Tăng dần, Giảm dần

---

## ✅ Kiểm tra (Testing)

### Test Backend:

```bash
# Test sort tăng dần
GET http://localhost:3000/products?sortBy=price-asc

# Test sort giảm dần
GET http://localhost:3000/products?sortBy=price-desc

# Test kết hợp search + sort
GET http://localhost:3000/products?search=áo&sortBy=price-asc
```

### Test Frontend:

1. Mở `http://localhost:3001/test-search`
2. Chọn sort option → Kiểm tra URL có `?sortBy=...`
3. Tìm kiếm + chọn sort → Kiểm tra kết quả được sắp xếp đúng
4. Nhấn "Tất cả" → Kiểm tra sort được reset

---

## 📝 Tóm tắt các file đã sửa (Summary of Modified Files)

1. ✅ `longapi/src/modules/product/product.service.ts` - Thêm sort logic
2. ✅ `longapi/src/modules/product/product.controller.ts` - Nhận sortBy param
3. ✅ `longshop/src/services/api.ts` - Gửi sortBy trong API call
4. ✅ `longshop/src/app/test-search/page.tsx` - UI và logic sort

---

## 🎯 Kết quả (Result)

Sau khi làm xong, bạn sẽ có:
- ✅ Tìm kiếm sản phẩm theo tên
- ✅ Sắp xếp theo giá (tăng dần/giảm dần)
- ✅ Kết hợp tìm kiếm + sắp xếp
- ✅ URL sync (có thể share URL với sort)

---

## 💡 Tips (Mẹo)

1. **Test từng bước**: Sau mỗi bước, test xem có hoạt động không
2. **Kiểm tra console**: Xem có lỗi trong browser console không
3. **Kiểm tra Network tab**: Xem API call có gửi đúng params không
4. **Restart server**: Nếu sửa backend, nhớ restart NestJS server

---

**Happy Coding! 🚀**

