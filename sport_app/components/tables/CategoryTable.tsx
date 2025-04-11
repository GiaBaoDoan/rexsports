"use client";

import EditOrDelelte from "@/components/ui/edit-delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAsyncAction from "@/hooks/useAsyncAction";
import { PATH } from "@/lib/contanst";
import { getDate } from "@/lib/date";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteCategory } from "@/store/thunk/delete-category";
import { fetchCategories } from "@/store/thunk/fetch-categories";
import NoData from "@/components/ui/no-data";

const CategoryTable = () => {
  const { categories } = useAppSelector((state) => state.CategoriesReducer);

  const { execute, isLoading: isSubmiting } = useAsyncAction();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    execute({
      actionCreator: () => deleteCategory(id),
      callBack: () => dispatch(fetchCategories()),
    });
  };

  return (
    <div className="mt-5 border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.slug}</TableCell>
              <TableCell>{getDate(cat.updatedAt)}</TableCell>
              <TableCell className="flex h-[100px] justify-end items-center">
                <EditOrDelelte
                  key={cat._id}
                  path={PATH.categories.edit(`${cat._id}`)}
                  isLoading={isSubmiting}
                  onDelete={() => handleDelete(cat._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {categories.length === 0 && <NoData />}
    </div>
  );
};

export default CategoryTable;
