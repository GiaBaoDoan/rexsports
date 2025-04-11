import { useAppSelector } from "@/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PATH } from "@/lib/contanst";
import EditOrDelete from "@/components/ui/edit-delete";
import Status from "@/components/ui/product-status";
import useAsyncAction from "@/hooks/useAsyncAction";
import { deleteCollection } from "@/store/thunk/delete-collection";

const CollectionTable = () => {
  const { collections } = useAppSelector((state) => state.CollectionsReducer);

  const { execute } = useAsyncAction();

  const handleDelete = (id: string) => {
    execute({
      actionCreator: () => deleteCollection(id),
    });
  };

  return (
    <div className="border rounded-lg p-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Số sản phẩm</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections?.map((collection) => (
            <TableRow key={collection._id}>
              <TableCell>
                <Image
                  src={collection.image?.url || "/placeholder.jpg"}
                  alt={collection.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>{collection.name}</TableCell>
              <TableCell
                className="truncate max-w-[150px]"
                title={collection.description}
              >
                {collection.description}
              </TableCell>
              <TableCell className="text-center">
                {collection.products.length}
              </TableCell>
              <TableCell>
                <Status status={collection.status as boolean} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <EditOrDelete
                  onDelete={() => handleDelete(collection._id)}
                  isLoading={false}
                  path={PATH.collection.edit(collection._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CollectionTable;
