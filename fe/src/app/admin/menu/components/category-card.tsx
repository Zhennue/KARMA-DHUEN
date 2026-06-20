import { Button } from "@/components/ui/button";
import { Category } from "../types";

type Props = {
  category: Category;
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
  active?: boolean;
};

export function CategoryCard({ category, onEdit, onDelete, active }: Props) {
  return (
    <div
      className={`
        group w-40 overflow-hidden rounded border bg-card
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        ${active ? "ring-primary" : ""}
      `}
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={category.image_url || ""}
          alt={category.name}
          className="
            h-28 w-full object-contain
            transition-transform duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{category.name}</h3>

        <div className="mt-2 flex gap-2">
          <Button
            size="sm"
            className="flex-1 text-xs h-7"
            onClick={() => onEdit(category)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="flex-1 text-xs h-7"
            onClick={() => onDelete(category)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
