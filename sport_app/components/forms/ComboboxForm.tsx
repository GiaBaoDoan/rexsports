"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useFetchData from "@/hooks/use-fetch-data";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { fetchProductsThunk } from "@/store/thunk/fetch-products";
import { CollectionResType } from "@/types/collection";
import { ProductRes } from "@/types/product";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ComboboxForm = () => {
  const form = useFormContext<CollectionResType>();

  const { products } = useAppSelector((state) => state.ProductsReducer);

  const productValues = form.watch("products") || [];

  const toggleSelect = (product: ProductRes) => {
    const exists = productValues.some((prd) => prd._id === product._id);

    const res = exists
      ? productValues.filter((prd) => prd._id !== product._id)
      : [...productValues, product];

    form.setValue("products", res);
  };

  const [open, setOpen] = useState(false);

  useFetchData(() => fetchProductsThunk(""), []);

  return (
    <FormField
      control={form.control}
      name="products"
      render={() => (
        <FormItem className="flex-col flex gap-2">
          <FormLabel>Danh sách sản phẩm</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                Thêm sản phẩm
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[500px]">
              <Command>
                <CommandInput placeholder="Tìm sản phẩm..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No results.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto space-y-2">
                    {products.map((product) => (
                      <CommandItem
                        key={product._id}
                        value={product._id}
                        onSelect={() => {
                          toggleSelect(product);
                        }}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition"
                      >
                        <Image
                          src={product?.images[0].url}
                          alt="Ảnh sản phẩm"
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded object-cover border"
                        />
                        <span
                          className="truncate max-w-[400px]"
                          title={product.name}
                        >
                          {product.name}
                        </span>
                        <Check
                          className={cn(
                            "ml-auto transition",
                            productValues?.find(
                              (val) => val._id === product._id
                            )
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {productValues?.map((value) => (
              <div
                key={value._id}
                className="relative group flex flex-col items-center bg-gray-100 p-2 rounded-lg shadow-sm border"
              >
                <Image
                  src={value?.images[0]?.url || "/placeholder.jpg"}
                  alt={value.name}
                  width={80}
                  height={80}
                  className="object-cover w-[80px] h-[80px] rounded-md"
                />

                <span className="text-sm text-gray-700 mt-2 text-center">
                  {value.name}
                </span>

                <button
                  onClick={() => toggleSelect(value)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxForm;
