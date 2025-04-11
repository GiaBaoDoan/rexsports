"use client";

import Image from "next/image";
import { ProductRes } from "@/types/product";
import { formatCurrency } from "@/lib/format";
import { useRouter } from "next/navigation";
import { PATH } from "@/lib/contanst";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ProductCard = ({ product }: { product: ProductRes }) => {
  const { images, name, price, slug } = product;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(PATH.products.detail(slug))}
      className="flex flex-col md:w-[250px] gap-2 cursor-pointer transition-shadow hover:shadow"
    >
      <Carousel>
        <CarouselContent>
          {images.length > 0 ? (
            images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.url}
                  width={500}
                  height={500}
                  alt="Ảnh sản phẩm"
                  className="object-cover md:h-[250px] md:w-[250px]"
                />
              </CarouselItem>
            ))
          ) : (
            <div className="flex items-center justify-center h-[250px] bg-gray-100">
              <span className="text-gray-500 text-sm">Không có ảnh</span>
            </div>
          )}
        </CarouselContent>
      </Carousel>

      <div>
        <span className="block text-neutral-700 font-light text-sm truncate">
          {name}
        </span>
        <span className="font-medium">{formatCurrency(price)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
