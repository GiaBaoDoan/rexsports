import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BannerRes } from "@/types/banner";
import Image from "next/image";

export async function Banner({ banners }: { banners: BannerRes[] }) {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {banners?.map(
            (banner, index) =>
              banner.status && (
                <CarouselItem
                  // onClick={() => router.push(`${banner.link}`)}
                  key={index}
                  className="flex justify-center"
                >
                  <Image
                    src={banner.image.url}
                    width={1200}
                    height={300}
                    alt="Banner"
                    className="object-cover w-full h-[590px] cursor-pointer"
                    loading="lazy"
                  />
                </CarouselItem>
              )
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
