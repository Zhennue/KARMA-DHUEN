import { Button } from "@/components/ui/button";
import { Category, MenuItem } from "../types";
import { ItemCard } from "./item-card";

type Props = {
  categories: Category[];
  items: MenuItem[];

  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (item: MenuItem) => void; 

  onCreateItem: (categoryId: number) => void;
};

export function CategorySection({
  categories,
  items,
  onEditItem,
  onDeleteItem,
  onCreateItem,
}: Props) {
  return (
    <div className="space-y-10">
      {categories.map((cat) => {
        const categoryItems = items.filter(
          (i) => Number(i.category_id) === Number(cat.id),
        );

        return (
          <div key={cat.id} className="space-y-4">
            {/* CATEGORY TITLE */}
            <div className="relative py-4">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/60" />

                <div className="px-4">
                  <h2 className="text-2xl font-bold uppercase tracking-[0.25em]">
                    {cat.name}
                  </h2>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/60" />
              </div>
            </div>

            {/* ITEMS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {categoryItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem} 
                />
              ))}
              

              <Button variant="outline" onClick={() => onCreateItem(cat.id)}>
                + Add Item
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
