import React from "react";
import Container from "../ui/Container";
import { Mail, MapPin, Smartphone, X } from "lucide-react";

export default function Footer() {
  return (
    <div className=" mt-22">
      <Container>
        <div className=" grid grid-cols-12 gap-8">
          <div className=" col-span-1 md:col-span-6 lg:col-span-3">
            <h1 className=" text-xl font-bold mb-4">Về chúng tôi</h1>
            <img
              src="https://theme.hstatic.net/1000220639/1000949167/14/logo-footer.png?v=209"
              alt=""
            />
            <p className=" text-[15px] text-justify mt-4 mb-3">
              nguyenlieuphache.vn là website thương mại điện tử chuyên cung ứng
              các sản phẩm nguyên liệu pha chế và máy móc thiết bị hỗ trợ chất
              lượng cao với giá cả hợp lý nhất. Mua hàng tại nguyenlieuphache.vn
              thật dễ dàng, thuận tiện và tiết kiệm thời gian.
            </p>
            <div className="flex items-center justify-start gap-2 my-2">
              <MapPin className="w-10"></MapPin>
              <span className=" text-sm">
                Địa chỉ: TT16 Tam Đảo, Phường 15, Quận 10, TP Hồ Chí Minh, Việt
                Nam
              </span>
            </div>
            <div className="flex items-center justify-start gap-2  my-2">
              <Smartphone className="w-5"></Smartphone>
              <span className=" text-sm">Số điện thoại: 028.7303.6868</span>
            </div>
            <div className="flex items-center justify-start gap-2 my-2 ">
              <Mail className="w-5"></Mail>
              <span className=" text-sm">Email: info@nguyenlieuphache.vn</span>
            </div>
          </div>
          <div className=" col-span-1 md:col-span-6 lg:col-span-3">
            <h1>Về chúng tôi</h1>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
          </div>
          <div className=" col-span-1 md:col-span-6 lg:col-span-3">
            <h1>Về chúng tôi</h1>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
            <p>
              <a href="">Bảo hành</a>
            </p>
          </div>
          <div className=" col-span-1 md:col-span-6 lg:col-span-3">1</div>
        </div>
      </Container>
    </div>
  );
}
