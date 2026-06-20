"use client";

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

type Props = {
  editItem: any;
  setEditItem: any;

  file: File | null;
  setFile: (file: File | null) => void;

  saveItem: () => void;
};

export function ItemDialog({
  editItem,
  setEditItem,
  file,
  setFile,
  saveItem,
}: Props) {
  return (
    <Dialog
      open={!!editItem}
      onOpenChange={() =>
        setEditItem(null)
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Item
          </DialogTitle>

          <DialogDescription>
            Manage item
          </DialogDescription>
        </DialogHeader>

        {editItem && (
          <div className="space-y-4">
            {editItem.image_url && (
              <img
                src={editItem.image_url}
                alt={editItem.name}
                className="h-48 w-full rounded-lg object-contain"
              />
            )}

            <div>
              <label className="text-sm font-medium ">
                Item Name
              </label>

              <Input
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Description
              </label>

              <Textarea
                rows={4}
                value={
                  editItem.description ?? ""
                }
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    description:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  Nu.
                </span>

                <Input
                  className="pl-12"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      price:
                        e.target.value === ""
                          ? ""
                          : Number(
                              e.target.value
                            ),
                    })
                  }
                />
              </div>
            </div>

            <Input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
            />

            <Button
              className="w-full"
              onClick={saveItem}
            >
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}