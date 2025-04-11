"use client";

import Profile from "@/components/admin/settings/profile";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useFetchData from "@/hooks/use-fetch-data";
import { useAppSelector } from "@/store/store";
import { getProfileThunk } from "@/store/thunk/get-profile";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useFetchData(() => getProfileThunk(), []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="flex-1">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Trang quản trị</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Danh sách sản phẩm</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Profile />
        </header>
        <div className="p-10">
          {/* {isAdmin && !isLoading ? (
            children
          ) : (
            <div className="text-center text-red-500">
              🚫 Bạn không có quyền truy cập vào trang này!
            </div>
          )} */}

          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
