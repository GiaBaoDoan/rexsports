import AboutUs from "@/components/pages/home/AboutUs";
import Banner from "@/components/pages/home/Banner";
import BestProduct from "@/components/pages/home/BestProduct";
import HomeBestSeller from "@/components/pages/home/HomeBestSeller";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <HomeBestSeller />
      <div>
        <Image
          src={"https://rexsports.vn/images/divider-image.png"}
          width={1000}
          height={200}
          alt="banner"
          className="w-full"
        ></Image>
      </div>
      <BestProduct />
      <div>
        <Image
          src={"https://rexsports.vn/images/divider-image-2.png"}
          width={1000}
          height={200}
          alt="banner"
          className="w-full"
        ></Image>
      </div>
      <AboutUs />
    </div>
  );
}
