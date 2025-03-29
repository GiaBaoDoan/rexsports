"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchBanners } from "@/store/thunk/fetch-banners";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Banner = () => {
  const dispatch = useAppDispatch();

  const { banners } = useAppSelector((state) => state.BannersReducer);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {banners.map(
            (banner, index) =>
              banner.status && (
                <CarouselItem
                  onClick={() => router.push(`${banner.link}`)}
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
};

export default Banner;
