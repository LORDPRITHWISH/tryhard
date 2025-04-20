"use client";

import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useMouse } from "@/hooks/usemouse";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export const MainMenusGradientCard = ({
  title,
  description,
  withArrow = false,
  circleSize = 400,
  className,
  children,
  link = "#",
}: {
  title: string;
  description: string;
  withArrow?: boolean;
  circleSize?: number;
  children?: ReactNode;
  className?: string;
  link?: string;
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href={link} className="block">
        <div
          className="group relative overflow-hidden rounded-2xl bg-white/10 p-2 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800/20"
          ref={parentRef}
        >
          {withArrow && (
            <ArrowUpRightIcon className="absolute right-3 top-3 z-10 size-5 translate-y-4 text-neutral-700 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 dark:text-neutral-300" />
          )}
          <div
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[3]",
              mouse.elementX === null || mouse.elementY === null
                ? "opacity-0"
                : "opacity-100"
            )}
            style={{
              maskImage: `radial-gradient(${
                circleSize / 2
              }px circle at center, white, transparent)`,
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              left: `${mouse.elementX}px`,
              top: `${mouse.elementY}px`,
              background:
                "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
            }}
          />
          <div className="absolute inset-px rounded-xl bg-neutral-100/80 backdrop-blur-sm dark:bg-neutral-900/80" />
          
          {children && (
            <div
              className={cn(
                "relative h-48 overflow-hidden rounded-lg border border-white/20 bg-white/70 transition-transform group-hover:scale-105 dark:border-neutral-800 dark:bg-black/40",
                className
              )}
            >
              <div className="flex h-full w-full items-center justify-center text-gray-800 dark:text-gray-200 opacity-80 group-hover:opacity-100 transition-opacity">
                {children}
              </div>
            </div>
          )}
          
          <div className="relative px-4 pb-4 pt-4">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};