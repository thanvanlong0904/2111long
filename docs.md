# 📚 Tài liệu hướng dẫn dự án LongShop

## 🎯 Giới thiệu

LongShop là dự án e-commerce được xây dựng với Next.js 16, React 19, TypeScript và Tailwind CSS.

## 🚀 Bắt đầu

### Yêu cầu hệ thống

- Node.js >= 18.x
- npm hoặc yarn hoặc pnpm

### Cài đặt

```bash
# Cài đặt dependencies
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm
pnpm install
```

### Chạy dự án

```bash
# Development mode (Chế độ phát triển)
npm run dev

# Build production (Build cho môi trường production)
npm run build

# Start production server (Khởi động server production)
npm start

# Lint code (Kiểm tra lỗi code)
npm run lint
```

Dự án sẽ chạy tại: `http://localhost:3000`

## 📁 Cấu trúc thư mục

```
longshop/
├── src/
│   ├── app/                    # Next.js App Router (Bộ định tuyến ứng dụng)
│   │   ├── layout.tsx          # Root layout (Layout gốc)
│   │   ├── page.tsx            # Home page (Trang chủ)
│   │   └── globals.css         # Global styles (Styles toàn cục)
│   │
│   ├── components/             # React Components (Các component React)
│   │   ├── ui/                 # UI components (Component giao diện: Button, Input, Card...)
│   │   ├── layout/             # Layout components (Component bố cục: Header, Footer, Sidebar...)
│   │   ├── common/             # Common reusable components (Component dùng chung)
│   │   └── features/           # Feature-specific components (Component theo tính năng)
│   │
│   ├── lib/                    # Library configurations & utilities (Cấu hình thư viện & tiện ích)
│   │   └── (config files, third-party setups) (File cấu hình, thiết lập bên thứ ba)
│   │
│   ├── hooks/                  # Custom React Hooks (Hook React tùy chỉnh)
│   │   └── (useAuth.ts, useCart.ts, ...)
│   │
│   ├── types/                  # TypeScript type definitions (Định nghĩa kiểu TypeScript)
│   │   └── (index.ts, api.ts, ...)
│   │
│   ├── constants/              # Constants & Enums (Hằng số & Enum)
│   │   └── (routes.ts, config.ts, ...)
│   │
│   ├── services/               # API services & external services (Dịch vụ API & dịch vụ bên ngoài)
│   │   └── (api.ts, auth.service.ts, ...)
│   │
│   ├── utils/                  # Utility functions & helpers (Hàm tiện ích & trợ giúp)
│   │   └── (format.ts, validation.ts, ...)
│   │
│   ├── store/                  # State management (Quản lý trạng thái: Redux, Zustand...)
│   │   └── (store.ts, slices/, ...)
│   │
│   ├── context/                # React Context providers (Provider Context React)
│   │   └── (AuthContext.tsx, ThemeContext.tsx, ...)
│   │
│   └── styles/                 # Additional styles (Styles bổ sung nếu cần)
│       └── (custom styles, animations...) (Styles tùy chỉnh, animations...)
│
├── public/                     # Static files (File tĩnh)
│   └── (images, icons, fonts...) (Hình ảnh, icon, font...)
│
├── next.config.ts              # Next.js configuration (Cấu hình Next.js)
├── tsconfig.json               # TypeScript configuration (Cấu hình TypeScript)
├── tailwind.config.ts          # Tailwind CSS configuration (Cấu hình Tailwind CSS)
└── package.json                # Dependencies & scripts (Phụ thuộc & script)
```

## 📖 Hướng dẫn sử dụng các thư mục

### 1. `/src/app` - App Router (Bộ định tuyến ứng dụng)

Thư mục này chứa các routes (đường dẫn) và layouts (bố cục) của Next.js App Router.

**Quy tắc:**

- Mỗi thư mục con = một route (một đường dẫn)
- `page.tsx` = component hiển thị cho route đó
- `layout.tsx` = layout wrapper (bọc bố cục) cho route và các route con
- `loading.tsx` = loading UI (Giao diện tải)
- `error.tsx` = error UI (Giao diện lỗi)
- `not-found.tsx` = 404 page (Trang không tìm thấy)

**Ví dụ:**

```
app/
├── page.tsx              # Route: /
├── products/
│   ├── page.tsx          # Route: /products
│   └── [id]/
│       └── page.tsx      # Route: /products/[id]
└── about/
    └── page.tsx          # Route: /about
```

### 2. `/src/components` - Components (Các component)

Chứa tất cả React components (component React) được tái sử dụng.

**Cấu trúc:**

- `ui/` - Basic UI components (Component giao diện cơ bản: Button, Input, Card, Modal...)
- `layout/` - Layout components (Component bố cục: Header, Footer, Sidebar, Navbar...)
- `common/` - Common components (Component chung: Loading, ErrorBoundary, SEO...)
- `features/` - Feature-specific components (Component theo tính năng: ProductCard, CartItem, CheckoutForm...)

**Quy tắc đặt tên:**

- PascalCase (Chữ hoa đầu từ) cho component files: `Button.tsx`, `ProductCard.tsx`
- Export default (Xuất mặc định) cho component chính
- Có thể có file `index.ts` để export (xuất)

**Ví dụ:**

```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
```

### 3. `/src/lib` - Library Configurations (Cấu hình thư viện)

Chứa các file cấu hình cho thư viện bên thứ ba (third-party libraries).

**Ví dụ:**

- `lib/axios.ts` - Axios configuration (Cấu hình Axios)
- `lib/prisma.ts` - Prisma client (Client Prisma)
- `lib/utils.ts` - Utility functions (Hàm tiện ích theo phong cách shadcn/ui)

### 4. `/src/hooks` - Custom Hooks (Hook tùy chỉnh)

Chứa các custom React hooks (hook React tùy chỉnh).

**Quy tắc đặt tên:**

- Bắt đầu với `use`: `useAuth.ts`, `useCart.ts`, `useLocalStorage.ts`

**Ví dụ:**

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### 5. `/src/types` - TypeScript Types (Kiểu TypeScript)

Chứa các type definitions (định nghĩa kiểu), interfaces (giao diện), và enums (liệt kê).

**Quy tắc:**

- Export types (Xuất kiểu) từ `index.ts` để dễ import (nhập)
- Đặt tên rõ ràng: `User`, `Product`, `CartItem`

**Ví dụ:**

```typescript
// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export type CartItem = Product & {
  quantity: number;
};
```

### 6. `/src/constants` - Constants (Hằng số)

Chứa các hằng số (constants), enums (liệt kê), và cấu hình (configuration).

**Ví dụ:**

```typescript
// src/constants/routes.ts
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  CART: "/cart",
  CHECKOUT: "/checkout",
} as const; // as const để đảm bảo không thể thay đổi

// src/constants/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"; // URL cơ sở của API
```

### 7. `/src/services` - API Services (Dịch vụ API)

Chứa các functions (hàm) để gọi API và tương tác với backend (máy chủ phía sau).

**Quy tắc:**

- Mỗi service (dịch vụ) tương ứng với một resource (tài nguyên): `product.service.ts`, `auth.service.ts`
- Sử dụng async/await (bất đồng bộ/chờ đợi)
- Xử lý errors (lỗi)

**Ví dụ:**

```typescript
// src/services/product.service.ts
import { Product } from "@/types";
import { API_BASE_URL } from "@/constants/config";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}
```

### 8. `/src/utils` - Utility Functions (Hàm tiện ích)

Chứa các helper functions (hàm trợ giúp), utilities (tiện ích).

**Ví dụ:**

```typescript
// src/utils/format.ts
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN").format(date);
}

// src/utils/validation.ts
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### 9. `/src/store` - State Management (Quản lý trạng thái)

Chứa logic quản lý state (trạng thái) như Redux, Zustand, Jotai...

**Ví dụ với Zustand:**

```typescript
// src/store/useCartStore.ts
import { create } from "zustand";
import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}));
```

### 10. `/src/context` - React Context (Ngữ cảnh React)

Chứa các React Context providers (nhà cung cấp ngữ cảnh React).

**Ví dụ:**

```typescript
// src/context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

## 🎨 Styling với Tailwind CSS (Tạo kiểu với Tailwind CSS)

Dự án sử dụng Tailwind CSS v4 cho styling (tạo kiểu).

**Sử dụng:**

```tsx
<div className="flex items-center justify-center p-4 bg-blue-500 text-white">
  Hello World
</div>
```

**Custom classes (Lớp tùy chỉnh) trong `globals.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold;
  }
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}
```

## 🔧 Environment Variables (Biến môi trường)

Tạo file `.env.local` trong root directory (thư mục gốc):

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database (Cơ sở dữ liệu)
DATABASE_URL=your_database_url

# Auth (Xác thực)
NEXT_PUBLIC_AUTH_SECRET=your_secret_key
```

**Lưu ý:** Biến bắt đầu với `NEXT_PUBLIC_` sẽ được expose (hiển thị) ra client-side (phía client).

## 📝 Best Practices (Thực hành tốt nhất)

### 1. Component Organization (Tổ chức component)

- Mỗi component trong file riêng
- Sử dụng TypeScript interfaces (giao diện) cho props (thuộc tính)
- Export default (Xuất mặc định) cho component chính

### 2. File Naming (Đặt tên file)

- Components: PascalCase (Chữ hoa đầu từ) (`Button.tsx`)
- Utilities: camelCase (Chữ thường, chữ hoa đầu từ sau) (`formatPrice.ts`)
- Types: PascalCase (`User.ts`)

### 3. Import Paths (Đường dẫn import)

Sử dụng alias (bí danh) `@/` đã được cấu hình:

```typescript
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/types";
```

### 4. Code Organization (Tổ chức code)

- Một component = một file
- Group related files (Nhóm file liên quan) trong cùng thư mục
- Sử dụng `index.ts` để export (xuất) nhiều items (mục)

### 5. Performance (Hiệu suất)

- Sử dụng `next/image` cho images (hình ảnh)
- Lazy load (Tải chậm) components khi cần
- Sử dụng Server Components (Component máy chủ) khi có thể

## 🚀 Deployment (Triển khai)

### Vercel (Khuyến nghị)

1. Push code (Đẩy code) lên GitHub
2. Import project (Nhập dự án) vào Vercel
3. Vercel sẽ tự động detect (phát hiện) Next.js và deploy (triển khai)

### Build manually (Build thủ công)

```bash
npm run build
npm start
```

## 📚 Tài liệu tham khảo (References)

- [Next.js Documentation](https://nextjs.org/docs) (Tài liệu Next.js)
- [React Documentation](https://react.dev) (Tài liệu React)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) (Tài liệu Tailwind CSS)
- [TypeScript Documentation](https://www.typescriptlang.org/docs) (Tài liệu TypeScript)

## 🤝 Đóng góp (Contributing)

1. Fork the project (Fork dự án)
2. Create your feature branch (Tạo nhánh tính năng của bạn) (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (Cam kết thay đổi của bạn) (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (Đẩy lên nhánh) (`git push origin feature/AmazingFeature`)
5. Open a Pull Request (Mở Pull Request)

## 📄 License (Giấy phép)

This project is private and proprietary. (Dự án này là riêng tư và độc quyền)

---

**Happy Coding! 🎉**
