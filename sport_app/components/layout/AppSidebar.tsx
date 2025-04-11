"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PATH } from "@/lib/contanst";
import Link from "next/link";

const menus = [
  {
    title: "Dashboard",
    urls: [
      { url: PATH.dashboard.overview, text: "Tổng quan" },
      { url: PATH.dashboard.report, text: "Báo cáo" },
    ],
  },

  {
    title: "Người dùng",
    urls: [{ url: PATH.user.list, text: "Quản lý người dùng" }],
  },
  {
    title: "Đơn hàng",
    urls: [{ url: PATH.orders.list, text: "Quản lý đơn hàng" }],
  },
  {
    title: "Sản phẩm",
    urls: [
      { url: PATH.products.admin, text: "Quản lý sản phẩm" },
      { url: PATH.products.add, text: "Thêm sản phẩm" },
    ],
  },
  {
    title: "Danh mục",
    urls: [
      { url: PATH.categories.list, text: "Quản lý danh mục" },
      { url: PATH.categories.add, text: "Thêm danh mục" },
    ],
  },

  {
    title: "Banner ảnh",
    urls: [
      {
        url: PATH.banner.list,
        text: "Quản lý banners",
      },
      {
        url: PATH.banner.add,
        text: "Thêm banner ảnh",
      },
    ],
  },
  {
    title: "Bộ sưu tập",
    urls: [
      { url: PATH.collection.list, text: "Quản lý bộ sưu tập" },
      { url: PATH.collection.add, text: "Thêm bộ sưu tập" },
    ],
  },
  // {
  //   title: "Settings",
  //   urls: [{ url: PATH.collection.list, text: "Quản lý tài khoản" }],
  // },
];

export const SideBarNavs = {
  navMain: [
    {
      title: "Trang chủ",
      menus,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {SideBarNavs.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="p-0">Trang chủ</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Accordion type="single" collapsible>
                  {item.menus.map((menu) => (
                    <AccordionItem key={menu.title} value={menu.title}>
                      <AccordionTrigger className="flex font-normal gap-2">
                        {menu.title}
                      </AccordionTrigger>
                      {menu.urls.map((url, index) => (
                        <AccordionContent key={index}>
                          <SidebarMenuButton>
                            <Link className="capitalize" href={`${url.url}`}>
                              {url.text}
                            </Link>
                          </SidebarMenuButton>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  ))}
                </Accordion>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
