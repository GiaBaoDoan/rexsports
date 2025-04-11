"use client";

import { useAppSelector } from "@/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Status from "@/components/ui/product-status";
import EditOrDelete from "@/components/ui/edit-delete";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PATH } from "@/lib/contanst";
import { getDate } from "@/lib/date";

const UserTable = () => {
  const { users } = useAppSelector((state) => state.UsersReducer);

  return (
    <div className="border rounded-lg p-3 shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tên người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Quyền</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {user.image ? (
                  <Image
                    src={user.image?.url as string}
                    width={150}
                    height={80}
                    alt="Ảnh avatar"
                    className="w-20 h-20 object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center w-20 h-20 bg-sky-500">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      className="text-white"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                    </svg>
                  </span>
                )}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{user.role}</Badge>
              </TableCell>
              <TableCell>{getDate(user.updatedAt)}</TableCell>
              <TableCell>
                <Status status={user.status} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <EditOrDelete
                  onDelete={() => {}}
                  path={PATH.user.edit(user._id)}
                  isLoading={false}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
