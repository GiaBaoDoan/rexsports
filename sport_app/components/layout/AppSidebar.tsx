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
import { menus } from "@/lib/contanst";
import Link from "next/link";

export const SideBarNavs = {
  navMain: [
    {
      title: "Trang quản trị",
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
            <SidebarGroupLabel className="p-0">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Accordion type="single" collapsible>
                  {menus.map((menu) => (
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
