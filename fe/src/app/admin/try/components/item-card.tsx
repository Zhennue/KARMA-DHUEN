import { Button } from "@/components/ui/button";
import { MenuItem } from "../types";

type Props = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
};

export function ItemCard({ item, onEdit, onDelete = () => {}, }: Props) {
  return (
    <div className="group overflow-hidden rounded border bg-card transition">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image_url || ""}
          alt={item.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="font-semibold">{item.name}</h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>

        <span className="font-bold">Nu. {item.price}</span>

        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onEdit(item)}>
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="flex-1"
            onClick={() => onDelete(item)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
