import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";

const sections = [
  {
    label: "Signature Sips",
    href: "#signature-sips",
    image: "/bg.png",
    caption: "Our featured picks",
  },
  {
    label: "Hot Beverages",
    href: "#hot-beverages",
    image: "/bg.png",
    caption: "Warm and comforting",
  },
  {
    label: "Fresh Juices",
    href: "#fresh-juices",
    image: "/bg.png",
    caption: "Freshly blended",
  },
  {
    label: "Iced Drinks",
    href: "#iced-drinks",
    image: "/bg.png",
    caption: "Cool refreshers",
  },
  {
    label: "Milkshakes",
    href: "#milkshakes",
    image: "/bg.png",
    caption: "Creamy specials",
  },
  {
    label: "Mocktails",
    href: "#mocktails",
    image: "/bg.png",
    caption: "Bright and layered",
  },
];

export function DrinksHero() {
  return (
    <section className="space-y-4">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {sections.map((section) => (
          <Card
            key={section.label}
            className="min-w-44 shrink-0 overflow-hidden border-white/10 bg-black/35 text-white shadow-xl shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-black/45"
          >
            <a href={section.href} className="block">
              <div className="relative aspect-[1.55/1] overflow-hidden bg-white/5">
                <Image
                  src={section.image}
                  alt={section.label}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    {section.caption}
                  </div>
                  <div className="mt-1 text-sm font-black tracking-tight">
                    {section.label}
                  </div>
                </div>
              </div>
            </a>
          </Card>
        ))}
      </div>

      <Card className="border-[#363a3f]/55 bg-[#141519] text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Badge className="border-[#363a3f]/55 bg-white/10 text-[10px] uppercase tracking-[0.22em] text-white hover:bg-white/15">
                Drinks Menu
              </Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                  Cool, warm, and sparkling drinks.
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-white/72 md:text-base">
                  A clean shadcn-only drinks page with the same rhythm as the
                  Food experience, tuned for bright, refreshing menu browsing.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[22rem]">
              <div className="rounded-2xl border border-[#363a3f]/50 bg-white/5 px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Best Seller
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Berry Fizz
                </div>
              </div>
              <div className="rounded-2xl border border-[#363a3f]/50 bg-white/5 px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Fresh
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Mixed Fruit Juice
                </div>
              </div>
              <div className="rounded-2xl border border-[#363a3f]/50 bg-white/5 px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Warm
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Hot Coffee
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Search drinks, flavors, or specials"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/45"
            />
            <Button className="bg-[#363a3f] text-white hover:bg-[#2d3136] sm:min-w-36">
              Browse Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
