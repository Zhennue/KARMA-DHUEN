"use client";

import React from "react";

interface FlexPageProps {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
}

export default function FlexPage({
  left,
  right,
  reverse = false,
}: FlexPageProps) {
  return (
    <>
      <div
        className={`flex min-h-screen flex-col bg-[#110b09] text-white lg:flex-row ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* LEFT SIDE */}
        <div className="relative w-full lg:h-screen lg:w-1/2">
          {left}
        </div>

        {/* RIGHT SIDE (SCROLLABLE) */}
        <div className="soft-scroll flex flex-1 flex-col justify-between px-4 py-4 sm:px-5 md:px-6 lg:h-screen lg:overflow-y-auto lg:px-8 xl:px-10">
          {right}
        </div>
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        /* Soft scrollbar styling */
        .soft-scroll {
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: #3a2a25 transparent;
        }

        .soft-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .soft-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .soft-scroll::-webkit-scrollbar-thumb {
          background-color: #3a2a25;
          border-radius: 999px;
        }

        .soft-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #4a352f;
        }
      `}</style>
    </>
  );
}