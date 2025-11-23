"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import Container from "@/components/ui/Container";

import SliderClient from "@/components/ui/SliderClient";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SwiperSlide } from "swiper/react";
export default function DetailProduct() {
  return (
    <>
      <Header></Header>
      <Container>
        <div className=" grid grid-cols-12 gap-12 mt-12">
          <div className=" col-span-5">
            <div>
              <img
                src="https://product.hstatic.net/1000220639/product/bot_milk_foam_pho_mai_sta_11ac193033b74a62b9f040ad0ed9a942_1024x1024.png"
                alt=""
              />
            </div>
            <div className="mt-4">
              <SliderClient
                height="auto"
                navigation
                pagination
                breakpoints={{
                  0: { slidesPerView: 4, spaceBetween: 15 },
                  // 640: { slidesPerView: 2, spaceBetween: 12 },
                  // 1024: { slidesPerView: 3, spaceBetween: 20 },
                }}
              >
                <SwiperSlide>
                  <img
                    src="https://product.hstatic.net/1000220639/product/huong_dan_pha_che_bot_milk_foam_pho_mai_183b4c21b72841a795054e7feef30db2_1024x1024.png"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    src="https://product.hstatic.net/1000220639/product/bot_milk_foam_pho_mai_sta_11ac193033b74a62b9f040ad0ed9a942_1024x1024.png"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://product.hstatic.net/1000220639/product/bot_milk_foam_pho_mai_sta_11ac193033b74a62b9f040ad0ed9a942_1024x1024.png"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    src="https://product.hstatic.net/1000220639/product/bot_milk_foam_pho_mai_sta_11ac193033b74a62b9f040ad0ed9a942_1024x1024.png"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              </SliderClient>
            </div>
          </div>
          <div className=" col-span-7">
            <h1 className=" text-2xl font-bold">
              Bột Milk Foam Phô Mai - Lúave, Tạo lớp milk foam sánh mịn hương vị
              phô mai thơm béo đặc trưng
            </h1>
            <div className=" flex gap-5 mt-4">
              <div>
                <span>Thương hiệu: </span>
                <a href="" className=" text-blue-600">
                  Lúa mạch
                </a>
              </div>
              <div>|</div>
              <div className="">
                <span>Tình trạng : </span>
                <a href="" className=" text-blue-600">
                  Còn hàng
                </a>
              </div>
            </div>
            <div className="flex gap-8 mt-5 items-center">
              <span className="text-3xl font-bold text-red-600">150.000 đ</span>
              <del className="text-xl text-gray-400">200.000 đ</del>
              <p className="bg-red-500 text-white px-3 py-1 rounded-sm">
                Giảm: <span>25%</span>
              </p>
            </div>
            <div className="flex gap-4 mt-6 items-center">
              <span>Số lượng: </span>
              <div>
                <button className="w-8 h-8 border border-gray-400 cursor-pointer">
                  +
                </button>
                <input
                  className=" w-12 h-8 text-center cursor-not-allowed outline-none border-y border-gray-400 "
                  value={4}
                  type="text"
                  disabled
                />
                <button className="w-8 h-8 border border-gray-400 cursor-pointer">
                  -
                </button>
              </div>
            </div>
            <div className="mt-6">
              <button className=" bg-red-600 py-3 px-10 rounded-xl text-white text-[17px] cursor-pointer hover:bg-red-700">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 shadow-2xl px-4 py-10 rounded-xl">
          <h1 className=" text-2xl mb-6">MÔ TẢ SẢN PHẨM</h1>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem ratione, labore nesciunt itaque aut dolores, suscipit
          sed, facere repellendus asperiores placeat hic dolore fugiat
          architecto eaque laborum perspiciatis. Recusandae, sunt. Dolore
          veritatis repellendus omnis. Fugiat quo, laboriosam illum laborum,
          laudantium doloribus soluta vel ut in, magni consectetur a id
          mollitia? Vel a facere eligendi ipsa consectetur expedita, illo
          consequuntur ipsam. Magnam, ducimus doloribus perferendis ab a,
          repellendus saepe quasi voluptatibus, libero praesentium laborum.
          Quidem iste odio molestiae provident eligendi dolor fuga beatae omnis
          vero, aperiam at porro consequatur, dolore minima. Voluptatem ipsum,
          ab ad veniam numquam tempore repellendus odio, accusamus ea possimus
          sed? Porro id, qui cumque error, provident minus tenetur aspernatur,
          vel obcaecati magnam ex ipsam nihil officia odio! Quaerat laudantium
          quia aliquam sed iste ullam asperiores dolorem saepe, cum magni, ipsum
          molestias delectus quasi quas quidem iusto, ipsam eos est animi fugit
          optio odio? Tempore ad consequuntur vero. Tempore molestias assumenda
          dignissimos eum vero perspiciatis iusto molestiae dicta ab est, ullam,
          minus cumque quae animi qui sunt suscipit velit vel recusandae rem
          similique eos et voluptatem at! Ex. Similique consequatur quae alias
          commodi numquam. Veritatis cum vel tenetur quae quod doloremque eum
          expedita accusamus quaerat. Consectetur nam dignissimos, iure
          doloremque, voluptas veniam asperiores quam ratione quasi maxime
          suscipit? Minus asperiores neque recusandae doloremque numquam eius
          molestiae, harum ut voluptatibus incidunt praesentium officia quis
          quod ex quibusdam. Nisi cum eos cumque laudantium tempora minima modi
          quam esse odio qui. Sapiente numquam modi architecto dolorem quae.
          Nobis facere, error velit, cumque labore dignissimos ullam possimus
          repudiandae, sapiente aut nisi assumenda natus expedita quam modi
          minima? Quae, a. Perferendis, eligendi molestias? Quam sunt quaerat
          perferendis voluptatum facilis ea ex omnis cumque odio laudantium
          distinctio eveniet, laborum explicabo eligendi nemo facere.
          Distinctio, dignissimos sed? Voluptates quam recusandae suscipit
          repellendus veniam tempore maxime.
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
}
