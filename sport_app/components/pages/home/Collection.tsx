import { fetchData } from "@/lib/fetchDataServer";
import { cn } from "@/lib/utils";
import { CollectionResType } from "@/types/collection";
import Image from "next/image";

const getAllCollections = async () => {
  return await fetchData<CollectionResType[]>("collections");
};

const Collections = async () => {
  const collections = await getAllCollections();
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
              // onClick={() => router.push(`/collection/${collection.slug}`)}
              className="cursor-pointer px-[6px] py-[4px] md:px-[18px] md:py-[9px] w-20 md:w-auto bg-neutral-700 rounded-sm md:rounded-xl justify-center items-center gap-2.5 inline-flex"
            >
              <div className="text-white text-opacity-80 text-[10px] md:text-base font-normal">
                Xem thêm
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collections;
