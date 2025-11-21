"use client";

import Container from "@/components/ui/Container";
import { useRef } from "react";

export default function HeaderBottom() {
  const menuRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    menuRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    menuRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="bg-blue-500 text-white hidden md:block">
      <Container>
        <div className="relative">
          {/* Nút scroll trái — chỉ hiện khi <1024px */}
          <button
            className="flex lg:hidden absolute left-0 top-1/2 -translate-y-1/2 
                        text-black shadow px-2 py-1 z-10 rounded"
            onClick={scrollLeft}
          >
            ◀
          </button>

          {/* Menu cuộn ngang */}
          <ul
            ref={menuRef}
            className="
              flex overflow-x-auto whitespace-nowrap
              scrollbar-hide                 /* Ẩn thanh scroll */
              gap-1 justify-start lg:justify-center
              pr-10 pl-10                   flex overflow-x-auto whitespace-nowrap
    [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden
    gap-1 justify-start lg:justify-center
    pr-10 pl-10
            "
          >
            <li className="py-3 px-5 text-[17px] cursor-pointer hover:bg-blue-700">
              Trang chủ
            </li>
            <li className="py-3 px-5 text-[17px] cursor-pointer hover:bg-blue-700">
              Nguyên liệu pha chế
            </li>
            <li className="py-3 px-5 text-[17px] cursor-pointer hover:bg-blue-700">
              Dụng cụ-Thiết bị
            </li>
            <li className="py-3 px-5 text-[17px] cursor-pointer hover:bg-blue-700">
              Máy pha cà phê
            </li>
            <li className="py-3 px-5 text-[17px] cursor-pointer hover:bg-blue-700">
              Sản phẩm mới
            </li>
            <li className="py-3 px-5 text-[17px] cursor-pointer hover:bg-blue-700">
              Tin tức - Khuyến mãi
            </li>
            <li className="py-3 px-5 text-[17px] cursor-pointer hover:bg-blue-700">
              Công thức pha chế
            </li>
          </ul>

          {/* Nút scroll phải — chỉ hiện khi <1024px */}
          <button
            className="flex lg:hidden absolute right-0 top-1/2 -translate-y-1/2 
                        text-black shadow px-2 py-1 z-10 rounded"
            onClick={scrollRight}
          >
            ▶
          </button>
        </div>
      </Container>
    </div>
  );
}
