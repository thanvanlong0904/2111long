# 📄 Hướng dẫn Phân trang Frontend (Frontend Pagination Guide)

## 🎯 Mục đích (Purpose)

Tài liệu này hướng dẫn cách viết thuật toán phân trang ở phía Frontend (Next.js), bao gồm logic tính toán, UI components, và state management.

This document guides you on how to write pagination algorithms on the Frontend (Next.js), including calculation logic, UI components, and state management.

---

## 📊 Hiểu về Phân trang (Understanding Pagination)

### Các thông số cần biết (Required Parameters):

- **`total`**: Tổng số items (Total number of items)
- **`page`**: Trang hiện tại (Current page)
- **`limit`**: Số items mỗi trang (Items per page)
- **`totalPages`**: Tổng số trang (Total pages) = `Math.ceil(total / limit)`

### Công thức tính toán (Calculation Formulas):

```typescript
// Tính tổng số trang
const totalPages = Math.ceil(total / limit);

// Kiểm tra có trang trước không
const hasPrevPage = page > 1;

// Kiểm tra có trang sau không
const hasNextPage = page < totalPages;

// Tính số items hiển thị (ví dụ: "Showing 11-20 of 100")
const startItem = (page - 1) * limit + 1;
const endItem = Math.min(page * limit, total);
```

---

## 🎨 Component Phân trang (Pagination Component)

### 1. Component cơ bản (Basic Component)

```typescript
'use client';

import { useState, useEffect } from 'react';

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  total,
  limit,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // Tính toán các giá trị
  const totalPages = Math.ceil(total / limit);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // Tính số items hiển thị
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  // Tạo mảng số trang để hiển thị
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Số trang hiển thị tối đa

    if (totalPages <= maxVisible) {
      // Nếu tổng số trang <= 5, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic hiển thị trang với ellipsis (...)
      if (currentPage <= 3) {
        // Trang đầu: 1, 2, 3, 4, ..., last
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Trang cuối: 1, ..., n-3, n-2, n-1, n
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Trang giữa: 1, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Thông tin hiển thị */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Previous button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrevPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              ←
            </button>

            {/* Page numbers */}
            {pageNumbers.map((pageNum, index) => {
              if (pageNum === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }

              const page = pageNum as number;
              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    isActive
                      ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              →
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔧 Sử dụng Component (Using the Component)

### Ví dụ 1: Client Component với useState

```typescript
'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface ApiResponse {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<ApiResponse['pagination'] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Fetch data khi page thay đổi
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/products?page=${currentPage}&limit=${limit}`
      );
      const result: ApiResponse = await response.json();
      
      setProducts(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Product list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          total={pagination.total}
          limit={pagination.limit}
          currentPage={pagination.page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
```

---

### Ví dụ 2: Server Component với URL params

```typescript
// app/products/page.tsx
import { Suspense } from 'react';
import Pagination from '@/components/common/Pagination';
import ProductCard from '@/components/ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface ApiResponse {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function getProducts(page: number, limit: number): Promise<ApiResponse> {
  const response = await fetch(
    `http://localhost:3000/products?page=${page}&limit=${limit}`,
    { cache: 'no-store' }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 10;

  const result = await getProducts(page, limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {result.data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        total={result.pagination.total}
        limit={result.pagination.limit}
        currentPage={result.pagination.page}
        onPageChange={(newPage) => {
          // Redirect với page mới
          window.location.href = `/products?page=${newPage}`;
        }}
      />
    </div>
  );
}
```

---

### Ví dụ 3: Sử dụng useRouter (Next.js App Router)

```typescript
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';

export default function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 10;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage: number) => {
    const response = await fetch(
      `http://localhost:3000/products?page=${currentPage}&limit=${limit}`
    );
    const result = await response.json();
    setProducts(result.data);
    setPagination(result.pagination);
  };

  const handlePageChange = (newPage: number) => {
    // Cập nhật URL mà không reload page
    router.push(`/products?page=${newPage}`, { scroll: false });
  };

  return (
    <div>
      {/* Product list */}
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}

      {/* Pagination */}
      {pagination && (
        <Pagination
          total={pagination.total}
          limit={pagination.limit}
          currentPage={pagination.page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
```

---

## 🧮 Thuật toán tính toán (Calculation Algorithms)

### 1. Tính số trang hiển thị (Calculate Visible Pages)

```typescript
function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisible) {
    // Hiển thị tất cả nếu <= maxVisible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Trang đầu
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
    // Trang cuối
    else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    // Trang giữa
    else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages;
}

// Ví dụ sử dụng:
// currentPage = 5, totalPages = 10
// Kết quả: [1, '...', 4, 5, 6, '...', 10]
```

### 2. Tính range hiển thị (Calculate Display Range)

```typescript
function getDisplayRange(
  page: number,
  limit: number,
  total: number
): { start: number; end: number } {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  
  return { start, end };
}

// Ví dụ:
// page = 2, limit = 10, total = 25
// Kết quả: { start: 11, end: 20 }
```

### 3. Kiểm tra navigation (Check Navigation)

```typescript
function canNavigate(
  page: number,
  totalPages: number
): { canGoPrev: boolean; canGoNext: boolean } {
  return {
    canGoPrev: page > 1,
    canGoNext: page < totalPages,
  };
}
```

---

## 🎨 UI Patterns (Mẫu giao diện)

### Pattern 1: Simple Pagination (Phân trang đơn giản)

```
[Previous] [1] [2] [3] [Next]
```

### Pattern 2: With Ellipsis (Có dấu ...)

```
[Previous] [1] [...] [4] [5] [6] [...] [10] [Next]
```

### Pattern 3: With First/Last (Có trang đầu/cuối)

```
[First] [Previous] [1] [2] [3] [Next] [Last]
```

### Pattern 4: With Info (Có thông tin)

```
Showing 11-20 of 100 results
[Previous] [1] [2] [3] [Next]
```

---

## 📱 Responsive Design (Thiết kế responsive)

### Mobile (Điện thoại):

- Chỉ hiển thị Previous/Next buttons
- Ẩn số trang
- Hiển thị thông tin: "Page X of Y"

### Tablet (Máy tính bảng):

- Hiển thị một số trang gần current page
- Có Previous/Next buttons

### Desktop (Máy tính):

- Hiển thị đầy đủ với ellipsis
- Có First/Last buttons (tùy chọn)
- Hiển thị đầy đủ thông tin

---

## 🔄 State Management (Quản lý state)

### Option 1: useState (Local State)

```typescript
const [page, setPage] = useState(1);
const [products, setProducts] = useState([]);
const [pagination, setPagination] = useState(null);
```

### Option 2: URL Params (URL Parameters)

```typescript
// Sử dụng useSearchParams (Next.js)
const searchParams = useSearchParams();
const page = parseInt(searchParams.get('page') || '1', 10);

// Cập nhật URL
router.push(`/products?page=${newPage}`);
```

### Option 3: Zustand/Redux (Global State)

```typescript
// store/productStore.ts
import { create } from 'zustand';

interface ProductStore {
  page: number;
  products: Product[];
  pagination: Pagination | null;
  setPage: (page: number) => void;
  setProducts: (products: Product[]) => void;
  setPagination: (pagination: Pagination) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  page: 1,
  products: [],
  pagination: null,
  setPage: (page) => set({ page }),
  setProducts: (products) => set({ products }),
  setPagination: (pagination) => set({ pagination }),
}));
```

---

## ⚡ Performance Tips (Mẹo hiệu suất)

### 1. Debounce Search (Làm chậm tìm kiếm)

```typescript
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback((value: string) => {
  fetchProducts(1, value); // Reset về page 1 khi search
}, 500);
```

### 2. Prefetch Next Page (Tải trước trang tiếp theo)

```typescript
useEffect(() => {
  if (pagination?.hasNextPage) {
    // Prefetch trang tiếp theo
    fetch(`/api/products?page=${page + 1}&limit=${limit}`, {
      method: 'GET',
    });
  }
}, [page, pagination]);
```

### 3. Memoization (Ghi nhớ)

```typescript
import { useMemo } from 'react';

const visiblePages = useMemo(() => {
  return getVisiblePages(page, totalPages);
}, [page, totalPages]);
```

---

## 🎯 Best Practices (Thực hành tốt nhất)

### 1. Scroll to Top (Cuộn lên đầu)

```typescript
const handlePageChange = (newPage: number) => {
  setPage(newPage);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### 2. Loading State (Trạng thái tải)

```typescript
const [loading, setLoading] = useState(false);

const fetchProducts = async (page: number) => {
  setLoading(true);
  try {
    // Fetch data
  } finally {
    setLoading(false);
  }
};
```

### 3. Error Handling (Xử lý lỗi)

```typescript
const [error, setError] = useState<string | null>(null);

const fetchProducts = async (page: number) => {
  try {
    setError(null);
    // Fetch data
  } catch (err) {
    setError('Failed to load products');
  }
};
```

### 4. Preserve Filters (Giữ nguyên bộ lọc)

```typescript
// Khi chuyển trang, giữ nguyên filters
const handlePageChange = (newPage: number) => {
  const params = new URLSearchParams(searchParams);
  params.set('page', newPage.toString());
  router.push(`/products?${params.toString()}`);
};
```

---

## 📚 Tóm tắt (Summary)

### Frontend cần làm:

1. ✅ **Quản lý state** - Lưu page hiện tại
2. ✅ **Tính toán UI** - Tính visible pages, hasNext/Prev
3. ✅ **Xử lý events** - onClick handlers
4. ✅ **Hiển thị UI** - Render pagination component
5. ✅ **Gọi API** - Fetch data với page mới

### Frontend KHÔNG cần:

- ❌ Tính `skip` (backend tự tính)
- ❌ Tính `limit` (đã có sẵn)
- ❌ Query database (backend xử lý)

---

**Happy Coding! 🎉**

