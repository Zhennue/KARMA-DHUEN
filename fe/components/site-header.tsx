"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { useCart } from "@/src/context/cart-context";
type SiteHeaderProps = { title: string };
export function SiteHeader({ title }: SiteHeaderProps) {
  const { cart } = useCart();
  return (
    <header className="fixed top-0 left-0 z-50 flex h-(--header-height) w-full shrink-0 items-center border-b border-white/5 bg-[#110b09]/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      {" "}
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        {" "}
        {/* LEFT SIDE */}{" "}
        <div className="flex items-center gap-2">
          {" "}
          <SidebarTrigger className="-ml-1" />{" "}
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />{" "}
          {/* <div className="flex items-center gap-2 text-sm text-stone-400"> <h2 className="text-base font-medium text-white">{title}</h2> </div> */}{" "}
        </div>{" "}
        {/* CENTER SEARCH */}{" "}
        <div className="flex flex-1 justify-center">
          {" "}
          <div className="relative w-60 max-w-2xl">
            {" "}
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />{" "}
            <Input
              placeholder="Search dishes, drinks, desserts..."
              className="h-11 rounded border border-white/10 bg-white/[0.04] pl-11 text-white placeholder:text-neutral-500"
            />{" "}
          </div>{" "}
        </div>{" "}
        {/* RIGHT SIDE CART */}{" "}
        <Link
          href="/user/cart"
          className="relative flex h-11 w-10 items-center justify-center rounded border border-white/10 text-white transition-all hover:border-[#c9723f]/40 hover:bg-[#c9723f]/10"
        >
          {" "}
          <ShoppingCart className="h-5 w-5" /> {/* CART COUNT */}{" "}
          {cart.length > 0 && (
            <div className="absolute -right-1 top-0 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c9723f] px-1 text-[10px] font-bold text-white">
              {" "}
              {cart.length}{" "}
            </div>
          )}{" "}
        </Link>{" "}
      </div>{" "}
    </header>
  );
}
