import HeaderCart from "@/components/layout/HeaderCart";
import { FindCart } from "@/components/pages/cart/FindCart";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky w-full shadow top-0 z-50 bg-white">
      <div className="px-10 py-5 flex items-center justify-between">
        <h2>
          <Link
            className="text-[32px] md:text-[42.38px] font-bold italic font-gilroy flex text-red-700 cursor-pointer"
            href={"/"}
          >
            REXsports
          </Link>
        </h2>

        <ul className="links hidden lg:flex gap-10">
          <Link className="font-light hover:underline" href={"/"}>
            Trang chủ
          </Link>
          <Link className="font-light hover:underline" href={"/products"}>
            Sản phẩm
          </Link>
          <Link className="font-light hover:underline" href={"/"}>
            Giáo án
          </Link>
          <Link className="font-light hover:underline" href={"/about"}>
            About us
          </Link>
        </ul>
        <div className="btns items-center flex gap-5">
          <FindCart />
          <HeaderCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
