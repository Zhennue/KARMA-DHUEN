"use client";

import { Button } from "@/components/ui/button";
import { Category } from "../types";

type Props = {
  categories: Category[];
  onEdit: (category: Category) => void;
};

export function CategorySection({
  categories,
  onEdit,
}: Props) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="min-w-[160px] border rounded-xl overflow-hidden"
        >
          {cat.image_url ? (
            <img
              src={cat.image_url}
              alt={cat.name}
              className="w-45 h-40 rounded object-cover"
            />
          ) : (
            <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              No Image
            </div>
          )}

          <div className="p-3 text-center font-medium">
            {cat.name}
          </div>

          <Button
            size="sm"
            className="w-full"
            variant="outline"
            onClick={() => onEdit(cat)}
          >
            Edit
          </Button>
        </div>
      ))}
    </div>
  );
}