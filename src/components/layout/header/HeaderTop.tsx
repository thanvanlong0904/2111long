"use client";
import Container from "../../ui/Container";
import { Search, User, Phone, ShoppingBag, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function HeaderTop() {
     const [open, setOpen] = useState(false);
  return (
    <div className="py-2 md:py-4">
      <Container>
        {/* GRID CHÍNH */}
        <div
          className="
            grid
            grid-cols-3                     /* MOBILE */
            md:grid-cols-[auto_1fr_auto]    /* DESKTOP */
            items-center 
            gap-4 md:gap-12
          "
        >
          {/* MOBILE MENU */}
          <div onClick={() => setOpen(true)} className="md:hidden order-1 flex">
            <Menu className="w-7 h-7" />
          </div>

          {/* LOGO */}
          <div className="order-2 md:order-1 flex justify-center md:justify-start">
            <a href="">
              <img
                className="w-20 md:w-auto"
                src="https://theme.hstatic.net/1000220639/1000949167/14/logo_medium.png?v=209"
                alt=""
              />
            </a>
          </div>

          <div className="col-span-3 md:col-span-1 order-4 md:order-2 flex justify-center py-2">
            <div className="w-full max-w-[500px] relative">
              <input
                className="w-full pl-4 pr-12 py-2 rounded-lg outline-none border border-blue-500 text-sm md:text-base "
                type="text"
                placeholder="Tìm kiếm sản phẩm"
              />

              <button className="absolute top-1/2 -translate-y-1/2 right-3 w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* DESKTOP RIGHT SIDE */}
          <div className="flex items-center gap-6 justify-end order-3">
            {/* PHONE */}
            <div className=" hidden md:flex items-center gap-2 ">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Phone className="text-white w-5 h-5" />
              </div>
              <div className=" hidden md:block">
                <p className="text-sm leading-tight">Hỗ trợ khách hàng</p>
                <strong className="text-sm leading-tight">028.7303.6868</strong>
              </div>
            </div>

            {/* USER */}
            <div className=" hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="text-white w-5 h-5" />
              </div>
              <div className=" hidden md:block">
                <p className="text-sm leading-tight">Đăng nhập</p>
                <strong className="text-sm leading-tight">Đăng ký</strong>
              </div>
            </div>

            {/* CART */}
            <div className="flex items-center gap-2 border border-blue-500 p-1 px-3 rounded-[5px]">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <div className=" hidden md:block">
                <span className="mr-1">Giỏ hàng</span>
                <span className="text-sm font-semibold p-1 bg-blue-500 rounded-[2px] text-white">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay mờ mượt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Menu trượt vào */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 15,
              }}
              className="fixed top-0 left-0 w-[80%] h-screen bg-white z-50 p-4"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <a href="">
                  <img
                    className="w-20"
                    src="https://theme.hstatic.net/1000220639/1000949167/14/logo_medium.png?v=209"
                    alt=""
                  />
                </a>
                <X className="w-7 h-7" onClick={() => setOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
