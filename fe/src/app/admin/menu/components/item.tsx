"use client";

import { Button } from "@/components/ui/button";
import { Category, MenuItem } from "../types";

type Props = {
  categories: Category[];
  items: MenuItem[];
  onEditItem: (item: MenuItem) => void;
  onAddItem: (categoryId: number) => void;
};

export function ItemSection({
  categories,
  items,
  onEditItem,
  onAddItem,
}: Props) {
  const getItemsByCategory = (id: number) =>
    items.filter(
      (item) =>
        Number(item.category_id) === Number(id)
    );

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold uppercase flex items-center gap-3">
            {cat.image_url && (
              <img
                src={cat.image_url}
                className="w-30 h-30 rounded object-cover"
                alt={cat.name}
              />
            )}

            {cat.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getItemsByCategory(cat.id).map(
              (item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4"
                >
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p>
                    Nu. {item.price}
                  </p>

                  <Button
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() =>
                      onEditItem(item)
                    }
                  >
                    Edit
                  </Button>
                </div>
              )
            )}

            <Button
              variant="outline"
              onClick={() =>
                onAddItem(cat.id)
              }
            >
              + Add Item
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}