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

import { AddSection } from "./components/add-section";
import { Update } from "./components/update";

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

  const [addOpen, setAddOpen] = React.useState(false);

  const [updateOpen, setUpdateOpen] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  /* ================= DELETE CONFIRM ================= */
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [deleteUser, setDeleteUser] = React.useState<User | null>(null);

  /* ================= COLUMN VISIBILITY ================= */
  const [visibleColumns, setVisibleColumns] = React.useState({
    name: true,
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
  const addUser = async (values: {
    name: string | null;
    nationality: "bt" | "in";
    phone_number: string;
    role: string;
    password: string | null;
  }) => {
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          name: values.name,
          nationality: values.nationality,
          phone_number: values.phone_number,
          role: values.role,
          password: values.password,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("INSERT ERROR FULL:", JSON.stringify(error, null, 2));

      toast.error(error.message || "Insert failed");

      return;
    }

    toast.success("User added");

    setData((prev) => [newUser, ...prev]);
  };

  /* ================= UPDATE ROLE ================= */
  const updateRole = async (id: string, role: string) => {
    const { error } = await supabase
      .from("users")
      .update({ role })
      .eq("id", id);

    if (error) {
      console.error("UPDATE ERROR:", error);

      toast.error(error.message || "Update failed");

      return;
    }

    toast.success("Updated");

    setData((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  /* ================= UPDATE USER ================= */
  const updateUser = async (
    id: string,
    values: {
      name: string | null;
      nationality: "bt" | "in";
      phone_number: string;
      role: string;
      password: string | null;
    },
  ) => {
    const { error } = await supabase
      .from("users")
      .update({
        name: values.name,
        nationality: values.nationality,
        phone_number: values.phone_number,
        role: values.role,
        password: values.password,
      })
      .eq("id", id);

    if (error) {
      console.error("UPDATE ERROR FULL:", JSON.stringify(error, null, 2));

      toast.error(error.message || "Update failed");

      return;
    }

    toast.success("Updated");

    setData((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              name: values.name,
              nationality: values.nationality,
              phone_number: values.phone_number,
              role: values.role,
              password: values.password,
            }
          : u,
      ),
    );
  };

  /* ================= DELETE ================= */
  const deleteRow = async () => {
    if (!deleteUser) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", deleteUser.id);

    if (error) {
      console.error("DELETE ERROR:", error);

      toast.error(error.message || "Delete failed");

      return;
    }

    toast.success("User deleted");

    setData((prev) => prev.filter((u) => u.id !== deleteUser.id));

    setDeleteOpen(false);
    setDeleteUser(null);
  };

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
      {/* ================= ADD ================= */}
      <AddSection open={addOpen} onOpenChange={setAddOpen} onSubmit={addUser} />

      {/* ================= UPDATE ================= */}
      <Update
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        user={selectedUser}
        onSubmit={updateUser}
      />

      {/* ================= DELETE CONFIRM ================= */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="border-white/10 bg-zinc-950 text-white">
          <AlertDialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
              <IconAlertTriangle className="size-6 text-red-500"/>
            </div>

            <AlertDialogTitle className="text-xl">
              {deleteUser?.name || "Delete User"}
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm text-white/60">
              Are you sure you want to delete this user?
              <br />
              <br />
              <span className="font-medium text-white">
                {deleteUser?.phone_number}
              </span>
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={deleteRow}
              className="hover:bg-red-700"
              variant="destructive"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

                        {/* ADD USER */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => setAddOpen(true)}
                        >
                          <IconPlus className="size-4" />

                          <span className="hidden lg:inline">Add User</span>
                        </Button>
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

                                        <div className="flex flex-col">
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

                                  {/* PHONE_NUMBER */}
                                  {visibleColumns.phone && (
                                    <TableCell className="px-6 py-4 text-center text-muted-foreground">
                                      {row.phone_number}
                                      <div className="font-medium"></div>
                                    </TableCell>
                                  )}

                                  {/* ROLE */}
                                  {visibleColumns.role && (
                                    <TableCell className="px-6 py-4">
                                      <div className="flex w-full items-center justify-center">
                                        <Select
                                          value={row.role}
                                          onValueChange={(val) =>
                                            updateRole(row.id, val)
                                          }
                                        >
                                          <SelectTrigger className="h-9 w-36 text-center">
                                            <SelectValue />
                                          </SelectTrigger>

                                          <SelectContent>
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

                                  {/* ACTIONS */}
                                  {visibleColumns.actions && (
                                    <TableCell className="px-6 py-4">
                                      <div className="flex justify-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setSelectedUser(row);
                                            setUpdateOpen(true);
                                          }}
                                        >
                                          Edit
                                        </Button>

                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() => {
                                            setDeleteUser(row);
                                            setDeleteOpen(true);
                                          }}
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
    </>
  );
}
