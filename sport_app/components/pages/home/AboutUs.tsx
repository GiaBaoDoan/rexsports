import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="flex justify-center md:my-6 px-4 md:px-0">
      <div className="w-full md:w-[1096px] md:h-[435px] md:pt-6 pb-3 gap-3 md:pb-[42px] justify-between items-center inline-flex">
        <div className="w-[150px] h-[150px] md:w-[435px] md:h-[435px] justify-center items-center flex flex-shrink-0">
          <Image
            src="https://rexsports.vn/images/about-us-pic.png"
            alt="ảnh"
            width={500}
            height={500}
            className=" w-[150px] h-[150px] md:w-[435px] md:h-[435px]"
          />
        </div>
        <div className="flex-col justify-start items-start gap-2 md:gap-9 inline-flex">
          <div className="text-zinc-800  text-[12px] md:text-[32px] font-semibold">
            ABOUT US
          </div>
          <div className="w-full md:w-[449px] text-neutral-500 text-[10px] md:text-base font-light">
            Rexsports mang đến 1 phòng gym di động thu nhỏ, mọi người có thể tập
            mọi lúc mọi nơi khi cầm trên tay mình những chiếc lò xo,vv…. Qua đó
            tạo ra một phong trào người người nhà nhà ai cũng tập thể dục thể
            thao, cùng nhau hướng đến một Việt Nam khỏe mạnh. Tại Rexsports, tất
            cả chúng tôi đều tôn vinh cuộc sống và đón nhận niềm vui khi mọi
            người rèn luyện được ý trí, gắn kết anh em mọi miền. REX cam kết sẽ
            mang lại cho người dùng những trải nghiệm TỐT NHẤT , BỀN NHẤT sau cú
            Droptest búa 1 Tấn được xác thực bởi:{" "}
            <a
              className="text-blue-400 font-semibold"
              href="https://youtu.be/LnF63xwPXRA"
              target="_blank"
            >
              video
            </a>{" "}
            “NÓ VẪN SỐNG”.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
