"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { createClient } from "@/utils/supabase/client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type UserData = {
  id: string;
  nationality: "bt" | "in";
  phone_number: string;
  role: string;
};

const supabase = createClient();

export function NavUser() {
  const router = useRouter();

  const { isMobile } = useSidebar();

  const [user, setUser] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedPhone = localStorage.getItem("logged_phone");

      if (!savedPhone) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("phone_number", savedPhone)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("logged_phone");

    router.push("/");
  };

  const getCountryFlag = () => {
    if (user?.nationality === "bt") {
      return "/bhutan-flag.png";
    }

    return "/indian-flag.png";
  };

  const getCountryName = () => {
    if (user?.nationality === "bt") {
      return "Bhutan";
    }

    return "India";
  };

  const getRoleLabel = () => {
    if (!user?.role) return "User";

    return (
      user.role.charAt(0).toUpperCase() +
      user.role.slice(1)
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
              "
            >
              <Avatar className="h-9 w-9 rounded-3xl border">
                <AvatarImage
                  src={getCountryFlag()}
                  alt={getCountryName()}
                  className="object-cover"
                />

                <AvatarFallback className="rounded-lg">
                  {user?.nationality === "bt" ? "🇧🇹" : "🇮🇳"}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.phone_number || "Unknown User"}
                </span>

                <span className="truncate text-xs text-muted-foreground">
                  {getRoleLabel()}
                </span>
              </div>

              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="
              w-(--radix-dropdown-menu-trigger-width)
              min-w-64
              rounded-xl
            "
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* TOP USER CARD */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar className="h-12 w-12 rounded-3xl border">
                  <AvatarImage
                    src={getCountryFlag()}
                    alt={getCountryName()}
                    className="object-cover"
                  />

                  <AvatarFallback className="rounded-xl">
                    {user?.nationality === "bt" ? "🇧🇹" : "🇮🇳"}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left leading-tight">
                  <span className="font-semibold">
                    {user?.phone_number}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {getCountryName()}
                  </span>

                  <span className="mt-1 text-xs font-medium capitalize text-primary">
                    {user?.role}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* MENU */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2">
                <IconUserCircle className="size-4" />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2">
                <IconCreditCard className="size-4" />
                Billing
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2">
                <IconNotification className="size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* LOGOUT */}
            <DropdownMenuItem
              className="gap-2 text-red-500 focus:text-red-500"
              onClick={handleLogout}
            >
              <IconLogout className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}