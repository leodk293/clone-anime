"use client";
import React from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <main className="flex flex-col w-full min-h-screen">
      {children}

      <nav className="w-full flex justify-center mt-8 mb-8">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto p-1 max-w-full scrollbar-custom">
          {Array.from({ length: 17 }, (_, index) => (
            <Link
              title={`Page ${index + 1}`}
              key={nanoid(10)}
              href={index + 1 !== 1 ? `/list-anime/${index + 1}` : "/"}
            >
              <button
                className={`
                  min-w-[40px] p-2 text-base sm:text-lg lg:text-xl font-bold
                  transition-colors duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  rounded-md text-gray-700 hover:bg-blue-400 hover:text-white
                  ${
                    pathname === `/list-anime/${index + 1}`
                      ? "bg-blue-400 text-white"
                      : "bg-gray-200"
                  }
                `}
              >
                {index + 1}
              </button>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
