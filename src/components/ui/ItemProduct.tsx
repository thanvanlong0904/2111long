import React from "react";
interface itemProduct{
    name: string,
    img:string,
    price: number,
    oldPrice: number
}
export default function ItemProduct({name, img, price, oldPrice}: itemProduct) {
  return (
    <div>
      <div>
        <a href=""><img className="w-full"
          src={img}
        /></a>
        
      </div>
      <div className="px-4">
        <a href="" className="mt-4 block f"><h3 className=" line-clamp-1 text-sm font-bold text-center">{name}</h3></a>
        
        <div className=" mt-4 flex justify-between text-[16px]">
            <span className=" text-red-600 font-bold">{price.toLocaleString('vi-VN')} đ</span><del>{oldPrice.toLocaleString('vi-VN')} đ</del>
        </div>
      </div>
    </div>
  );
}
