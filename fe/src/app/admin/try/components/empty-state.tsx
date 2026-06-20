"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onAddCategory: () => void;
};

export function EmptyState({ onAddCategory }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-16 text-center space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Plus className="h-5 w-5 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold">No categories yet</h2>

      <p className="text-sm text-muted-foreground max-w-md">
        Start building your menu by creating your first category.
      </p>

      <Button onClick={onAddCategory}>Add Category</Button>
    </div>
  );
}
