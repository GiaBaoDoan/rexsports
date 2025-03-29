"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounce";
import { filterByName } from "@/store/slice/categories";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const debounced = useDebouncedValue(name);

  useEffect(() => {
    dispatch(filterByName(debounced));
  }, [debounced, dispatch]);

  return (
    <>
      <Input
        onChange={(e) => setName(e.target.value)}
        className="w-[300px]"
        placeholder="Lọc danh mục..."
      />
    </>
  );
};

export default CategoryFilter;
