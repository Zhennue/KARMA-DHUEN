import { Card } from "@/src/components/ui/card";
import Image from "next/image";

const sections = [
  {
    label: "Cuisine",
    href: "#cuisine",
    image: "/o.png",
  },
  {
    label: "Fast Foods",
    href: "#fast-foods",
    image: "/k.png",
  },
  {
    label: "Noodles",
    href: "#noodles",
    image: "/just.png",
  },
  {
    label: "Hot Drinks",
    href: "#hot-drinks",
    image: "/bg.png",
  },
  {
    label: "Cold Drinks",
    href: "#cold-drinks",
    image: "/bg.png",
  },
  {
    label: "Fresh Juices",
    href: "#fresh-juices",
    image: "/bg.png",
  },
];

export function FoodHero() {
  return (
    <section className="space-y-4 mt-8">
      <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => (
          <div
            key={section.label}
            className="flex shrink-0 flex-col items-center"
          >
            <Card className="h-15 w-24 overflow-hidden rounded-sm border-[#c9723f]/35 bg-[#1a120d] p-0 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#c9723f]/55 hover:bg-[#21140e]">
              <a href={section.href} className="block h-full w-full">
                <div className="relative h-full w-full flex items-center justify-center p-1">
                  <Image
                    src={section.image}
                    alt={section.label}
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
              </a>
            </Card>

            {/* Better title style */}
            <div className="mt-0 rounded px-5 py-[3px] text-[11px] font-medium text-[#f5e6dc] shadow-sm backdrop-blur-sm transition-colors duration-200 group-hover:bg-[#c9723f] group-hover:text-white">
              {section.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
