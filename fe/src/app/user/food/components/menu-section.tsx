import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { type FoodMenuSection } from "./menu-data";

// 1. Extend your existing type to cleanly handle the click prop
interface MenuSectionProps extends FoodMenuSection {
  onSelectItem: (item: FoodMenuSection["items"][number]) => void;
}

export function MenuSection({
  id,
  title,
  items,
  onSelectItem,
}: MenuSectionProps) {
  const isCuisineSection = id === "cuisine";

  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      {/* SECTION TITLE */}
      <div className="flex w-full items-center gap-3 sm:gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/20" />

        <h2 className="shrink-0 text-center text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground sm:text-base sm:tracking-[0.42em]">
          {title}
        </h2>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/20" />
      </div>

      {/* CUISINE SECTION */}
      {isCuisineSection ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <Card
              key={item.name}
              onClick={() => onSelectItem(item)}
              // Added cursor-pointer for UX clarity
              className="cursor-pointer overflow-hidden p-0 rounded border border-0 bg-[#17100d] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c9723f]/55 hover:bg-[#20120e]"
            >
              {/* IMAGE */}
              <div className="relative h-30 w-full overflow-hidden">
                <Image
                  src={item.image ?? "/bg.png"}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* CONTENT */}
              <CardContent className="space-y-2 px-4 py-4">
                <CardTitle className="leading-none text-sm font-semibold md:text-base">
                  {item.name}
                </CardTitle>

                <Badge className="w-fit rounded-full border border-[#c9723f]/35 bg-[#c9723f]/12 px-3 py-1 text-xs text-white hover:bg-[#c9723f]/18">
                  {item.price}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* NORMAL MENU SECTION */
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.name}
              onClick={() => onSelectItem(item)} // 2. Connected onClick here too so regular items open up the screen
              className="cursor-pointer border-[#c9723f]/35 bg-[#17100d] text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#c9723f]/55 hover:bg-[#20120e]"
            >
              <CardHeader className="flex flex-row items-center justify-between gap-3 p-3.5 md:p-4">
                <CardTitle className="text-base font-semibold tracking-tight md:text-lg">
                  {item.name}
                </CardTitle>

                <Badge className="shrink-0 border-[#c9723f]/35 bg-[#c9723f]/12 text-[0.65rem] text-white hover:bg-[#c9723f]/18 md:text-xs">
                  {item.price}
                </Badge>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
