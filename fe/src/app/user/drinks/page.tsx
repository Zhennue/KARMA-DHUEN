import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DrinksHero } from "./components/drinks-hero";
import { DrinksSection } from "./components/drinks-section";
import { drinkSections } from "./components/drinks-data";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import type { CSSProperties } from "react";

export default function DrinksPage() {
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
        <SiteHeader title="Drinks" />
        <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0f1012] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(54,58,63,0.30),_transparent_28%),radial-gradient(circle_at_80%_10%,_rgba(255,255,255,0.08),_transparent_18%),radial-gradient(circle_at_bottom_left,_rgba(17,19,23,0.24),_transparent_24%),linear-gradient(180deg,_#181a1e_0%,_#0f1012_50%,_#07080a_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 md:px-10 md:py-12">
            <DrinksHero />

            <div className="space-y-10 pb-8">
              {drinkSections.map((section) => (
                <DrinksSection key={section.title} {...section} />
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
