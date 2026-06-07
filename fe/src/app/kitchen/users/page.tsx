"use client";

import * as React from "react";
import { createClient } from "@/utils/supabase/client";

import {
  IconChevronDown,
  IconLayoutColumns,
  IconChefHat,
} from "@tabler/icons-react";

import { toast } from "sonner";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ================= SUPABASE ================= */
const supabase = createClient();

/* ================= TYPE ================= */
type User = {
  id: string;
  nationality: "bt" | "in";
  phone_number: string;
  password: string | null;
  role: string;
  created_at: string;
};

/* ================= PAGE ================= */
export default function Page() {
  const [data, setData] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  /* ================= COLUMN VISIBILITY ================= */
  const [visibleColumns, setVisibleColumns] = React.useState({
    phone: true,
    role: true,
    password: true,
    created: true,
  });

  /* ================= LOAD ================= */
  const load = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "kitchen")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOAD ERROR:", error);

      toast.error(error.message || "Failed to load kitchen users");
    } else {
      setData(data ?? []);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col bg-black">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col gap-6 p-4 md:p-6">
              {/* ================= HEADER CARD ================= */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]" />

                <div className="relative flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <IconChefHat className="size-7 text-white" />
                    </div>

                    <div>
                      <h1 className="text-2xl font-semibold tracking-tight text-white">
                        Kitchen Users
                      </h1>

                      <p className="mt-1 text-sm text-zinc-400">
                        Read-only access for kitchen staff accounts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="text-xs uppercase tracking-wide text-zinc-500">
                        Total Kitchen Users
                      </div>

                      <div className="mt-1 text-2xl font-semibold text-white">
                        {data.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= TABS ================= */}
              <Tabs defaultValue="outline" className="w-full flex-col gap-6">
                {/* ================= TOP BAR ================= */}
                <div className="flex items-center justify-between">
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <Label htmlFor="view-selector" className="sr-only">
                      View
                    </Label>

                    <Select defaultValue="outline">
                      <SelectTrigger
                        className="flex w-fit border-white/10 bg-zinc-950 text-white @4xl/main:hidden"
                        size="sm"
                        id="view-selector"
                      >
                        <SelectValue placeholder="Select a view" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="outline">Kitchen Users</SelectItem>
                      </SelectContent>
                    </Select>

                    <TabsList className="hidden border border-white/10 bg-zinc-950 @4xl/main:flex">
                      <TabsTrigger value="outline">Kitchen Users</TabsTrigger>
                    </TabsList>
                  </div>

                  {/* RIGHT */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-white/10 bg-zinc-950 text-white hover:bg-zinc-900"
                      >
                        <IconLayoutColumns className="size-4" />

                        <span className="hidden lg:inline">
                          Customize Columns
                        </span>

                        <span className="lg:hidden">Columns</span>

                        <IconChevronDown className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-56 border-white/10 bg-zinc-950 text-white"
                    >
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.phone}
                        onCheckedChange={(value) =>
                          setVisibleColumns((prev) => ({
                            ...prev,
                            phone: !!value,
                          }))
                        }
                      >
                        Phone
                      </DropdownMenuCheckboxItem>

                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.role}
                        onCheckedChange={(value) =>
                          setVisibleColumns((prev) => ({
                            ...prev,
                            role: !!value,
                          }))
                        }
                      >
                        Role
                      </DropdownMenuCheckboxItem>

                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.password}
                        onCheckedChange={(value) =>
                          setVisibleColumns((prev) => ({
                            ...prev,
                            password: !!value,
                          }))
                        }
                      >
                        Password
                      </DropdownMenuCheckboxItem>

                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.created}
                        onCheckedChange={(value) =>
                          setVisibleColumns((prev) => ({
                            ...prev,
                            created: !!value,
                          }))
                        }
                      >
                        Created
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* ================= TABLE ================= */}
                <TabsContent value="outline" className="m-0">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-white/[0.03]">
                          <TableRow className="border-white/10 hover:bg-transparent">
                            {visibleColumns.phone && (
                              <TableHead className="h-14 px-6 text-zinc-400">
                                User
                              </TableHead>
                            )}

                            {visibleColumns.role && (
                              <TableHead className="h-14 px-6 text-zinc-400">
                                Role
                              </TableHead>
                            )}

                            {visibleColumns.password && (
                              <TableHead className="h-14 px-6 text-center text-zinc-400">
                                Password
                              </TableHead>
                            )}

                            {visibleColumns.created && (
                              <TableHead className="h-14 px-6 text-center text-zinc-400">
                                Created
                              </TableHead>
                            )}
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {loading ? (
                            <TableRow className="border-white/10">
                              <TableCell
                                colSpan={4}
                                className="h-32 text-center text-zinc-500"
                              >
                                Loading kitchen users...
                              </TableCell>
                            </TableRow>
                          ) : data.length === 0 ? (
                            <TableRow className="border-white/10">
                              <TableCell
                                colSpan={4}
                                className="h-32 text-center text-zinc-500"
                              >
                                No kitchen users found.
                              </TableCell>
                            </TableRow>
                          ) : (
                            data.map((row) => (
                              <TableRow
                                key={row.id}
                                className="border-white/10 transition-colors hover:bg-white/[0.03]"
                              >
                                {/* USER */}
                                {visibleColumns.phone && (
                                  <TableCell className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                      <div className="flex size-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                                        <img
                                          src={
                                            row.nationality === "bt"
                                              ? "/bhutan-flag.png"
                                              : "/indian-flag.png"
                                          }
                                          alt={
                                            row.nationality === "bt"
                                              ? "Bhutan"
                                              : "India"
                                          }
                                          className="h-full w-full object-cover"
                                        />
                                      </div>

                                      <div className="flex flex-col">
                                        <span className="font-medium text-white">
                                          {row.phone_number}
                                        </span>

                                        <span className="mt-1 text-xs text-zinc-500">
                                          {row.nationality === "bt"
                                            ? "Bhutan"
                                            : "India"}
                                        </span>
                                      </div>
                                    </div>
                                  </TableCell>
                                )}

                                {/* ROLE */}
                                {visibleColumns.role && (
                                  <TableCell className="px-6 py-5">
                                    <div className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-wide text-white">
                                      {row.role}
                                    </div>
                                  </TableCell>
                                )}

                                {/* PASSWORD */}
                                {visibleColumns.password && (
                                  <TableCell className="px-6 py-5 text-center">
                                    <div className="font-mono tracking-[0.3em] text-zinc-500">
                                      {row.password ? "••••••••" : "-"}
                                    </div>
                                  </TableCell>
                                )}

                                {/* CREATED */}
                                {visibleColumns.created && (
                                  <TableCell className="px-6 py-5 text-center text-sm text-zinc-500">
                                    {new Date(row.created_at).toLocaleString()}
                                  </TableCell>
                                )}
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
