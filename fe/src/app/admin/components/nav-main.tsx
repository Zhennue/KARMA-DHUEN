"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Icon } from "@tabler/icons-react";
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Quick Create */}
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              className="
                min-w-8
                bg-accent
                text-accent-foreground
                duration-200 ease-linear
                hover:bg-accent/80
                active:bg-accent/80
              "
            >
              <Link href="/create">
                <IconCirclePlusFilled />
                <span>Quick Create</span>
              </Link>
            </SidebarMenuButton>

            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>

          {/* Main Navigation */}
          {items.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(item.url + "/");
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  data-active={isActive}
                  className="
                    min-w-8
                    duration-200 ease-linear

                    hover:bg-accent
                    hover:text-accent-foreground

                    active:bg-accent
                    active:text-accent-foreground

                    data-[active=true]:bg-accent
                    data-[active=true]:text-accent-foreground
                  "
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
