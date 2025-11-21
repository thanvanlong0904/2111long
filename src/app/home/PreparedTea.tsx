import Container from "@/components/ui/Container";
import ItemProduct from "@/components/ui/ItemProduct";
import { ChevronRight } from "lucide-react";

export default function PreparedTea() {
  return (
    <div className="mt-16 md:mt-32">
      <Container>
      <h1 className="font-semibold mb-5 md:mb-10 text-2xl">TRÀ PHA CHẾ</h1>
        <div className="grid md:grid-cols-5 gap-4">
          <div className=" col-span-2">
            <a href="">
              <img
                src="https://theme.hstatic.net/1000220639/1000949167/14/section_hot.jpg?v=209"
                alt=""
              />
            </a>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
          <div className=" col-span-1">
            <ItemProduct
              name="Bột Kem Béo Thực Vật MT33 Lúave - Bột Pha Trà Sữa Béo Ngậy, Đậm Trà, Phù Hợp Nhiều Loại Trà, Cà Phê"
              img="https://product.hstatic.net/1000220639/product/bot_mt33_9324d5b8bdfc4067947e6249f987e333_1024x1024.jpg"
              price={120000}
              oldPrice={200000}
            ></ItemProduct>
          </div>
        </div>
        <div className="flex justify-center mt-8 items-center  ">
          <div className="border border-blue-600 text-blue-600 flex items-center py-2 px-4 rounded-[18px] justify-center cursor-pointer">
            <a href="">Xem tất cả </a>
            <ChevronRight></ChevronRight>
          </div>
        </div>
      </Container>
    </div>
  );
}
