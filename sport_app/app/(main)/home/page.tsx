import AboutUs from "@/components/pages/home/AboutUs";
import { Banner } from "@/components/pages/home/Banner";
import Collections from "@/components/pages/home/Collection";
import ProductBest from "@/components/pages/home/ProductBest";
import { getAllBannersServer } from "@/services/server-side/banner";
import { getAllCollectionsServer } from "@/services/server-side/collection";
import { getAllProductsSever } from "@/services/server-side/product";
import Image from "next/image";

export default async function Home() {
  const banners = await getAllBannersServer();
  const products = await getAllProductsSever();
  const collections = await getAllCollectionsServer();
  return (
    <div>
      <Banner banners={banners || []} />
      <ProductBest products={products || []} />
      <Image
        src={"https://rexsports.vn/images/divider-image.png"}
        width={1000}
        height={200}
        alt="banner"
        className="w-full"
      ></Image>
      <Collections collections={collections || []} />
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
