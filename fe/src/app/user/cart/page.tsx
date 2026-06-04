"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/src/context/cart-context";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  X,
  Trash2,
  Minus,
  Plus,
  Check,
  Edit3,
  Flame,
  Snowflake,
  Thermometer,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();

  const { cart, removeFromCart, updateQuantity, clearCart, updateCartItem } =
    useCart();

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editData, setEditData] = useState({
    spiceLevel: "Medium",
    specialInstructions: "",
  });

  const grandTotal = cart.reduce((acc, item) => {
    const price = parseInt(item.totalPrice.replace(/[^0-9]/g, "")) || 0;
    return acc + price;
  }, 0);

  // START EDIT
  const startEdit = (item: any) => {
    setEditingId(item.id);

    setEditData({
      spiceLevel: item.spiceLevel || "Medium",
      specialInstructions: item.specialInstructions || "",
    });
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({
      spiceLevel: "",
      specialInstructions: "",
    });
  };

  // SAVE EDIT
  const saveEdit = (id: number) => {
    updateCartItem(id, {
      spiceLevel: editData.spiceLevel,
      specialInstructions: editData.specialInstructions,
    });

    cancelEdit();
  };

  const handleSubmitOrder = () => {
    console.log("ORDER SENT TO KITCHEN:", cart);
    alert("Order submitted to kitchen!");
    clearCart();
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
    <div className="relative min-h-screen bg-[#110b09] px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded bg-black/40"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Draft Order</h1>
          <p className="mt-2 text-neutral-400">Review and modify your order</p>
        </div>

        {/* CART ITEMS */}
        <div className="space-y-4">
          {cart.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#17100d] p-10 text-center text-neutral-400">
              No items in your cart.
            </div>
          )}

          {cart.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className="rounded border border-white/10 bg-[#17100d] p-5"
              >
                <div className="flex justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-semibold">{item.name}</h2>

                    <div className="flex items-center gap-2">
                      <p className="text-sm text-neutral-400">
                        Spice Level: {item.spiceLevel}
                      </p>

                      <button onClick={() => startEdit(item)}>
                        <Edit3 className="h-3 w-3" />
                      </button>
                    </div>

                    {item.specialInstructions && (
                      <p className="text-sm text-neutral-500">
                        Note: {item.specialInstructions}
                      </p>
                    )}

                    <p className="pt-1 text-lg font-bold text-[#c9723f]">
                      {item.totalPrice}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* EDIT PANEL */}
                {isEditing && (
                  <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    <div className="grid grid-cols-3 gap-3">
                      {spiceOptions.map((opt) => {
                        const isSelected = editData.spiceLevel === opt.label;
                        const Icon = opt.icon;

                        return (
                          <button
                            key={opt.label}
                            onClick={() =>
                              setEditData((prev) => ({
                                ...prev,
                                spiceLevel: opt.label,
                              }))
                            }
                            className={`rounded-lg border py-3 flex items-center justify-center gap-2 text-sm transition-all
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

                    <Textarea
                      value={editData.specialInstructions}
                      onChange={(e) =>
                        setEditData((p) => ({
                          ...p,
                          specialInstructions: e.target.value,
                        }))
                      }
                      placeholder="Update notes..."
                      className="bg-[#110b09] border-white/10 text-white mt-4"
                    />

                    <div className="flex justify-end gap-2">
                      <Button onClick={cancelEdit}>Cancel</Button>

                      <Button onClick={() => saveEdit(item.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                )}

                {/* QUANTITY */}
                <div className="mt-5 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, "decrease")}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#110b09]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="w-10 text-center font-semibold">
                    {item.quantity}
                  </div>

                  <button
                    onClick={() => updateQuantity(item.id, "increase")}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#110b09]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* TOTAL + SUBMIT */}{" "}
      {cart.length > 0 && (
        <div className="mt-10 rounded border border-white/10 bg-[#17100d] p-6">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <span className="text-lg text-neutral-400"> Grand Total </span>{" "}
            <span className="text-3xl font-bold text-[#c9723f]">
              {" "}
              Nu. {grandTotal}{" "}
            </span>{" "}
          </div>{" "}
          <Button
            onClick={handleSubmitOrder}
            className="mt-6 w-full rounded-xl bg-[#c9723f] py-6 text-lg font-semibold hover:bg-[#b05f30]"
          >
            {" "}
            Submit Order to Kitchen{" "}
          </Button>{" "}
        </div>
      )}
    </div>
  );
}
