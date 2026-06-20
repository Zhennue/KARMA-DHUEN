import { Category } from "../types";
import { CategoryCard } from "./category-card";

type Props = {
  categories: Category[];

  selectedCategory: number | null;
  onSelect: (categoryId: number) => void;

  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoryStrip({
  categories,
  selectedCategory,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 hide-scrollbar">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;

        return (
          <div
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              shrink-0 rounded-2xl transition
              ${isActive ? "bg-white shadow-lg" : "bg-transparent"}
              p-1
            `}
          >
            <CategoryCard
              category={cat}
              onEdit={onEdit}
              onDelete={onDelete}
              active={isActive}
            />
          </div>
        );
      })}
    </div>
  );
}
