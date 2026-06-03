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

// Menu item structure
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
  // Cart Context
  const { addToCart } = useCart();

  // States
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState("Medium");

  const [specialInstructions, setSpecialInstructions] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  // Price Calculation
  const numericPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;

  const totalPrice = numericPrice * quantity;

  // Quantity Controls
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Add To Cart
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

    // Show success message
    setShowSuccess(true);

    // Hide after 2 sec
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  //Spice config (clean + scalable)
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
      label: "Medium",
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
    <div className="flex min-h-screen flex-col bg-[#110b09] text-white lg:flex-row">
      {/* LEFT IMAGE SECTION */}
      <div className="relative h-[40vh] w-full md:h-[50vh] lg:h-screen lg:w-1/2">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        {/* Food Image */}
        <Image
          src={item.image ?? "/bg.png"}
          alt={item.name}
          fill
          priority
          className="object-cover object-center rounded-b-lg lg:rounded-l-lg lg:rounded-r-none"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#110b09]/70" />{" "}
      </div>

      {/* RIGHT CONTENT SECTION */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-8 lg:h-screen lg:overflow-y-auto lg:p-12">
        {/* TOP CONTENT */}
        <div className="space-y-8">
          {/* HEADER */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                {item.name}
              </h1>

              <Badge className="shrink-0 rounded-full border border-[#c9723f]/40 bg-[#c9723f]/15 px-4 py-3.5 text-sm font-semibold text-[#e8915d]">
                {item.price}
              </Badge>
            </div>

            <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
              {item.description ??
                "Authentic, freshly prepared Himalayan specialty cooked with traditional spices and locally acquired ingredients."}
            </p>
          </div>

          <hr className="border-white/10" />

          {/* SPICE LEVEL */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-400">
              <Flame className="h-4 w-4 text-[#c9723f]" />
              <span>Select Spice Level</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {spiceOptions.map((opt) => {
                const isSelected = spiceLevel === opt.label;
                const Icon = opt.icon;

                return (
                  <button
                    key={opt.label}
                    onClick={() => setSpiceLevel(opt.label)}
                    className={`rounded-lg border py-3 text-xs font-medium transition-all md:text-sm flex items-center justify-center gap-2
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

          {/* SPECIAL INSTRUCTIONS */}
          <div className="space-y-3">
            <label className="block text-sm font-medium uppercase tracking-wider text-neutral-400">
              Special Instructions
            </label>

            <Textarea
              placeholder="E.g., No onions, extra cheese, less salt..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="min-h-[100px] border-white/5 bg-[#17100d] text-white placeholder-neutral-600 focus-visible:border-[#c9723f]/60 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* BOTTOM ACTION SECTION */}
        <div className="mt-8 space-y-4 border-t border-white/10 pt-6 lg:mt-0">
          {/* SUCCESS MESSAGE */}
          {showSuccess && (
            <div className="pointer-events-none absolute bottom-18 left-1/2 z-50 -translate-x-1/2 animate-in fade-in zoom-in-95 duration-300">
              {" "}
              <div className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-green-500/20 bg-green-500/90 px-8 py-3.5 text-sm font-semibold text-white shadow-2xl backdrop-blur-md">
                {" "}
                <Check className="h-5 w-5" />{" "}
                <span>Added to cart successfully</span>{" "}
              </div>{" "}
            </div>
          )}
          {/* QUANTITY */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-wider text-neutral-400">
              Quantity
            </span>

            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#17100d] p-1">
              <button
                onClick={handleDecrement}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/5 hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-8 text-center text-base font-semibold">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/5 hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* ADD TO CART BUTTON */}
          <Button
            onClick={handleAddClick}
            className="w-full gap-3 rounded-xl bg-[#c9723f] py-6 text-base font-semibold text-white transition-all hover:bg-[#b05f30] active:scale-[0.99] shadow-lg shadow-[#c9723f]/10"
          >
            <ShoppingBag className="h-5 w-5" />

            <span>Add to Order • Nu. {totalPrice}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
