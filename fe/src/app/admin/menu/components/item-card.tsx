import { Button } from "@/components/ui/button";
import { MenuItem } from "../types";

type Props = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
};

export function ItemCard({ item, onEdit, onDelete = () => {} }: Props) {
  return (
    <div className="group overflow-hidden rounded-md border bg-card transition hover:shadow-sm">
      {/* IMAGE (smaller height) */}
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image_url || ""}
          alt={item.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* CONTENT (tighter) */}
      <div className="space-y-1 p-3">
        <h3 className="text-sm font-semibold truncate">{item.name}</h3>

        <p className="line-clamp-1 text-xs text-muted-foreground">
          {item.description}
        </p>

        <span className="text-sm font-semibold">Nu. {item.price}</span>

        {/* BUTTONS (smaller + compact) */}
        <div className="mt-2 flex gap-2">
          <Button
            size="sm"
            className="h-7 flex-1 text-xs"
            onClick={() => onEdit(item)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="h-7 flex-1 text-xs"
            onClick={() => onDelete(item)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
