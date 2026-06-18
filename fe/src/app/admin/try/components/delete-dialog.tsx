"use client";

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

type Props = {
  deleteCategoryOpen: boolean;
  setDeleteCategoryOpen: any;

  deleteCategory: any;

  deleteCategoryRow: () => void;
};

export function DeleteDialog({
  deleteCategoryOpen,
  setDeleteCategoryOpen,
  deleteCategory,
  deleteCategoryRow,
}: Props) {
  return (
    <AlertDialog
      open={deleteCategoryOpen}
      onOpenChange={
        setDeleteCategoryOpen
      }
    >
      <AlertDialogContent className="border-white/10 bg-zinc-950 text-white">
        <AlertDialogHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
            <IconAlertTriangle className="size-6 text-red-500" />
          </div>

          <AlertDialogTitle>
            {deleteCategory?.name}
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            delete this category?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={deleteCategoryRow}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}