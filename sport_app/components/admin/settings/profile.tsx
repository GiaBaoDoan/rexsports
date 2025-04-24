"use client";

import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import Image from "next/image";
import useAsyncAction from "@/hooks/useAsyncAction";
import { LogoutThunk } from "@/store/thunk/logout";

export default function Profile() {
  const { profile } = useAppSelector((state) => state.ProfileReducer);

  const router = useRouter();

  const { execute } = useAsyncAction();

  const handleLogout = () => {
    execute({
      actionCreator: LogoutThunk,
      callBack: () => router.push("/auth/login"),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {profile?.image ? (
          <Image
            src={`${profile?.image?.url}`}
            className="w-12 h-12 object-cover rounded-full"
            width={300}
            height={300}
            alt="Avatar"
          />
        ) : (
          <span className="flex items-center justify-center rounded-full w-10 h-10 bg-sky-500">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 right-10">
        <DropdownMenuLabel className="flex flex-col items-start font-normal">
          <span className="">{profile?.name}</span>
          <span className="text-xs">{profile?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            <Settings /> Cài đặt tài khoản
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
