import { Category } from "../types";
import { CategoryCard } from "./category-card";

type Props = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoryStrip(props: Props) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {props.categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
}