"use client";

import * as React from "react";
import { createClient } from "@/utils/supabase/client";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

import { IconAlertTriangle } from "@tabler/icons-react";

import { toast } from "sonner";

const supabase = createClient();

/* ================= TYPES ================= */
type Category = {
  id: number;
  name: string;
  image_url: string | null;
};

type MenuItem = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  price: number | "";
  image_url: string | null;
};

export default function Page() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [items, setItems] = React.useState<MenuItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [editCategory, setEditCategory] = React.useState<Category | null>(null);
  const [editItem, setEditItem] = React.useState<MenuItem | null>(null);

  const [isNewCategory, setIsNewCategory] = React.useState(false);
  const [isNewItem, setIsNewItem] = React.useState(false);

  const [file, setFile] = React.useState<File | null>(null);

  /* ================= LOAD ================= */
  const load = async () => {
    setLoading(true);

    const [
      { data: catData, error: catErr },
      { data: itemData, error: itemErr },
    ] = await Promise.all([
      supabase.from("menu_categories").select("*"),
      supabase.from("menu_items").select("*"),
    ]);

    if (catErr) {
      console.error(catErr);
      toast.error(catErr.message);
    }

    if (itemErr) {
      console.error(itemErr);
      toast.error(itemErr.message);
    }

    setCategories(catData ?? []);
    console.log("CATEGORIES FROM DB", catData);
    setItems(itemData ?? []);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  /* ================= UPLOAD ================= */
  const uploadImage = async (
    file: File,
    bucket: "menu_categories" | "menu_items",
  ) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      console.error(error);
      toast.error(error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  };

  /* ================= SAVE CATEGORY ================= */
  const saveCategory = async () => {
    if (!editCategory) return;

    if (!editCategory.name.trim()) {
      toast.error("Category name required");
      return;
    }

    let imageUrl = editCategory.image_url;

    if (file) {
      const uploaded = await uploadImage(file, "menu_categories");
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    const res = isNewCategory
      ? await supabase
          .from("menu_categories")
          .insert({
            name: editCategory.name,
            image_url: imageUrl,
          })
          .select()
          .single()
      : await supabase
          .from("menu_categories")
          .update({
            name: editCategory.name,
            image_url: imageUrl,
          })
          .eq("id", editCategory.id)
          .select()
          .single();

    if (res.error) {
      console.log("CATEGORY UPDATE ERROR");
      console.log(JSON.stringify(res.error, null, 2));
      console.log(res);
      toast.error(res.error.message);
      return;
    }

    if (isNewCategory) {
      setCategories((prev) => [...prev, res.data]);
      toast.success("Category created");
    } else {
      setCategories((prev) =>
        prev.map((c) => (c.id === res.data.id ? res.data : c)),
      );
      toast.success("Category updated");
    }

    setEditCategory(null);
    setFile(null);
    setIsNewCategory(false);
  };

  /* ================= SAVE ITEM ================= */
  const saveItem = async () => {
    if (!editItem) return;

    let imageUrl = editItem.image_url;

    if (file) {
      const uploaded = await uploadImage(file, "menu_items");
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    const res = isNewItem
      ? await supabase
          .from("menu_items")
          .insert({
            name: editItem.name,
            description: editItem.description,
            price: editItem.price,
            category_id: editItem.category_id,
            image_url: imageUrl,
          })
          .select()
          .single()
      : await supabase
          .from("menu_items")
          .update({
            name: editItem.name,
            description: editItem.description,
            price: editItem.price,
            image_url: imageUrl,
          })
          .eq("id", editItem.id)
          .select()
          .single();

    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    if (isNewItem) {
      setItems((prev) => [...prev, res.data]);
      toast.success("Item created");
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === res.data.id ? res.data : i)),
      );
      toast.success("Item updated");
    }

    setEditItem(null);
    setFile(null);
    setIsNewItem(false);
  };

  const getItemsByCategory = (id: number) =>
    items.filter((i) => Number(i.category_id) === Number(id));

  const getImageUrl = (value: string | null): string | undefined => {
    if (!value) return undefined;

    console.log("IMAGE VALUE:", value);

    return value;
  };

  const [deleteCategoryOpen, setDeleteCategoryOpen] = React.useState(false);
  const [deleteCategory, setDeleteCategory] = React.useState<Category | null>(
    null,
  );

  const deleteCategoryRow = async () => {
    if (!deleteCategory) return;

    const { error } = await supabase
      .from("menu_categories")
      .delete()
      .eq("id", deleteCategory.id);

    if (error) {
      console.error("DELETE CATEGORY ERROR:", error);
      toast.error(error.message || "Delete failed");
      return;
    }

    setCategories((prev) => prev.filter((c) => c.id !== deleteCategory.id));

    toast.success("Category deleted");

    setDeleteCategoryOpen(false);
    setDeleteCategory(null);
  };

  

  /* ================= UI ================= */
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
          "--header-height": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-col">
        <SiteHeader />

        <main className="flex-1 overflow-y-auto bg-muted/20 p-6 space-y-6">
          {/* EMPTY STATE */}
          {!loading && categories.length === 0 && (
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">No categories found</p>
              <Button
                onClick={() => {
                  setEditCategory({ id: 0, name: "", image_url: "" });
                  setIsNewCategory(true);
                }}
              >
                + Add Category
              </Button>
            </div>
          )}

          {/* PAGE ACTIONS */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Menu Management</h1>

            <Button
              onClick={() => {
                setEditCategory({
                  id: 0,
                  name: "",
                  image_url: "",
                });
                setFile(null);
                setIsNewCategory(true);
              }}
            >
              + Add Category
            </Button>
          </div>

          {/* CATEGORY STRIP WITH IMAGE */}
          <div className="flex gap-4 overflow-x-auto">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="min-w-[160px] border rounded-xl overflow-hidden"
              >
                {cat.image_url ? (
                  <img
                    src={getImageUrl(cat.image_url)}
                    className="w-full h-40 object-cover"
                    alt={cat.name}
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-2 text-center">
                  <h3 className="font-semibold text-sm">{cat.name}</h3>
                </div>

                <div className="mt-3 flex gap-2 px-2 pb-3">
                  {" "}
                  <Button
                    size="sm"
                    className="flex-1 gap-2 bg-white/5 text-white border border-white/10 hover:bg-blue-500/10 hover:border-blue-400/30 hover:text-blue-300 transition-all duration-200"
                    onClick={() => {
                      setEditCategory(cat);
                      setIsNewCategory(false);
                    }}
                  >
                    {" "}
                    Edit{" "}
                  </Button>{" "}
                  <Button
                    size="sm"
                    className="flex-1 gap-2 bg-white/5 text-white border border-white/10 hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-300 transition-all duration-200"
                    onClick={() => {
                      setDeleteCategory(cat);
                      setDeleteCategoryOpen(true);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </Button>{" "}
                </div>
              </div>
            ))}
          </div>

          {/* ITEMS */}
          <div className="space-y-10">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                {/* CATEGORY TITLE WITH SMALL IMAGE */}
                <h2 className="text-xl font-bold uppercase flex items-center gap-3">
                  {cat.image_url && (
                    <img
                      src={getImageUrl(cat.image_url)}
                      className="w-30 h-30 rounded object-cover"
                      alt={cat.name}
                      onError={(e) => {
                        console.log("BROKEN SMALL IMAGE:", cat.image_url);
                      }}
                    />
                  )}
                  {cat.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {getItemsByCategory(cat.id).map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg overflow-hidden w-full max-w-[220px]"
                    >
                      {/* IMAGE (smaller height) */}
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          className="object-cover"
                          alt={item.name}
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                          No Image
                        </div>
                      )}

                      {/* CONTENT */}
                      <div className="p-2 space-y-1">
                        <h3 className="font-medium text-sm truncate">
                          {item.name}
                        </h3>

                        {item.description && (
                          <p className="text-[11px] text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        <p className="text-sm font-semibold">
                          Nu. {item.price}
                        </p>

                        <div className="mt-3 flex gap-2 px-2 pb-3">
                          {" "}
                          <Button
                            size="sm"
                            className="flex-1 gap-2 bg-white/5 text-white border border-white/10 hover:bg-blue-500/10 hover:border-blue-400/30 hover:text-blue-300 transition-all duration-200"
                            onClick={() => {
                              setEditCategory(cat);
                              setIsNewCategory(false);
                            }}
                          >
                            {" "}
                            Edit{" "}
                          </Button>{" "}
                          <Button
                            size="sm"
                            className="flex-1 gap-2 bg-white/5 text-white border border-white/10 hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-300 transition-all duration-200"
                            onClick={() => {
                              setDeleteCategory(cat);
                              setDeleteCategoryOpen(true);
                            }}
                          >
                            {" "}
                            Delete{" "}
                          </Button>{" "}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditItem({
                        id: 0,
                        name: "",
                        description: "",
                        price: "",
                        category_id: cat.id,
                        image_url: "",
                      });
                      setFile(null); // IMPORTANT
                      setIsNewItem(true);
                    }}
                  >
                    + Add Item
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>

      {/* CATEGORY MODAL */}
      <Dialog open={!!editCategory} onOpenChange={() => setEditCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Category</DialogTitle>
            <DialogDescription>Manage category</DialogDescription>
          </DialogHeader>

          {editCategory && (
            <div className="space-y-3">
              {editCategory.image_url && (
                <img
                  src={editCategory.image_url}
                  alt={editCategory.name}
                  className="w-45 rounded-md align-center"
                />
              )}

              <Input
                value={editCategory.name}
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory,
                    name: e.target.value,
                  })
                }
              />

              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <Button onClick={saveCategory}>Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE */}

      <AlertDialog
        open={deleteCategoryOpen}
        onOpenChange={setDeleteCategoryOpen}
      >
        <AlertDialogContent className="border-white/10 bg-zinc-950 text-white">
          <AlertDialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
              <IconAlertTriangle className="size-6 text-red-500" />
            </div>

            <AlertDialogTitle className="text-xl">
              {deleteCategory?.name || "Delete Category"}
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm text-white/60">
              Are you sure you want to delete this category?
              <br />
              <br />
              <span className="font-medium text-white">
                This will permanently remove it.
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
              onClick={deleteCategoryRow}
              className="hover:bg-red-700"
              variant="destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ITEM MODAL */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item</DialogTitle>
            <DialogDescription>Manage item</DialogDescription>
          </DialogHeader>

          {editItem && (
            <div className="space-y-3">
              <Input
                placeholder="Name"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />

              <Textarea
                placeholder="Description"
                value={editItem.description ?? ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
              />

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  Nu.
                </span>

                <Input
                  placeholder="0.00"
                  className="pl-12"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      price:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                />
              </div>

              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <Button onClick={saveItem}>Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
