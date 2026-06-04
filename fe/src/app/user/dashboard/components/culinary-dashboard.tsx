"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  ChevronRight,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/lib/utils";

type Mode = "food" | "drinks";

const dashboardData: Record<
  Mode,
  {
    label: string;
    eyebrow: string;
    title: string;
    description: string;
    accent: string;
    summary: Array<{ label: string; value: string }>;
    highlights: Array<{ title: string; tag: string }>;
  }
> = {
  food: {
    label: "Food",
    eyebrow: "Tonight's dining focus",
    title: "Warm plates. Bright energy. Clean execution.",
    description:
      "A simple board for today's menu with the best picks up front.",
    accent: "from-[#ffb36b] via-[#ff8f5c] to-[#d94d4d]",
    summary: [
      { label: "Seasonal dishes", value: "12" },
      { label: "Guest rating", value: "4.9" },
      { label: "Repeat rate", value: "92%" },
    ],
    highlights: [
      { title: "Citrus salmon bowl", tag: "Chef pick" },
      { title: "Wood-fired flatbread", tag: "Shared plate" },
      { title: "Cocoa tahini tart", tag: "Dessert" },
    ],
  },
  drinks: {
    label: "Drinks",
    eyebrow: "Bar and cafe rhythm",
    title: "Bright pours. Fast service. A little sparkle.",
    description: "A compact drinks view with the best pours and quick wins.",
    accent: "from-[#7dd3fc] via-[#38bdf8] to-[#0f766e]",
    summary: [
      { label: "Signature pours", value: "10" },
      { label: "Bottle health", value: "98%" },
      { label: "Guest delight", value: "4.8" },
    ],
    highlights: [
      { title: "Blood orange spritz", tag: "Best seller" },
      { title: "Cold brew tonic", tag: "Signature" },
      { title: "Vanilla oat latte", tag: "Comfort pour" },
    ],
  },
};

const modes: Array<{ key: Mode; label: string; icon: React.ReactNode }> = [
  {
    key: "food",
    label: "Food",
    icon: <UtensilsCrossed className="size-4" aria-hidden="true" />,
  },
  {
    key: "drinks",
    label: "Drinks",
    icon: <Wine className="size-4" aria-hidden="true" />,
  },
];

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-2.5 backdrop-blur-sm sm:rounded-3xl sm:px-4 sm:py-3">
      <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {value}
      </div>
      <div className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/55 sm:text-xs sm:tracking-[0.24em]">
        {label}
      </div>
    </div>
  );
}

export function CulinaryDashboard() {
  const [mode, setMode] = React.useState<Mode>("food");

  const current = dashboardData[mode];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07080c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,183,77,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(79,209,197,0.18),_transparent_26%),linear-gradient(180deg,_#0c1018_0%,_#07080c_52%,_#050608_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="absolute left-[-8rem] top-24 hidden h-72 w-72 rounded-full bg-[#ff8f5c]/20 blur-3xl animate-soft-float sm:block" />
      <div className="absolute right-[-4rem] top-40 hidden h-64 w-64 rounded-full bg-[#38bdf8]/20 blur-3xl animate-soft-float [animation-delay:1.4s] sm:block" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-3 animate-rise-in sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm sm:size-12">
              <ChefHat className="size-5 sm:size-6" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[0.62rem] uppercase tracking-[0.28em] text-white/50 sm:text-sm sm:tracking-[0.32em]">
                Karma Dhuen
              </div>
              <div className="text-base font-medium text-white/90 sm:text-lg">
                Simple food and drinks board
              </div>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/75 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
            <Sparkles
              className="size-3.5 text-amber-300 sm:size-4"
              aria-hidden="true"
            />
            Live service mode
          </div>
        </header>

        <nav
          className="mt-4 flex items-center gap-2 text-[0.7rem] text-white/55 animate-rise-in sm:text-sm"
          aria-label="Breadcrumb"
          style={{ animationDelay: "80ms" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-2.5 py-1 backdrop-blur-sm transition-colors hover:bg-white/10 sm:px-3"
          >
            <span className="size-1.5 rounded-full bg-white/45" />
            Home
          </Link>
          <ChevronRight className="size-3.5 text-white/30" aria-hidden="true" />
          <span>Dashboard</span>
          <ChevronRight className="size-3.5 text-white/30" aria-hidden="true" />
          <span className="text-white/80">{current.label}</span>
        </nav>

        <section className="mt-4 flex flex-1 flex-col gap-4 sm:mt-5 sm:gap-6">
          <div className="space-y-4 sm:space-y-5">
            <div
              className="inline-flex max-w-full animate-rise-in items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.72rem] text-white/70 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
              style={{ animationDelay: "120ms" }}
            >
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)] sm:size-2" />
              {current.eyebrow}
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1
                className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl animate-rise-in"
                style={{ animationDelay: "220ms" }}
              >
                {current.title}
              </h1>
              <p
                className="max-w-2xl text-sm leading-6 text-white/68 sm:text-base sm:leading-7 animate-rise-in"
                style={{ animationDelay: "320ms" }}
              >
                {current.description}
              </p>
            </div>

            <div
              className="grid grid-cols-1 gap-2.5 animate-rise-in sm:flex sm:flex-wrap sm:gap-3"
              style={{ animationDelay: "420ms" }}
            >
              {modes.map((item) => {
                const active = item.key === mode;

                return (
                  <Button
                    key={item.key}
                    type="button"
                    variant={active ? "default" : "outline"}
                    size="default"
                    onClick={() => setMode(item.key)}
                    className={cn(
                      "w-full justify-center rounded-full px-4 py-2 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-5",
                      active
                        ? `bg-gradient-to-r ${current.accent} text-white hover:brightness-105`
                        : "border-white/10 bg-white/6 text-white/80 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <span className="scale-90 sm:scale-100">{item.icon}</span>
                    {item.label}
                  </Button>
                );
              })}

              <Button
                type="button"
                variant="ghost"
                size="default"
                className="w-full justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/75 hover:bg-white/10 hover:text-white sm:w-auto sm:px-5"
              >
                Order now
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Button>
            </div>

            <div
              className="grid gap-2.5 animate-rise-in sm:grid-cols-3 sm:gap-3"
              style={{ animationDelay: "520ms" }}
            >
              {current.summary.map((item) => (
                <StatCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            <div className="grid gap-3 pt-1 sm:grid-cols-3 sm:gap-4">
              {current.highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left shadow-lg shadow-black/15 backdrop-blur-sm animate-rise-in"
                  style={{ animationDelay: `${index * 80 + 620}ms` }}
                >
                  <Badge
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/8 px-2.5 py-0.5 text-[0.65rem] text-white/70"
                  >
                    {item.tag}
                  </Badge>
                  <div className="mt-3 text-sm font-medium text-white">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
