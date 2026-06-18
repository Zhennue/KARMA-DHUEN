"use client";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useMenu } from "./hooks/use-menu";

import { PageHeader } from "./components/page-header";
import { CategoryStrip } from "./components/category-strip";
import { CategorySection } from "./components/category-section";
import { CategoryDialog } from "./components/category-dialog";
import { ItemDialog } from "./components/item-dialog";
import { DeleteDialog } from "./components/delete-dialog";

export default function Page() {
  const menu = useMenu();

  const isEmpty = menu.categories.length === 0;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex-1 overflow-y-auto bg-muted/20 p-6 space-y-6">
          <PageHeader onAddCategory={menu.openCreateCategory} />

          {/* CATEGORY STRIP */}
          <CategoryStrip
            categories={menu.categories}
            onEdit={menu.openEditCategory}
            onDelete={menu.openDeleteCategory}
          />

          {/* EMPTY STATE */}
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-16 text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>

              <h2 className="text-xl font-semibold">No categories yet</h2>

              <p className="text-sm text-muted-foreground max-w-md">
                Start building your menu by creating your first category.
              </p>

              <Button onClick={menu.openCreateCategory}>Add Category</Button>
            </div>
          ) : (
            /* CATEGORY SECTION */
            <CategorySection
              categories={menu.categories}
              items={menu.items}
              onEditItem={menu.openEditItem}
              onCreateItem={menu.openCreateItem}
              onDeleteItem={menu.openDeleteItem}
            />
          )}
        </main>
      </SidebarInset>

      {/* CATEGORY MODAL */}
      <CategoryDialog
        editCategory={menu.editCategory}
        setEditCategory={menu.setEditCategory}
        file={menu.file}
        setFile={menu.setFile}
        saveCategory={menu.saveCategory}
      />

      {/* ITEM MODAL */}
      <ItemDialog
        editItem={menu.editItem}
        setEditItem={menu.setEditItem}
        file={menu.file}
        setFile={menu.setFile}
        saveItem={menu.saveItem}
      />

      {/* CATEGORY DELETE */}
      <DeleteDialog
        deleteCategoryOpen={menu.deleteCategoryOpen}
        setDeleteCategoryOpen={menu.setDeleteCategoryOpen}
        deleteCategory={menu.deleteCategory}
        deleteCategoryRow={menu.deleteCategoryRow}
      />
    </SidebarProvider>
  );
}
