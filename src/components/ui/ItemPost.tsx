import React from "react";

export default function ItemPost() {
  return (
    <div>
      <div className=" overflow-hidden">
        <a href="">
          <img className=" hover:scale-105 transition-all duration-500"
            src="https://cdn.hstatic.net/files/1000220639/article/2_9ececf7b63dc48239520fc07c3e08cbf.png"
            alt=""
          />
        </a>
      </div>
      <div className="mt-4">
        <a href="" className="block text-[17px] font-bold hover:text-blue-600">
          So sánh chi tiết cối xay cầm tay Z3 và Z3 Pro của zeroHero
        </a>
        <p className="my-1">Thân Long</p>
        <p className=" text-sm line-clamp-3">
          Trong cộng đồng người yêu cà phê, việc sở hữu một chiếc cối xay cầm
          tay chất lượng là bước đầu tiên để đạt đến ly cà phê hoàn hảo. Trong
          số các thương hiệu nổi bật, ZeroHero (thuộc Zero Hero Grinder) đã
          nhanh chóng khẳng định vị thế với hai mẫu sản phẩm được đánh giá cao:
        </p>
        <div className=" text-center">
          <a href="" className=" inline-block  mt-3 py-1 px-8 bg-red-600 text-white hover:bg-red-700">
            Đọc tiếp
          </a>
        </div>
      </div>
    </div>
  );
}
