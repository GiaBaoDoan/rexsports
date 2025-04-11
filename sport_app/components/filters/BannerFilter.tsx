"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounce";
import { filterByTitle } from "@/store/slice/banners";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";

const BannerFilter = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  const debounced = useDebouncedValue(title);

  useEffect(() => {
    dispatch(filterByTitle(debounced));
  }, [debounced, dispatch]);

  return (
    <>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        className="w-[300px]"
        placeholder="Lọc tiêu đề..."
      />
    </>
  );
};

export default BannerFilter;
