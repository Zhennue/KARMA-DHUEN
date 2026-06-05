"use client";

import * as React from "react";
import { createClient } from "@/utils/supabase/client";

import {
  IconChevronDown,
  IconPlus,
  IconLayoutColumns,
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

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ================= SUPABASE ================= */
const supabase = createClient();

/* ================= TYPE ================= */
type User = {
  id: string;
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
    actions: true,
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

  /* ================= ADD USER ================= */
  const addUser = async () => {
    const phone = prompt("Phone number");
    const role = prompt("Role (user/admin/kitchen)") as string;

    if (!phone || !role) return;

    let password: string | null = null;

    if (role === "admin" || role === "kitchen") {
      password = prompt("Password");

      if (!password) return;
    }

    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          phone_number: phone,
          role,
          password,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("INSERT ERROR:", error);
      toast.error(error.message || "Insert failed");
      return;
    }

    toast.success("User added");

    setData((prev) => [newUser, ...prev]);
  };

  /* ================= UPDATE ROLE ================= */
  const updateRole = async (id: string, role: string) => {
    let password: string | null = null;

    if (role === "admin" || role === "kitchen") {
      password = prompt("Set password for this role");

      if (!password) return;
    }

    const { error } = await supabase
      .from("users")
      .update({ role, password })
      .eq("id", id);

    if (error) {
      console.error("UPDATE ERROR:", error);
      toast.error(error.message || "Update failed");
      return;
    }

    toast.success("Updated");

    setData((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role, password } : u)),
    );
  };

  /* ================= DELETE ================= */
  const deleteRow = async (id: string) => {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("DELETE ERROR:", error);
      toast.error(error.message || "Delete failed");
      return;
    }

    toast.success("Deleted");

    setData((prev) => prev.filter((u) => u.id !== id));
  };

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

        <div className="flex flex-1 flex-col bg-muted/20">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col gap-6 p-4 md:p-6">
              <Tabs defaultValue="outline" className="w-full flex-col gap-6">
                {/* ================= TOP BAR ================= */}
                <div className="px-0">
                  <div className="flex w-full items-center justify-between">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3">
                      <Label htmlFor="view-selector" className="sr-only">
                        View
                      </Label>

                      <Select defaultValue="outline">
                        <SelectTrigger
                          className="flex w-fit @4xl/main:hidden"
                          size="sm"
                          id="view-selector"
                        >
                          <SelectValue placeholder="Select a view" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="outline">Outline</SelectItem>

                          <SelectItem value="past-performance">
                            Past Performance
                          </SelectItem>

                          <SelectItem value="key-personnel">
                            Key Personnel
                          </SelectItem>

                          <SelectItem value="focus-documents">
                            Focus Documents
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
                        <TabsTrigger value="outline">Outline</TabsTrigger>

                        <TabsTrigger value="past-performance">
                          Past Performance <Badge variant="secondary">3</Badge>
                        </TabsTrigger>

                        <TabsTrigger value="key-personnel">
                          Key Personnel <Badge variant="secondary">2</Badge>
                        </TabsTrigger>

                        <TabsTrigger value="focus-documents">
                          Focus Documents
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="ml-auto flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
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

                          <DropdownMenuCheckboxItem
                            checked={visibleColumns.actions}
                            onCheckedChange={(value) =>
                              setVisibleColumns((prev) => ({
                                ...prev,
                                actions: !!value,
                              }))
                            }
                          >
                            Actions
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={addUser}
                      >
                        <IconPlus className="size-4" />

                        <span className="hidden lg:inline">Add Section</span>
                      </Button>
                    </div>
                  </div>
                </div>
                {/* ================= TABLE ================= */}
                <TabsContent value="outline" className="m-0">
                  <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-muted/40">
                          <TableRow className="hover:bg-transparent">
                            {visibleColumns.phone && (
                              <TableHead className="h-12 px-6">Phone</TableHead>
                            )}

                            {visibleColumns.role && (
                              <TableHead className="h-12 px-6">Role</TableHead>
                            )}

                            {visibleColumns.password && (
                              <TableHead className="h-12 px-6">
                                Password
                              </TableHead>
                            )}

                            {visibleColumns.created && (
                              <TableHead className="h-12 px-6 text-center">
                                Created
                              </TableHead>
                            )}

                            {visibleColumns.actions && (
                              <TableHead className="h-12 px-6 text-center">
                                Actions
                              </TableHead>
                            )}
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                className="h-24 text-center text-muted-foreground"
                              >
                                Loading...
                              </TableCell>
                            </TableRow>
                          ) : data.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                className="h-24 text-center text-muted-foreground"
                              >
                                No users found.
                              </TableCell>
                            </TableRow>
                          ) : (
                            data.map((row) => (
                              <TableRow
                                key={row.id}
                                className="hover:bg-muted/30"
                              >
                                {visibleColumns.phone && (
                                  <TableCell className="px-6 py-4 font-medium">
                                    {row.phone_number}
                                  </TableCell>
                                )}

                                {visibleColumns.role && (
                                  <TableCell className="px-6 py-4">
                                    <Select
                                      defaultValue={row.role}
                                      onValueChange={(val) =>
                                        updateRole(row.id, val)
                                      }
                                    >
                                      <SelectTrigger className="h-9 w-36">
                                        <SelectValue />
                                      </SelectTrigger>

                                      <SelectContent
                                        position="popper"
                                        side="bottom"
                                        align="center"
                                      >
                                        <SelectItem value="user">
                                          User
                                        </SelectItem>

                                        <SelectItem value="admin">
                                          Admin
                                        </SelectItem>

                                        <SelectItem value="kitchen">
                                          Kitchen
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                )}

                                {visibleColumns.password && (
                                  <TableCell className="px-6 py-4 text-muted-foreground">
                                    {row.password ? "•••••••••" : "-"}
                                  </TableCell>
                                )}

                                {visibleColumns.created && (
                                  <TableCell className="px-6 py-4 text-center text-sm text-muted-foreground">
                                    {new Date(row.created_at).toLocaleString()}
                                  </TableCell>
                                )}

                                {visibleColumns.actions && (
                                  <TableCell className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newPhone = prompt(
                                            "Edit phone",
                                            row.phone_number,
                                          );

                                          if (!newPhone) return;

                                          supabase
                                            .from("users")
                                            .update({
                                              phone_number: newPhone,
                                            })
                                            .eq("id", row.id)
                                            .then(({ error }) => {
                                              if (error) {
                                                toast.error(error.message);
                                              } else {
                                                toast.success("Updated");

                                                setData((prev) =>
                                                  prev.map((u) =>
                                                    u.id === row.id
                                                      ? {
                                                          ...u,
                                                          phone_number:
                                                            newPhone,
                                                        }
                                                      : u,
                                                  ),
                                                );
                                              }
                                            });
                                        }}
                                      >
                                        Edit
                                      </Button>

                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteRow(row.id)}
                                      >
                                        Delete
                                      </Button>
                                    </div>
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
