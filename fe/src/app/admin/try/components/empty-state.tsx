import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  title?: string;
  description?: string;

  actionLabel?: string;
  onAction?: () => void;

  showAction?: boolean;
};

export function EmptyState({
  title = "No data found",
  description = "There is nothing here yet. Start by adding your first item.",
  actionLabel = "Add New",
  onAction,
  showAction = true,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center space-y-4">
      {/* ICON */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Plus className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>

      {/* ACTION BUTTON */}
      {showAction && onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
