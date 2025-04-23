"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { convertToBase64 } from "@/lib/utils";
import { ProductType } from "@/schema/product";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";

const ProductVariantForm = () => {
  const form = useFormContext<ProductType>();
  const variants = form.watch("variants");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  return (
    <div className="mt-5">
      <div>
        <h3 className="text-lg font-bold ">Tùy chọn sản phẩm</h3>
        <Button
          type="button"
          className="my-5"
          onClick={() =>
            append({
              size: "",
              color: "",
              stock: 0,
              icon: "",
            })
          }
        >
          +
        </Button>
      </div>
      <div className="gap-5 grid grid-cols-3">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col justify-between border gap-4 shadow p-4 rounded-lg bg-white"
          >
            {/* Ảnh sản phẩm */}
            <div className="flex flex-col items-center space-y-2">
              <FormField
                control={form.control}
                name={`variants.${index}.icon`}
                render={({ field: { onChange } }) => (
                  <FormItem className="w-full text-center">
                    <FormLabel>Ảnh sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(event) => {
                          if (event.target.files) {
                            convertToBase64(event.target.files[0]).then(
                              onChange
                            );
                          }
                        }}
                      />
                    </FormControl>
                    {variants[index]?.icon && (
                      <Image
                        src={
                          typeof variants[index].icon === "string"
                            ? variants[index].icon
                            : variants[index].icon.url
                        }
                        alt="Ảnh sản phẩm"
                        width={80}
                        height={80}
                        className="object-cover w-[80px] h-[80px] rounded border mt-2"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Màu sắc */}
              <FormField
                name={`variants.${index}.color`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Màu sắc</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Màu sắc" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kích thước */}
              <FormField
                name={`variants.${index}.size`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kích thước</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Kích thước" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số lượng (Chiếm full row) */}
              <FormField
                name={`variants.${index}.stock`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        placeholder="Số lượng"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Nút hành động */}
            <div className="flex justify-between items-center mt-4">
              <Button
                type="button"
                variant="secondary"
                disabled={index === 0}
                onClick={() => remove(index)}
              >
                <IoTrashOutline />
              </Button>
              <Button type="button" variant="secondary">
                <MdDragIndicator />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantForm;
