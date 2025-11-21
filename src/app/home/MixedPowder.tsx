"use client";
import SliderClient from "@/components/ui/SliderClient";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SwiperSlide } from "swiper/react";
import Container from "@/components/ui/Container";
import ItemProduct from "@/components/ui/ItemProduct";

export default function MixedPowder() {
  return (
    <div className="mt-16 md:mt-32">
      <Container>
      <h1 className="font-semibold mb-5 md:mb-10 text-2xl">BỘT PHA CHẾ</h1>
        <div className="grid grid-cols-5 gap-8">
          <div className="order-2 md:order-1 col-span-5 md:col-span-3">
            <SliderClient
              height="auto"
              navigation
              pagination
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 8 },
                640: { slidesPerView: 3, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 15 },
              }}
            >
              <SwiperSlide>
              <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
              </SwiperSlide>

              <SwiperSlide>
            <ItemProduct name="Bột Milk Foam Phô Mai - Lúave, Tạo lớp milk foam sánh mịn hương vị phô mai thơm béo đặc trưng" img="https://product.hstatic.net/1000220639/product/bot_milk_foam_pho_mai_sta_11ac193033b74a62b9f040ad0ed9a942_1024x1024.png" price={220000} oldPrice={300000}></ItemProduct>
          </SwiperSlide>
          <SwiperSlide>
            <ItemProduct name="Trà Đen Hoa Trân Số 9" img="https://product.hstatic.net/1000220639/product/tra_den_so_9_hoa_tran_cb158186d9f944f0ac434c3b24ac65a2_1024x1024.jpg" price={150000} oldPrice={250000}></ItemProduct>
          </SwiperSlide>

          <SwiperSlide>
            <ItemProduct name="Bột Cacao Lúave - Hương vị đắng béo tự nhiên, phù hợp trong pha chế, làm bánh,..." img="https://product.hstatic.net/1000220639/product/bot_cacao_2_sao_4e68228738204a9bb2a2695faaa512b6_1024x1024.jpg" price={170000} oldPrice={200000}></ItemProduct>
          </SwiperSlide>
            </SliderClient>
          </div>
          <div className="order-1 md:order-2 col-span-5 md:col-span-2">
            <a href="">
              <img
                src="https://theme.hstatic.net/1000220639/1000949167/14/section_pro_banner.jpg?v=209"
                alt=""
              />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
