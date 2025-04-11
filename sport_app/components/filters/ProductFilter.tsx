"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense, useEffect, useMemo, useState } from "react";
import { filterByName } from "@/store/slice/products";
import { useQueryParams } from "@/hooks/use-params";
import { useDebouncedValue } from "@/hooks/use-debounce";
import Loading from "@/components/ui/loading";

const ProductFilter = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.CategoriesReducer);
  const [name, setName] = useState("");
  const debouncedName = useDebouncedValue(name, 500);
  const { updateQuery } = useQueryParams();

  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => (
        <SelectItem key={cat._id} value={cat._id}>
          {cat.name}
        </SelectItem>
      )),
    [categories]
  );

  useEffect(() => {
    dispatch(filterByName(debouncedName));
  }, [debouncedName, dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-4 gap-3 mt-5">
        {/* Lọc theo tên sản phẩm */}
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Lọc sản phẩm..."
        />

        {/* Lọc theo danh mục */}
        <Select onValueChange={(cat) => updateQuery("category", cat)}>
          <SelectTrigger className="cursor-pointer">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Tất cả</SelectItem>
            {categoryOptions}
          </SelectContent>
        </Select>

        {/* Lọc theo giá */}
        <Select onValueChange={(price) => updateQuery("sortByPrice", price)}>
          <SelectTrigger>
            <SelectValue placeholder="Giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Tăng dần</SelectItem>
            <SelectItem value="desc">Giảm dần</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Suspense>
  );
};

export default ProductFilter;
