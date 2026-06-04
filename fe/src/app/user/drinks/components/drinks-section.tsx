import { Badge } from "@/src/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { type DrinkMenuSection } from "./drinks-data";

export function DrinksSection({
  id,
  title,
  subtitle,
  items,
}: DrinkMenuSection) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
            {title}
          </h2>
          <Badge className="shrink-0 border-white/10 bg-white/10 text-white hover:bg-white/15">
            {items.length} items
          </Badge>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-white/65 md:text-base">
          {subtitle}
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.name}
            className="border-[#363a3f]/55 bg-[#141519] text-white shadow-2xl shadow-black/30 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:border-[#363a3f]/75 hover:bg-[#17191d]"
          >
            <CardHeader className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg font-black tracking-tight md:text-xl">
                  {item.name}
                </CardTitle>
                <Badge className="shrink-0 border-[#363a3f]/55 bg-white/10 text-white hover:bg-white/15">
                  {item.price}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-white/65">{item.note}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
