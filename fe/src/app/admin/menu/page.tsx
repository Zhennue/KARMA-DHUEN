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
      console.error(res.error);
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
                    className="w-45 h-40 rounded object-cover"
                    alt={cat.name}
                    onError={(e) => {
                      console.log("BROKEN SMALL IMAGE:", cat.image_url);
                    }}
                  />
                ) : (
                  <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-3 text-center font-medium">{cat.name}</div>

                <Button
                  size="sm"
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setEditCategory(cat);
                    setIsNewCategory(false);
                  }}
                >
                  Edit
                </Button>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getItemsByCategory(cat.id).map((item) => (
                    <div key={item.id} className="border rounded-xl p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>Nu. {item.price}</p>

                      <Button
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => {
                          setEditItem(item);
                          setIsNewItem(false);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditItem({
                        id: 0,
                        name: "",
                        description: "",
                        price: 0,
                        category_id: cat.id,
                        image_url: "",
                      });
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
              <Input
                value={editCategory.name}
                onChange={(e) =>
                  setEditCategory({ ...editCategory, name: e.target.value })
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

              <Input
                placeholder="Price"
                value={editItem.price}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    price: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
              />

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
