import { Button } from "@/components/ui/button";

type Props = {
  onAddCategory: () => void;
};

export function PageHeader({ onAddCategory }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Menu Management</h1>

        <p className="text-muted-foreground">
          Manage categories and menu items
        </p>
      </div>

      <Button onClick={onAddCategory}>Add Category</Button>
    </div>
  );
}
