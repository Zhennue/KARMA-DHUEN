"use client";

import * as React from "react";
import { toast } from "sonner";

import { Category, MenuItem } from "../types";
import { menuService } from "../lib/menu-service";
import { createClient } from "@/utils/supabase/client";

import { removeBackground } from "@/lib/image/remove-bg";
import { convertToWebP } from "@/lib/image/convert-to-webp";

const supabase = createClient();

export function useMenu() {
  /* ---------------- STATE ---------------- */

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [items, setItems] = React.useState<MenuItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [file, setFile] = React.useState<File | null>(null);

  const [editCategory, setEditCategory] = React.useState<Category | null>(null);
  const [editItem, setEditItem] = React.useState<MenuItem | null>(null);

  const [isNewCategory, setIsNewCategory] = React.useState(false);
  const [isNewItem, setIsNewItem] = React.useState(false);

  /* ---------------- DELETE STATE ---------------- */

  const [deleteCategory, setDeleteCategory] = React.useState<Category | null>(
    null,
  );
  const [deleteCategoryOpen, setDeleteCategoryOpen] = React.useState(false);

  const [deleteItem, setDeleteItem] = React.useState<MenuItem | null>(null);
  const [deleteItemOpen, setDeleteItemOpen] = React.useState(false);

  /* ---------------- LOAD ---------------- */

  const load = async () => {
    setLoading(true);

    const [
      { data: catData, error: catErr },
      { data: itemData, error: itemErr },
    ] = await Promise.all([
      menuService.getCategories(),
      menuService.getItems(),
    ]);

    if (catErr) toast.error(catErr.message);
    if (itemErr) toast.error(itemErr.message);

    setCategories(catData ?? []);
    setItems(itemData ?? []);
    setLoading(false);
  };

  const openDeleteItem = (item: MenuItem) => {
    setDeleteItem(item);
    setDeleteItemOpen(true);
  };

  React.useEffect(() => {
    load();
  }, []);

  /* ---------------- STORAGE DELETE (NEW) ---------------- */

  const deleteFromStorage = async (url: string, bucket: string) => {
    try {
      if (!url) return;

      const path = url.split(`/storage/v1/object/public/${bucket}/`)[1];

      if (!path) return;

      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) {
        console.error("Storage delete error:", error.message);
      }
    } catch (err) {
      console.error("Storage delete failed:", err);
    }
  };

  /* ---------------- IMAGE PIPELINE ---------------- */

  const uploadImage = async (
    file: File,
    bucket: "menu_categories" | "menu_items",
  ) => {
    try {
      toast.loading("Processing image...", { id: "upload-image" });

      let processedFile: File = file;

      const clean = await removeBackground(file);

      if (clean) {
        processedFile = new File([clean], file.name, {
          type: "image/png",
        });
      }

      const webpFile = await convertToWebP(processedFile, 0.85);
      const fileName = `${Date.now()}.webp`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, webpFile, {
          contentType: "image/webp",
        });

      if (error) {
        toast.error(error.message, { id: "upload-image" });
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      toast.success("Image uploaded", { id: "upload-image" });

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error(err);
      toast.error("Image processing failed", { id: "upload-image" });
      return null;
    }
  };

  /* ---------------- CATEGORY ---------------- */

  const saveCategory = async () => {
    if (!editCategory) return;

    try {
      setLoading(true);

      let imageUrl = editCategory.image_url;

      if (file) {
        const uploaded = await uploadImage(file, "menu_categories");
        if (!uploaded) return;
        imageUrl = uploaded;
      }

      const res = isNewCategory
        ? await menuService.createCategory({
            name: editCategory.name,
            image_url: imageUrl,
          })
        : await menuService.updateCategory(editCategory.id, {
            name: editCategory.name,
            image_url: imageUrl,
          });

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      if (isNewCategory) {
        setCategories((p) => [...p, res.data]);
        toast.success("Category created");
      } else {
        setCategories((p) =>
          p.map((c) => (c.id === res.data.id ? res.data : c)),
        );
        toast.success("Category updated");
      }

      setEditCategory(null);
      setFile(null);
      setIsNewCategory(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE CATEGORY (FIXED) ---------------- */

  const deleteCategoryRow = async () => {
    if (!deleteCategory) return;

    // delete image from storage
    if (deleteCategory.image_url) {
      await deleteFromStorage(deleteCategory.image_url, "menu_categories");
    }

    const { error } = await menuService.deleteCategory(deleteCategory.id);

    if (error) return toast.error(error.message);

    setCategories((p) => p.filter((c) => c.id !== deleteCategory.id));

    toast.success("Category deleted");

    setDeleteCategory(null);
    setDeleteCategoryOpen(false);
  };

  const openDeleteCategory = (cat: Category) => {
    setDeleteCategory(cat);
    setDeleteCategoryOpen(true);
  };

  /* ---------------- ITEM ---------------- */

  const saveItem = async () => {
    if (!editItem) return;

    let imageUrl = editItem.image_url;

    if (file) {
      const uploaded = await uploadImage(file, "menu_items");
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    const res = isNewItem
      ? await menuService.createItem({
          name: editItem.name,
          description: editItem.description,
          price: editItem.price,
          category_id: editItem.category_id,
          image_url: imageUrl,
        })
      : await menuService.updateItem(editItem.id, {
          name: editItem.name,
          description: editItem.description,
          price: editItem.price,
          image_url: imageUrl,
        });

    if (res.error) return toast.error(res.error.message);

    if (isNewItem) {
      setItems((p) => [...p, res.data]);
      toast.success("Item created");
    } else {
      setItems((p) => p.map((i) => (i.id === res.data.id ? res.data : i)));
      toast.success("Item updated");
    }

    setEditItem(null);
    setFile(null);
    setIsNewItem(false);
  };

  /* ---------------- DELETE ITEM (FIXED) ---------------- */

  const deleteItemRow = async () => {
    if (!deleteItem) return;

    // delete image from storage
    if (deleteItem.image_url) {
      await deleteFromStorage(deleteItem.image_url, "menu_items");
    }

    const { error } = await menuService.deleteItem(deleteItem.id);

    if (error) return toast.error(error.message);

    setItems((p) => p.filter((i) => i.id !== deleteItem.id));

    toast.success("Item deleted");

    setDeleteItem(null);
    setDeleteItemOpen(false);
  };

  /* ---------------- MODALS ---------------- */

  const openCreateCategory = () => {
    setEditCategory({ id: 0, name: "", image_url: "" });
    setIsNewCategory(true);
  };

  const openEditCategory = (cat: Category) => {
    setEditCategory(cat);
    setIsNewCategory(false);
  };

  const openCreateItem = (categoryId: number) => {
    setEditItem({
      id: 0,
      name: "",
      description: "",
      price: 0,
      category_id: categoryId,
      image_url: "",
    });
    setIsNewItem(true);
  };

  const openEditItem = (item: MenuItem) => {
    setEditItem(item);
    setIsNewItem(false);
  };

  /* ---------------- RETURN ---------------- */

  return {
    loading,
    categories,
    items,

    file,
    setFile,

    editCategory,
    setEditCategory,

    editItem,
    setEditItem,

    deleteCategory,
    deleteCategoryOpen,
    setDeleteCategoryOpen,
    deleteCategoryRow,

    deleteItem,
    deleteItemOpen,
    setDeleteItemOpen,
    deleteItemRow,

    setDeleteItem,

    saveCategory,
    saveItem,

    openCreateCategory,
    openEditCategory,
    openCreateItem,
    openEditItem,

    reload: load,

    openDeleteItem,
    openDeleteCategory,
  };
}
