"use client";

import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export interface SliderProps {
  children: React.ReactNode;
  height?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  pagination?: boolean;
  navigation?: boolean;
  breakpoints?: any;
}
export default function SliderClient({
  children,
  height = "h-48",
  loop = true,
  autoplay = true,
  speed = 600,
  pagination = true,
  navigation = true,
  breakpoints,
}: SliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop={loop}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      autoplay={autoplay ? { delay: 2500 } : false}
      speed={speed}
      breakpoints={breakpoints}
      className={`w-full ${height}`}
    >
      {children}
    </Swiper>
  );
}
