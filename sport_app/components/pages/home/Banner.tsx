import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetchData } from "@/lib/fetchDataServer";
import { BannerRes } from "@/types/banner";
import Image from "next/image";

export const getAllBanners = async () => {
  return fetchData<BannerRes[]>(`banners`);
};

export default async function Banner() {
  const banners = await getAllBanners();
  return (
    <Carousel>
      <CarouselContent>
        {banners?.map(
          (banner, index) =>
            banner.status && (
              <CarouselItem key={index} className="flex justify-center">
                <Image
                  src={banner.image.url}
                  width={1200}
                  height={300}
                  alt="Banner"
                  className="object-cover w-full min-h-screen cursor-pointer"
                  loading="lazy"
                />
              </CarouselItem>
            )
        )}
      </CarouselContent>
    </Carousel>
  );
}
