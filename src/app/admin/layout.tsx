"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Settings,
  Menu,
  X,
  ChevronDown,
  Box,
  Tag,
  LogOut,
  User,
  Bell,
  Plus,
  Tags,
  PlusCircle
} from "lucide-react";

interface MenuItem {
  href?: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Products",
    icon: Package,
    children: [
      { href: "/admin/products/list", label: "Danh sách sản phẩm", icon: Box },
      { href: "/admin/products/add", label: "Add Product", icon: Plus },
      { href: "/admin/products/category", label: "Categories", icon: Tag },
    ],
  },
  {
    label: "Danh mục",
    icon: Tag, // Icon chính cho menu cha
    children: [
      { 
        href: "/admin/categories", 
        label: "Danh sách danh mục", 
        icon: Tags // Nhiều tag = danh sách danh mục
      },
      { 
        href: "/admin/categories/add", 
        label: "Thêm danh mục", 
        icon: PlusCircle // Thêm mới = PlusCircle
      },
    ],
  },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tự động mở menu cha khi vào trang con
  useEffect(() => {
    const parent = menuItems.find((item) =>
      item.children?.some((child) => child.href === pathname)
    );
    if (parent && openMenu !== parent.label) {
      // Sử dụng setTimeout để tránh setState trong effect body
      setTimeout(() => {
        setOpenMenu(parent.label);
      }, 0);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const isActive = (href: string) => pathname === href;
  const hasActiveChild = (children?: MenuItem[]) =>
    children?.some((child) => child.href && isActive(child.href));

  const handleLogout = () => {
    // Xử lý logout ở đây (xóa token, redirect...)
    alert("Đã đăng xuất!");
    // Ví dụ: window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col overflow-hidden`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h1
            className={`font-bold text-xl transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"
            }`}
          >
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenu === item.label;
            const active = item.href
              ? isActive(item.href)
              : hasActiveChild(item.children);

            if (item.children) {
              return (
                <div key={item.label} className="group">
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      active ? "bg-blue-600" : "hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} />
                      <span
                        className={`transition-opacity duration-300 overflow-hidden whitespace-nowrap ${
                          sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {sidebarOpen && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen && sidebarOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = child.href && isActive(child.href);

                        return (
                          <Link
                            key={child.href}
                            href={child.href!}
                            className={`flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${
                              childActive
                                ? "bg-blue-700 text-white"
                                : "text-gray-300 hover:bg-gray-800"
                            }`}
                          >
                            <ChildIcon size={16} />
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                      <div className="font-medium">{item.label}</div>
                      <div className="mt-1 text-xs text-gray-400 space-y-0.5">
                        {item.children.map((c) => (
                          <div key={c.href}>› {c.label}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group relative ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <Icon size={20} />
                <span
                  className={`transition-opacity duration-300 overflow-hidden whitespace-nowrap ${
                    sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                  }`}
                >
                  {item.label}
                </span>
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div
              className={`transition-opacity duration-300 overflow-hidden ${
                sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-gray-400 text-xs">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER CHÍNH */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Tiêu đề trang */}
            <h2 className="text-xl font-semibold text-gray-800">
              NÔNG SẢN VIỆT
            </h2>

            {/* Right Side: Notification + Avatar */}
            <div className="flex items-center space-x-4">
              {/* Notification */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                    <Link
                      href="/admin/profile"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User size={16} />
                      <span>Thông tin cá nhân</span>
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings size={16} />
                      <span>Cài đặt</span>
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Nội dung chính */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
