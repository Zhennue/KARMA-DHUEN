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
  const cat = categories[0];
  if (!cat) return null;

  const categoryItems = items.filter(
    (i) => Number(i.category_id) === Number(cat.id),
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 py-2">
        <div className="h-px flex-1 bg-white/10" />

        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {cat.name}
        </h2>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categoryItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
          />
        ))}

        <Button
          variant="outline"
          className="h-full min-h-[120px] text-sm rounded"
          onClick={() => onCreateItem(cat.id)}
        >
          + Add Item
        </Button>
      </div>

      {categoryItems.length === 0 && (
        <div className="text-center py-6 text-sm text-muted-foreground">
          No items in this category.
        </div>
      )}
    </div>
  );
}
