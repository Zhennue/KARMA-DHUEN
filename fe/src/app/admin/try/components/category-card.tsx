import { Button } from "@/components/ui/button";
import { Category } from "../types";

type Props = {
  category: Category;
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
};

export function CategoryCard({ category, onEdit, onDelete }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card">
      <img
        src={category.image_url || ""}
        alt={category.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{category.name}</h3>

        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onEdit(category)}>
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="flex-1"
            onClick={() => onDelete(category)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
