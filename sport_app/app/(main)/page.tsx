import AboutUs from "@/components/pages/home/AboutUs";
import Banner from "@/components/pages/home/Banner";
import Collections from "@/components/pages/home/Collection";
import ProductBest from "@/components/pages/home/ProductBest";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <Banner />
      <ProductBest />
      <Image
        src={"https://rexsports.vn/images/divider-image.png"}
        width={1000}
        height={200}
        alt="banner"
        className="w-full"
      ></Image>
      <Collections />
      <Image
        src={"https://rexsports.vn/images/divider-image-2.png"}
        width={1000}
        height={200}
        alt="banner"
        className="w-full"
      ></Image>
      <AboutUs />
    </div>
  );
}
