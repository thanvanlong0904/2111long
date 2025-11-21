"use client";
import SliderClient from "@/components/ui/SliderClient";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SwiperSlide } from "swiper/react";

export default function Slider() {
  return (
    <SliderClient
      height="auto"
      navigation
      pagination
      breakpoints={{
        0: { slidesPerView: 1, spaceBetween: 8 },
        // 640: { slidesPerView: 2, spaceBetween: 12 },
        // 1024: { slidesPerView: 3, spaceBetween: 20 },
      }}
    >
      <SwiperSlide>
        <img src="https://theme.hstatic.net/1000220639/1000949167/14/slider_1.jpg?v=209" className="w-full h-full object-cover" />
      </SwiperSlide>

      <SwiperSlide>
      <img src="https://theme.hstatic.net/1000220639/1000949167/14/slider_1.jpg?v=209" className="w-full h-full object-cover" />
      </SwiperSlide>
    </SliderClient>
  );
}
