"use client";

import { useState, type CSSProperties } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { FoodHero } from "./components/food-hero";
import { MenuSection } from "./components/menu-section";
import { menuSections } from "./components/menu-data";
import { ItemDetail } from "./components/description";

import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { Sheet, SheetContent, SheetTitle } from "@/src/components/ui/sheet";

type MenuItemType =
  (typeof menuSections)[number]["items"][number];

export default function FoodPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  const handleAddToCart = (cartData: any) => {
    console.log("Item ready for order:", cartData);
    setSelectedItem(null);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        {/* FIXED: removed unsupported prop */}
        <SiteHeader title="Food" />

        <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0f0d0b] text-white">
          
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,196,120,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,140,66,0.08),_transparent_24%),linear-gradient(180deg,_#181411_0%,_#0f0d0b_50%,_#090807_100%)]" />

          {/* Grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />

          {/* Glow effects */}
          <div className="absolute left-[-8rem] top-20 hidden h-72 w-72 rounded-full bg-[#ffb36b]/10 blur-3xl sm:block" />
          <div className="absolute right-[-5rem] top-36 hidden h-64 w-64 rounded-full bg-[#ff8f5c]/10 blur-3xl sm:block" />
          <div className="absolute bottom-[-8rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ffb36b]/5 blur-3xl" />

          {/* Content */}
          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 md:px-10 md:py-12">
            <FoodHero />

            <div className="space-y-10 pb-8">
              {menuSections.map((section) => (
                <MenuSection
                  key={section.title}
                  {...section}
                  onSelectItem={(item) => setSelectedItem(item)}
                />
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Drawer */}
      <Sheet
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
      >
        <SheetContent
          side="right"
          className="w-full border-l border-white/10 bg-[#110b09] p-0 sm:max-w-xl md:max-w-2xl"
        >
          <SheetTitle className="sr-only">
            {selectedItem?.name || "Food Item Customization"}
          </SheetTitle>

          {selectedItem && (
            <ItemDetail
              item={selectedItem}
              onBack={() => setSelectedItem(null)}
            />
          )}
        </SheetContent>
      </Sheet>
    </SidebarProvider>
  );
}