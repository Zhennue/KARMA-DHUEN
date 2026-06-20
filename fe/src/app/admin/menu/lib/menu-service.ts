import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const menuService = {
  /* ---------------- CATEGORIES ---------------- */

  getCategories: async () => supabase.from("menu_categories").select("*"),

  createCategory: async (data: any) =>
    supabase.from("menu_categories").insert(data).select().single(),

  updateCategory: async (id: number, data: any) =>
    supabase
      .from("menu_categories")
      .update(data)
      .eq("id", id)
      .select()
      .single(),

  deleteCategory: async (id: number) =>
    supabase.from("menu_categories").delete().eq("id", id),

  /* ---------------- ITEMS ---------------- */

  getItems: async () => supabase.from("menu_items").select("*"),

  createItem: async (data: any) =>
    supabase.from("menu_items").insert(data).select().single(),

  updateItem: async (id: number, data: any) =>
    supabase.from("menu_items").update(data).eq("id", id).select().single(),

  deleteItem: async (id: number) =>
    supabase.from("menu_items").delete().eq("id", id),
};
