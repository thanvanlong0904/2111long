"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import Container from "@/components/ui/Container";
import ItemProduct from "@/components/ui/ItemProduct";
import { ArrowLeft, ChevronFirst, ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [open, setOpen] = useState(false)
  return (
    <div>
      <Header></Header>
      <Container>
        <div className=" hidden fixed top-0 right-0 h-screen w-screen bg-black/40">

        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 ">
          <div className=" fixed top-0 right-0 px-3 bg-white lg:relative col-span-1 w-[250px] lg:w-full lg:col-span-3 pt-4 lg:pt-0 h-screen ">
            <div className="">
                <div className="flex gap-2 mb-4 lg:hidden"><ArrowLeft className=" cursor-pointer"></ArrowLeft> <span>Sắp Xếp Theo</span></div>
              <h1 className=" uppercase text-[20px]">Danh muc</h1>
              <div className="flex flex-col gap-1 mt-3">
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span>Trà Sữa</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span>Topping</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span>Trà Xanh</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span>Trà Sữa Trân Châu</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h1 className=" uppercase text-[20px] uppercase ">Mức Giá</h1>
              <div className="flex flex-col gap-1 mt-3">
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span className=" text-[16px]">Giá dưới 100.000đ</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span className=" text-[16px]">100.000đ - 200.000đ</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span className=" text-[16px]">200.000đ - 300.000đ</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span className=" text-[16px]">300.000đ - 500.000đ</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span className=" text-[16px]">500.000đ - 1.000.000đ</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-5 h-5" type="checkbox" />
                  <span className=" text-[16px]">Giá trên 1.000.000đ</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h1 className=" bg-blue-600 text-white py-2 px-3 font-bold rounded-[5px]">
                Có thể bạn thích
              </h1>
              <div className="mt-6 flex flex-col gap-4">
                <a href="" className=" flex gap-2">
                  <img
                    className="w-20 h-auto"
                    src="https://product.hstatic.net/1000220639/product/mt35_sta__1__78d02ad4da8d426390f77773705f6e08_large.jpg"
                    alt=""
                  />
                  <div>
                    <h1 className=" line-clamp-2 text-sm">
                      Bột Kem Béo Thực Vật MT35 Lúave - Bột pha trà sữa, tôn vị
                      trà, béo vị sữa, kết hợp được nhiều loại trà
                    </h1>
                    <div className="mt-2">
                      <span className="text-sm font-bold text-red-600 mr-2">
                        120.000 đ
                      </span>
                      <del className="text-sm text-gray-400">150.000 đ</del>
                    </div>
                  </div>
                </a>
                <a href="" className=" flex gap-2">
                  <img
                    className="w-20 h-auto"
                    src="https://product.hstatic.net/1000220639/product/mt35_sta__1__78d02ad4da8d426390f77773705f6e08_large.jpg"
                    alt=""
                  />
                  <div>
                    <h1 className=" line-clamp-2 text-sm">
                      Bột Kem Béo Thực Vật MT35 Lúave - Bột pha trà sữa, tôn vị
                      trà, béo vị sữa, kết hợp được nhiều loại trà
                    </h1>
                    <div className="mt-2">
                      <span className="text-sm font-bold text-red-600 mr-2">
                        120.000 đ
                      </span>
                      <del className="text-sm text-gray-400">150.000 đ</del>
                    </div>
                  </div>
                </a>
                <a href="" className=" flex gap-2">
                  <img
                    className="w-20 h-auto"
                    src="https://product.hstatic.net/1000220639/product/mt35_sta__1__78d02ad4da8d426390f77773705f6e08_large.jpg"
                    alt=""
                  />
                  <div>
                    <h1 className=" line-clamp-2 text-sm">
                      Bột Kem Béo Thực Vật MT35 Lúave - Bột pha trà sữa, tôn vị
                      trà, béo vị sữa, kết hợp được nhiều loại trà
                    </h1>
                    <div className="mt-2">
                      <span className="text-sm font-bold text-red-600 mr-2">
                        120.000 đ
                      </span>
                      <del className="text-sm text-gray-400">150.000 đ</del>
                    </div>
                  </div>
                </a>
                <a href="" className=" flex gap-2">
                  <img
                    className="w-20 h-auto"
                    src="https://product.hstatic.net/1000220639/product/mt35_sta__1__78d02ad4da8d426390f77773705f6e08_large.jpg"
                    alt=""
                  />
                  <div>
                    <h1 className=" line-clamp-2 text-sm">
                      Bột Kem Béo Thực Vật MT35 Lúave - Bột pha trà sữa, tôn vị
                      trà, béo vị sữa, kết hợp được nhiều loại trà
                    </h1>
                    <div className="mt-2">
                      <span className="text-sm font-bold text-red-600 mr-2">
                        120.000 đ
                      </span>
                      <del className="text-sm text-gray-400">150.000 đ</del>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className=" col-span-1 lg:col-span-9 ">
            <div className=" mb-8">
              <img
                src="https://cdn.hstatic.net/files/1000220639/collection/nglieu_chat_luong_giao_hang-05__1__ccda8e29d04a4fe9bc4554bb9171fefe.png"
                alt=""
              />
            </div>
            <div>
              <h1 className=" text-3xl font-medium">
                Bột pha chế || Nguyên liệu pha chế trà sữa, đá xay, sinh tố
              </h1>
              <div className="mt-5 flex gap-6 border-b border-gray-300 pb-2 items-center">
                <span>Sắp Xếp: </span>
              
                {/* <div><span>Thứ Tự</span><ChevronLeft></ChevronLeft></div> */}
                <div className="flex flex-col  md:flex-row gap-6 items-center">
                <div className="flex gap-12 p-[1px] border border-gray-500"> <span>Thứ tự</span>  <ChevronFirst></ChevronFirst></div>
                <div className=" flex  items-start  flex-col md:flex-row gap-6">
                <button className=" cursor-pointer hover:text-blue-600">Tên A → Z    </button>
                <button>Tên Z → A</button>
                <button>Giá tăng dần</button>
                <button>Giá giảm dần</button>
                <button>Hàng mới</button>
                </div>
                
                </div>
                
              </div>
              <div className="mt-4 grid grid-cols-12 gap-4">
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
                <div className=" col-span-3">
                <ItemProduct name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê" img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg" price={120000} oldPrice={200000}></ItemProduct>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}
