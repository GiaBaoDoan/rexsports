import { useAppSelector } from "@/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { PATH } from "@/lib/contanst";

const CollectionTable = () => {
  const { collections } = useAppSelector((state) => state.CollectionsReducer);
  const router = useRouter();

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
                  width={50}
                  height={50}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>{collection.name}</TableCell>
              <TableCell
                className="truncate max-w-[150px]"
                title={collection.description}
              >
                {collection.description}
              </TableCell>
              <TableCell>{collection.products.length}</TableCell>
              <TableCell>
                {collection.status ? (
                  <span className="text-green-600">Hoạt động</span>
                ) : (
                  <span className="text-red-500">Tạm dừng</span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(PATH.collection.edit(collection._id))
                  }
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CollectionTable;
