"use client";

import * as React from "react";
import { createClient } from "@/utils/supabase/client";

import {
  IconChevronDown,
  IconPlus,
  IconLayoutColumns,
  IconAlertTriangle,
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

import { Badge } from "@/components/ui/badge";

/* ================= SUPABASE ================= */
const supabase = createClient();

/* ================= TYPE ================= */
type User = {
  id: string;
  name: string | null;
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
    name: true,
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
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOAD ERROR:", error);

      toast.error(error.message || "Failed to load users");
    } else {
      setData(data ?? []);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  /* ================= ROLE COUNTS ================= */
  const adminCount = data.filter((u) => u.role === "admin").length;

  const kitchenCount = data.filter((u) => u.role === "kitchen").length;

  const userCount = data.filter((u) => u.role === "user").length;

  /* ================= FILTER ================= */
  const [roleFilter, setRoleFilter] = React.useState("outline");

  /* ================= FILTERED DATA ================= */
  const filteredData = data
    .filter((row) => {
      /* OUTLINE ORDER:
     ADMIN -> KITCHEN -> USER
  */
      if (roleFilter === "outline") {
        const order = {
          admin: 0,
          kitchen: 1,
          user: 2,
        };

        return true;
      }

      return row.role === roleFilter;
    })
    .sort((a, b) => {
      if (roleFilter !== "outline") return 0;

      const order: Record<string, number> = {
        admin: 0,
        kitchen: 1,
        user: 2,
      };

      return order[a.role] - order[b.role];
    });

  return (
    <>
      {/* ================= LAYOUT ================= */}
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

          <div className="flex flex-1 flex-col bg-muted/20">
            <div className="@container/main flex flex-1 flex-col">
              <div className="flex flex-col gap-6 p-4 md:p-6">
                <Tabs
                  value={roleFilter}
                  onValueChange={(val) => setRoleFilter(val)}
                  className="w-full flex-col gap-6"
                >
                  {/* ================= TOP BAR ================= */}
                  <div className="px-0">
                    <div className="flex w-full items-center justify-between">
                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <Label htmlFor="view-selector" className="sr-only">
                          View
                        </Label>

                        {/* MOBILE SELECT */}
                        <Select
                          value={roleFilter}
                          onValueChange={(val) => setRoleFilter(val)}
                        >
                          <SelectTrigger
                            className="flex w-fit @4xl/main:hidden"
                            size="sm"
                            id="view-selector"
                          >
                            <SelectValue placeholder="Select a view" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="outline">Outline</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>

                            <SelectItem value="kitchen">Kitchen</SelectItem>

                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* DESKTOP TABS */}
                        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
                          <TabsTrigger value="outline">Outline</TabsTrigger>
                          <TabsTrigger value="admin" className="gap-2">
                            Admin
                            <Badge variant="secondary">{adminCount}</Badge>
                          </TabsTrigger>

                          <TabsTrigger value="kitchen" className="gap-2">
                            Kitchen
                            <Badge variant="secondary">{kitchenCount}</Badge>
                          </TabsTrigger>

                          <TabsTrigger value="user" className="gap-2">
                            User
                            <Badge variant="secondary">{userCount}</Badge>
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      {/* RIGHT */}
                      <div className="ml-auto flex items-center gap-2">
                        {/* COLUMN CUSTOMIZE */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <IconLayoutColumns className="size-4" />

                              <span className="hidden lg:inline">
                                Customize Columns
                              </span>

                              <span className="lg:hidden">Columns</span>

                              <IconChevronDown className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuCheckboxItem
                              checked={visibleColumns.name}
                              onCheckedChange={(value) =>
                                setVisibleColumns((prev) => ({
                                  ...prev,
                                  name: !!value,
                                }))
                              }
                            >
                              Name
                            </DropdownMenuCheckboxItem>

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
                    </div>
                  </div>

                  {/* ================= TABLE ================= */}
                  <TabsContent value={roleFilter} className="m-0">
                    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader className="bg-muted/40">
                            <TableRow className="hover:bg-transparent">
                              {visibleColumns.phone && (
                                <TableHead className="h-12 px-20">
                                  User
                                </TableHead>
                              )}

                              {visibleColumns.name && (
                                <TableHead className="h-12 px-6 text-center">
                                  Phone
                                </TableHead>
                              )}

                              {visibleColumns.role && (
                                <TableHead className="h-12 px-20 text-center">
                                  Role
                                </TableHead>
                              )}

                              {visibleColumns.password && (
                                <TableHead className="h-12 px-6 text-center">
                                  Password
                                </TableHead>
                              )}

                              {visibleColumns.created && (
                                <TableHead className="h-12 px-6 text-center">
                                  Created
                                </TableHead>
                              )}
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {loading ? (
                              <TableRow>
                                <TableCell
                                  colSpan={6}
                                  className="h-24 text-center text-muted-foreground"
                                >
                                  Loading...
                                </TableCell>
                              </TableRow>
                            ) : filteredData.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={6}
                                  className="h-24 text-center text-muted-foreground"
                                >
                                  No users found.
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredData.map((row) => (
                                <TableRow
                                  key={row.id}
                                  className="hover:bg-muted/30"
                                >
                                  {/* USER */}
                                  {visibleColumns.name && (
                                    <TableCell className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center overflow-hidden rounded border border-white/10 bg-muted">
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

                                        <div className="flex flex-col ">
                                          <span className="font-medium">
                                            {row.name?.trim() ? row.name : "-"}
                                          </span>

                                          <span className="text-xs text-muted-foreground">
                                            {row.nationality === "bt"
                                              ? "Bhutan"
                                              : "India"}
                                          </span>
                                        </div>
                                      </div>
                                    </TableCell>
                                  )}

                                  {/* PHONE */}
                                  {visibleColumns.phone && (
                                    <TableCell className="">
                                      <div className="font-medium px-6 py-4 text-center text-muted-foreground">
                                        {row.phone_number}
                                      </div>
                                    </TableCell>
                                  )}

                                  {/* ROLE */}
                                  {visibleColumns.role && (
                                    <TableCell className="px-6 py-4 text-center align-middle">
                                      <div className="flex justify-center">
                                        <div className="h-9 w-36 flex items-center justify-center rounded-md border text-sm font-medium ">
                                          {row.role}
                                        </div>
                                      </div>
                                    </TableCell>
                                  )}

                                  {/* PASSWORD */}
                                  {visibleColumns.password && (
                                    <TableCell className="px-6 py-4 text-center text-muted-foreground">
                                      {row.password ? "•••••••••" : "-"}
                                    </TableCell>
                                  )}

                                  {/* CREATED */}
                                  {visibleColumns.created && (
                                    <TableCell className="px-6 py-4 text-center text-sm text-muted-foreground">
                                      {new Date(
                                        row.created_at,
                                      ).toLocaleString()}
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
    </>
  );
}
