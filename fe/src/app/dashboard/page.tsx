import type { Metadata } from "next";

import { AppSidebar } from "../../components/app-sidebar";
import { CulinaryDashboard } from "./components/culinary-dashboard";
import { SiteHeader } from "../../components/site-header";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Karma Dhuen",
  description:
    "A cinematic food and drinks dashboard with curated daily highlights.",
};

export default function Page() {
  return (
    <SidebarProvider
      defaultOpenMobile
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <CulinaryDashboard />
      </SidebarInset>
    </SidebarProvider>
  );
}
