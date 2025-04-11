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
import { menus } from "@/lib/contanst";
import { getProfileThunk } from "@/store/thunk/get-profile";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useFetchData(() => getProfileThunk(), []);

  const pathname = usePathname();

  const getBreadcrumbLabelByPath = (pathname: string) => {
    for (const menu of menus) {
      for (const item of menu.urls) {
        if (pathname.startsWith(item.url)) {
          return item.text;
        }
      }
    }
    return null;
  };

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
                <BreadcrumbPage>
                  {getBreadcrumbLabelByPath(pathname)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Profile />
        </header>
        <div className="p-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
