"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
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
import { Badge } from "@/components/ui/badge";
import { PATH } from "@/lib/contanst";
import { getDate } from "@/lib/date";
import NoData from "@/components/ui/no-data";
import useAsyncAction from "@/hooks/useAsyncAction";
import { deleteUserThunk } from "@/store/thunk/delete-user";
import { getAllUsersThunk } from "@/store/thunk/get-users";
import Avatar from "@/components/ui/avatar";
import { ImageType } from "@/types/product";
import EmailVerified from "@/components/ui/email-verify";

const UserTable = () => {
  const { users } = useAppSelector((state) => state.UsersReducer);

  const dispatch = useAppDispatch();

  const { execute, isLoading } = useAsyncAction();

  const handleDelete = (id: string) => {
    execute({
      actionCreator: () => deleteUserThunk(id),
      callBack: () => dispatch(getAllUsersThunk()),
    });
  };

  return (
    <div className="border rounded-lg p-3 shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tên người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {<Avatar avatar={user.image as ImageType} />}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <EmailVerified isVerified={user.verified} email={user.email} />
              </TableCell>
              <TableCell>{getDate(user.updatedAt)}</TableCell>
              <TableCell>
                <Badge variant="secondary">{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Status status={user.status} />
              </TableCell>

              <TableCell className="text-right space-x-2">
                <EditOrDelete
                  onDelete={() => handleDelete(user._id)}
                  path={PATH.user.edit(user._id)}
                  isLoading={isLoading}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!users.length && <NoData />}
    </div>
  );
};

export default UserTable;
