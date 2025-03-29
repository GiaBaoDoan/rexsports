import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 bg-[url('/images/footer.png')] bg-left-bottom bg-repeat-x pt-14 pb-32">
      <div className="w-[80%] mx-auto container grid gap-10 md:grid-cols-3 grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5 col-span-2">
          <h4 className="text-2xl font-medium">Thông tin cửa hàng</h4>
          <ul className="flex flex-col gap-5">
            <Link className="font-light underline flex gap-3" href={"/"}>
              <Image
                width={30}
                height={30}
                src={"https://rexsports.vn/icons/youtube-info.svg"}
                alt="youtube icon"
              />
              <span className="text-zinc-800 text-base font-normal">
                @thedanmai
              </span>
            </Link>
            <Link
              className="font-light underline flex items-center gap-3"
              href={"/"}
            >
              <Image
                width={30}
                height={30}
                src={"https://rexsports.vn/icons/call.svg"}
                alt="phone icon"
              />
              <span className="text-zinc-800 text-base font-normal">
                0398017630
              </span>
            </Link>
            <Link
              className="font-light underline flex items-center gap-3"
              href={"/"}
            >
              <Image
                width={30}
                height={30}
                src={"https://rexsports.vn/icons/sms-edit.svg"}
                alt="phone icon"
              />
              <span className="text-zinc-800 text-base font-normal">
                rexsports2611@gmail.com
              </span>
            </Link>
          </ul>
        </div>
        <div className="flex gap-5 flex-col">
          <h4 className="text-2xl font-medium">Mạng xã hội</h4>
          <ul className="flex gap-6 items-center">
            <Link href="#">
              <Image
                width={25}
                height={25}
                src={"https://rexsports.vn/icons/instagram-social.svg"}
                alt="youtube icon"
              />
            </Link>
            <Link href="#">
              <Image
                width={25}
                height={25}
                src={"https://rexsports.vn/icons/youtube-info.svg"}
                alt="phone icon"
              />
            </Link>
            <Link href="#">
              <Image
                width={25}
                height={25}
                src={"https://rexsports.vn/icons/tiktok.svg"}
                alt="youtube icon"
              />
            </Link>
            <Link href="#">
              <Image
                width={15}
                height={15}
                src={"https://rexsports.vn/icons/facebook.svg"}
                alt="youtube icon"
              />
            </Link>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl font-medium mb-5">Chính sách</h4>
          <Link href={"/"}>
            <span className="text-zinc-800 text-base font-normal">
              Chính sách bảo hành
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
