import React from "react";
import Container from "../ui/Container";
import { Mail, MapPin, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <div className=" mt-22">
      <Container>
        <div className=" grid grid-cols-1 sm:grid-cols-12 gap-10">
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
            <h1 className="text-xl font-bold mb-4">Về chúng tôi</h1>
            <div className="flex flex-col gap-2 mt-4">
              <p>
                <a href="">Bảo hành</a>
              </p>
              <p>
                <a href="">Điều khoản & Điều kiện</a>
              </p>
              <p>
                <a href="">Chính sách bán hàng</a>
              </p>
              <p>
                <a href="">Hướng dẫn mua hàng</a>
              </p>
              <p>
                <a href="">Giao hàng & Nhận hàng</a>
              </p>
              <p>
                <a href="">Hướng dẫn đổi trả</a>
              </p>
              <p>
                <a href="">Câu hỏi thường gặp</a>
              </p>
            </div>
          </div>
          <div className=" col-span-1 md:col-span-6 lg:col-span-3">
            <h1 className="text-xl font-bold mb-4">Tìm hiểu thêm</h1>
            <div className="flex flex-col gap-2 mt-4">
              <p>
                <a href="">Giới thiệu</a>
              </p>
              <p>
                <a href="">Khuyến mãi</a>
              </p>
            </div>
          </div>
          <div className=" col-span-1 md:col-span-6 lg:col-span-3">
            <h1 className="text-xl font-bold mb-4">Theo dõi chúng tôi</h1>
            <div className="flex gap-4 text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook-icon lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram-icon lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>

      </Container>
      <div className=" py-4 bg-blue-700 text-white text-center mt-8">
        @Ban quyen thuoc ve moi nguoi hihi
      </div>
    </div>
  );
}
