"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllCollections } from "@/store/thunk/fetch-collections";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa6";

const HeaderDropDownMenu = () => {
  const dispatch = useAppDispatch();
  const { collections } = useAppSelector((state) => state.CollectionsReducer);
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaBars size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {collections?.map((collection, index) => (
          <div key={index}>
            <DropdownMenuLabel className="underline cursor-pointer">
              {collection.name}
            </DropdownMenuLabel>
            {collection.products.map((prd, idx) => (
              <DropdownMenuItem
                onClick={() => router.push(`/products/${prd.slug}`)}
                key={idx}
                className="cursor-pointer truncate"
              >
                {prd.name}
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default HeaderDropDownMenu;
