"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Flame,
  Check,
  Snowflake,
  Thermometer,
} from "lucide-react";

import { useCart } from "@/src/context/cart-context";
import FlexPage from "@/components/flex-page";

interface MenuItem {
  name: string;
  price: string;
  image?: string;
  description?: string;
}

interface ItemDetailProps {
  item: MenuItem;
  onBack?: () => void;
}

export function ItemDetail({ item, onBack }: ItemDetailProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const numericPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
  const totalPrice = numericPrice * quantity;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddClick = () => {
    addToCart({
      id: Date.now(),
      name: item.name,
      basePrice: item.price,
      quantity,
      spiceLevel,
      specialInstructions,
      totalPrice: `Nu. ${totalPrice}`,
    });

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const spiceOptions = [
    {
      label: "Mild",
      icon: Snowflake,
      base: "border-sky-400/30 text-sky-300",
      active:
        "border-sky-400 bg-sky-500/10 text-white shadow-[0_0_14px_rgba(56,189,248,0.25)]",
      hover: "hover:border-sky-300 hover:text-sky-200",
    },
    {
      label: "Mid",
      icon: Thermometer,
      base: "border-amber-400/30 text-amber-300",
      active:
        "border-amber-400 bg-amber-500/10 text-white shadow-[0_0_14px_rgba(245,158,11,0.25)]",
      hover: "hover:border-amber-300 hover:text-amber-200",
    },
    {
      label: "Zesty",
      icon: Flame,
      base: "border-red-400/30 text-red-300",
      active:
        "border-red-500 bg-red-500/10 text-white shadow-[0_0_14px_rgba(239,68,68,0.25)]",
      hover: "hover:border-red-400 hover:text-red-200",
    },
  ];

  return (
    <FlexPage
      left={
        <>
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* IMAGE */}
          <div className="relative h-60 w-full lg:h-full">
            <Image
              src={item.image ?? "/bg.png"}
              alt={item.name}
              fill
              priority
              className="object-cover object-center rounded-b-lg lg:rounded-l-lg lg:rounded-r-none"
            />
          </div>
        </>
      }
      right={
        <>
          {/* TOP CONTENT */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 mt-2">
            {/* HEADER */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-xl md:text-2xl lg:text-3xl">
                  {item.name}
                </h1>

                <Badge className="shrink-0 rounded-full border border-[#c9723f]/40 bg-[#c9723f]/15 px-3 py-2 text-xs font-semibold text-[#e8915d] sm:px-4 sm:py-2.5 sm:text-sm">
                  {item.price}
                </Badge>
              </div>

              <p className="text-sm leading-6 text-neutral-400 mb-10">
                {item.description}
              </p>
            </div>

            <hr className="border-white/10 mb-5" />

            {/* SPICE LEVEL */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-400">
                <Flame className="h-5 w-5 text-[#c9723f]" />
                <span>Select Spice Level</span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {spiceOptions.map((opt) => {
                  const isSelected = spiceLevel === opt.label;
                  const Icon = opt.icon;

                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSpiceLevel(opt.label)}
                      className={`flex mb-10 items-center justify-center gap-2 rounded-lg border py-3 text-sm transition-all
                    ${opt.base}
                    ${opt.hover}
                    ${
                      isSelected
                        ? opt.active
                        : "border-white/5 bg-[#17100d] text-neutral-400"
                    }`}
                    >
                      <Icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TEXTAREA */}
            <div className="space-y-3">
              <label className="block text-sm font-medium uppercase tracking-wider text-neutral-400">
                Special Instructions
              </label>

              <Textarea
                placeholder="E.g., No onions..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="min-h-[100px] border-white/5 bg-[#17100d] text-white placeholder-neutral-600 focus-visible:border-[#c9723f]/60 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* BOTTOM */}
          <div className="space-y-4 border-t border-white/10 pt-4">

            {/* SUCCESS MESSAGE */}{" "}
            {showSuccess && (
              <div className="pointer-events-none absolute bottom-20 left-1/3 z-50 -translate-x-1/2 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-green-500/20 bg-green-500/90 px-20 py-5 text-sm font-semibold text-white shadow-2xl backdrop-blur-md sm:text-base">
                  <Check className="h-5 w-5" />
                  <span>Added to cart successfully</span>
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium uppercase tracking-wider text-neutral-400 -mt-4">
                Quantity
              </span>

              <div className="-mt-4 flex items-center gap-1 rounded-full border border-white/10 bg-[#17100d] p-1">
                <button
                  onClick={handleDecrement}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Minus className="h-4 w-4 " />
                </button>

                <span className="w-8 text-center font-semibold ">
                  {quantity}
                </span>

                <button
                  onClick={handleIncrement}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Plus className="h-4 w-4 " />
                </button>
              </div>
            </div>
            {/* BUTTON */}
            <Button
              onClick={handleAddClick}
              className="mt-2 w-full gap-3 rounded-xl bg-[#c9723f] py-6 text-base font-semibold text-white shadow-lg shadow-[#c9723f]/10 transition-all hover:bg-[#b05f30]"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Add to Order • Nu. {totalPrice}</span>
            </Button>
          </div>
        </>
      }
    />
  );
}
