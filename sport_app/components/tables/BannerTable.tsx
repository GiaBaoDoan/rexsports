import BannerStatus from "@/components/ui/banner-status";
import EditOrDelete from "@/components/ui/edit-delete";
import NoData from "@/components/ui/no-data";
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
import { deleteBanner } from "@/store/thunk/delete-banner";
import { fetchBanners } from "@/store/thunk/fetch-banners";
import Image from "next/image";

const BannerTable = () => {
  const { execute, isLoading } = useAsyncAction();
  const dispatch = useAppDispatch();

  const { banners } = useAppSelector((state) => state.BannersReducer);

  const handleDelete = (id: string) => {
    execute({
      actionCreator: () => deleteBanner(id),
      callBack: () => dispatch(fetchBanners()),
    });
  };

  return (
    <div className="mt-5 border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banner</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners?.map((banner) => (
            <TableRow key={banner._id} className="border-b hover:bg-gray-50">
              <TableCell className="flex py-2">
                <Image
                  src={banner.image.url}
                  alt={banner.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover shadow"
                />
              </TableCell>
              <TableCell>{banner.title}</TableCell>
              <TableCell>{getDate(banner.updatedAt)}</TableCell>
              <TableCell>
                <BannerStatus status={banner.status} />
              </TableCell>
              <TableCell>
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Click link
                </a>
              </TableCell>
              <TableCell className="text-end">
                <EditOrDelete
                  isLoading={isLoading}
                  onDelete={() => handleDelete(banner._id)}
                  path={PATH.banner.edit(banner._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!banners.length && <NoData />}
    </div>
  );
};

export default BannerTable;
