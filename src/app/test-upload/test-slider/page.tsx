"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const categories = [
  { id: 0, name: "QUẦN ÁO" },
  { id: 1, name: "NÓN" },
  { id: 2, name: "GIÀY" },
  { id: 3, name: "TÚI" },
];

const slides = [
  {
    category: "QUẦN ÁO",
    image:
      "https://pos.nvncdn.com/4ef0bf-108661/bn/20250821_SjW1hH2c.jpg?v=1755739275",
  },
  {
    category: "NÓN",
    image:
      "https://via.placeholder.com/800x400?text=NON",
  },
  {
    category: "GIÀY",
    image:
      "https://via.placeholder.com/800x400?text=GIAY",
  },
  {
    category: "TÚI",
    image:
      "https://via.placeholder.com/800x400?text=TUI",
  },
];

export default function SliderCategory() {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  const handleCategoryClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index); // 👈 chuyển đến đúng slide
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">HÀNG MỚI VỀ</h1>

      {/* CÁC NÚT DANH MỤC */}
      <div className="flex gap-3 mb-6">
        {categories.map((c, index) => (
          <button
            key={c.id}
            onClick={() => handleCategoryClick(index)}
            className="px-5 py-2 rounded-full border border-black hover:bg-black hover:text-white transition"
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Navigation]}
        navigation
        onSwiper={(swiper) => setSwiperRef(swiper)}
        spaceBetween={30}
        slidesPerView={1}
        className="rounded-lg overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[450px]">
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt={slide.category}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
