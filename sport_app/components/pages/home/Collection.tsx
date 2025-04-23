import { fetchData } from "@/lib/fetchDataServer";
import { cn } from "@/lib/utils";
import { CollectionResType } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";

const getAllCollections = async () => {
  return await fetchData<CollectionResType[]>("collections");
};

const Collections = async () => {
  const collections = await getAllCollections();
  return (
    <div className="my-10 w-[90%] mx-auto space-y-14">
      {collections?.map(
        (collection, index) =>
          collection.status && (
            <div
              key={index}
              className={cn(
                "flex flex-col md:flex-row items-center gap-6 md:gap-12 justify-between",
                index % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              <Image
                src={collection?.image?.url}
                width={435}
                height={375}
                alt="Ảnh"
                className="w-full md:w-[435px] h-[220px] sm:h-[280px] md:h-[375px] object-cover shadow"
              />

              <div className="flex flex-col gap-4 w-full md:w-[50%] md:text-left">
                <h2 className="text-zinc-800 text-xl sm:text-3xl md:text-4xl font-semibold leading-snug">
                  {collection?.name}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {collection?.description}
                </p>
                <Link href={`/collection/${collection?.slug}`}>
                  <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm sm:text-base transition">
                    Xem thêm
                  </button>
                </Link>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Collections;
