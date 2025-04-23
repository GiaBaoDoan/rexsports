import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetchData } from "@/lib/fetchDataServer";
import { BannerRes } from "@/types/banner";

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
              <CarouselItem key={index}>
                <div
                  className="w-full h-[350px] md:h-[500px] bg-cover bg-top cursor-pointer"
                  style={{
                    backgroundImage: `url("${banner.image.url}")`,
                  }}
                />
              </CarouselItem>
            )
        )}
      </CarouselContent>
    </Carousel>
  );
}
