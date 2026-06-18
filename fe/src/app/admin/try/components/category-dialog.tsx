"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  editCategory: any;
  setEditCategory: any;

  file: File | null;
  setFile: (file: File | null) => void;

  saveCategory: () => void;
};

export function CategoryDialog({
  editCategory,
  setEditCategory,
  file,
  setFile,
  saveCategory,
}: Props) {
  return (
    <Dialog
      open={!!editCategory}
      onOpenChange={() =>
        setEditCategory(null)
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Category
          </DialogTitle>

          <DialogDescription>
            Manage category
          </DialogDescription>
        </DialogHeader>

        {editCategory && (
          <div className="space-y-3">
            {editCategory.image_url && (
              <img
                src={editCategory.image_url}
                alt={editCategory.name}
                className="w-45 rounded-md"
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
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
            />

            <Button
              onClick={saveCategory}
            >
              Save
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}