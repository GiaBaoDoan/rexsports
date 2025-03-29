"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllCollections } from "@/store/thunk/fetch-collections";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BestProduct = () => {
  const { collections } = useAppSelector((state) => state.CollectionsReducer);

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);
  return (
    <div className="my-10 w-[90%] mx-auto space-y-10">
      {collections?.map((collection, index) => (
        <div
          key={index}
          className={cn(
            "flex justify-between items-center gap-10",
            index % 2 !== 0 && "flex-row-reverse"
          )}
        >
          <Image
            src={collection.image.url}
            width={300}
            height={300}
            alt="Ảnh"
            className="w-[150px] object-cover h-[150px] md:w-[435px] md:h-[375px]"
          ></Image>
          <div className="flex-col justify-start items-start gap-1 md:gap-5 inline-flex">
            <div className="text-zinc-800 text-[14px] md:text-[42px] font-semibold">
              {collection.name}
            </div>
            <div className="w-full md:w-[427px] text-neutral-500 text-[10px] md:text-base font-normal">
              {collection.description}
            </div>
            <div
              onClick={() => router.push(`/collection/${collection.slug}`)}
              className="cursor-pointer px-[6px] py-[4px] md:px-[18px] md:py-[9px] w-20 md:w-auto bg-neutral-700 rounded-sm md:rounded-xl justify-center items-center gap-2.5 inline-flex"
            >
              <div className="text-white text-opacity-80 text-[10px] md:text-base font-normal">
                Xem thêm
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div className="flex justify-between items-center gap-10">
        <Image
          src={
            "https://res.cloudinary.com/giabao12/image/upload/v1741874365/rex-sport/nrpn20hxhzvnbrvauu3p.jpg"
          }
          width={300}
          height={300}
          alt="Ảnh"
          className="w-[150px] object-cover h-[150px] md:w-[435px] md:h-[375px]"
        ></Image>
        <div className="flex-col justify-start items-start gap-1 md:gap-5 inline-flex">
          <div className="text-zinc-800 text-[14px] md:text-[42px] font-semibold">
            REX CUSTOM PHIÊN BẢN GIỚI HẠN
          </div>
          <div className="w-full md:w-[427px] text-neutral-500 text-[10px] md:text-base font-normal">
            Những sản phẩm được Thế Dân custom bằng BÚA 1 TẤN nhân dịp 500K sub.
            Mỗi sản phẩm là một phiên bản độc nhất tạo nên chất riêng của mỗi
            người
          </div>
          <div className="cursor-pointer px-[6px] py-[4px] md:px-[18px] md:py-[9px] w-20 md:w-auto bg-neutral-700 rounded-sm md:rounded-xl justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-opacity-80 text-[10px] md:text-base font-normal">
              Xem thêm
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center flex-row-reverse">
        <Image
          src={
            "https://res.cloudinary.com/giabao12/image/upload/v1741874365/rex-sport/nrpn20hxhzvnbrvauu3p.jpg"
          }
          width={300}
          height={300}
          alt="Ảnh"
          className="w-[150px] h-[150px] md:w-[435px] md:h-[375px] object-cover"
        ></Image>
        <div className="flex-col justify-start items-start gap-1 md:gap-5 inline-flex">
          <div className="text-zinc-800 text-[14px] md:text-[42px] font-semibold">
            REX COLLECTION
          </div>
          <div className="w-full md:w-[427px] text-neutral-500 text-[10px] md:text-base font-normal">
            Đồng hành cùng REX BẤT TỬ - Trải nghiệm đẳng cấp thời trang
          </div>
          <div className="cursor-pointer px-[6px] py-[4px] md:px-[18px] md:py-[9px] w-20 md:w-auto bg-neutral-700 rounded-sm md:rounded-xl justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-opacity-80 text-[10px] md:text-base font-normal">
              Xem thêm
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Image
          src={
            "https://res.cloudinary.com/giabao12/image/upload/v1741874365/rex-sport/nrpn20hxhzvnbrvauu3p.jpg"
          }
          width={300}
          height={300}
          alt="Ảnh"
          className="w-[150px] h-[150px] md:w-[435px] md:h-[375px] object-cover"
        ></Image>
        <div className="flex-col justify-start items-start gap-1 md:gap-5 inline-flex">
          <div className="text-zinc-800 text-[14px] md:text-[42px] font-semibold">
            DỤNG CỤ TẬP THỂ THAO
          </div>
          <div className="w-full md:w-[427px] text-neutral-500 text-[10px] md:text-base font-normal">
            Nơi bạn có thể trang bị một phòng gym di động cho bản thân và bạn có
            thể tự tin vượt lên mọi thử thách
          </div>
          <div className="cursor-pointer px-[6px] py-[4px] md:px-[18px] md:py-[9px] w-20 md:w-auto bg-neutral-700 rounded-sm md:rounded-xl justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-opacity-80 text-[10px] md:text-base font-normal">
              Xem thêm
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BestProduct;
