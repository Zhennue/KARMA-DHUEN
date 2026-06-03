"use client";

import { useRouter } from "next/navigation";

import { useCart } from "@/src/context/cart-context";
import { Button } from "@/src/components/ui/button";

import {
  ChevronLeft,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const grandTotal = cart.reduce((acc, item) => {
    const price =
      parseInt(
        item.totalPrice.replace(/[^0-9]/g, "")
      ) || 0;

    return acc + price;
  }, 0);

  const handleSubmitOrder = () => {
    console.log(
      "ORDER SENT TO KITCHEN:",
      cart
    );

    alert("Order submitted to kitchen!");

    clearCart();
  };

  return (
    <div className="relative min-h-screen bg-[#110b09] px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">

        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95"
        >
          <X className="h-6 w-6" />
        </button>

        {/* HEADER */}
        <div className="mb-8 ">
          <h1 className="text-4xl font-bold text-center">
            Draft Order
          </h1>

          <p className="mt-2 text-neutral-400">
            Review and modify your order before
            sending to kitchen.
          </p>
        </div>

        {/* CART ITEMS */}
        <div className="space-y-4">
          {cart.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#17100d] p-10 text-center text-neutral-400">
              No items in your cart.
            </div>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#17100d] p-5"
            >
              <div className="flex items-start justify-between gap-4">

                {/* LEFT SIDE */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-sm text-neutral-400">
                    Spice Level:{" "}
                    {item.spiceLevel}
                  </p>

                  {item.specialInstructions && (
                    <p className="text-sm text-neutral-500">
                      Note:{" "}
                      {
                        item.specialInstructions
                      }
                    </p>
                  )}

                  <p className="pt-1 text-lg font-bold text-[#c9723f]">
                    {item.totalPrice}
                  </p>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="text-neutral-500 transition hover:text-red-400"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="mt-5 flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      "decrease"
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#110b09]"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <div className="w-10 text-center font-semibold">
                  {item.quantity}
                </div>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      "increase"
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#110b09]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL + SUBMIT */}
        {cart.length > 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#17100d] p-6">
            <div className="flex items-center justify-between">
              <span className="text-lg text-neutral-400">
                Grand Total
              </span>

              <span className="text-3xl font-bold text-[#c9723f]">
                Nu. {grandTotal}
              </span>
            </div>

            <Button
              onClick={handleSubmitOrder}
              className="mt-6 w-full rounded-xl bg-[#c9723f] py-6 text-lg font-semibold hover:bg-[#b05f30]"
            >
              Submit Order to Kitchen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}