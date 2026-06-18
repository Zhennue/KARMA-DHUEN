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
        className={`flex min-h-screen flex-col overflow-y-auto bg-[#110b09] text-white ${
          reverse ? "lg:flex-row-reverse" : ""
        } lg:flex-row`}
      >
        {/* LEFT SIDE */}
        <div className="relative w-full lg:h-screen lg:w-1/2">{left}</div>

        {/* RIGHT SIDE */}
        <div className="soft-scroll flex flex-1 flex-col justify-between overflow-y-auto px-4 py-4 sm:px-5 md:px-6 lg:h-screen lg:px-8 xl:px-10">
          {right}
        </div>
      </div>

      <style jsx global>{`
        .soft-scroll {
          scrollbar-width: thin;
          scrollbar-color: #c9723f #1a1310;
        }

        .soft-scroll::-webkit-scrollbar {
          width: 10px;
        }

        .soft-scroll::-webkit-scrollbar-track {
          background: #1a1310;
          border-radius: 999px;
        }

        .soft-scroll::-webkit-scrollbar-thumb {
          background: #c9723f;
          border-radius: 999px;
        }

        .soft-scroll::-webkit-scrollbar-thumb:hover {
          background: #b05f30;
        }
      `}</style>
    </>
  );
}
