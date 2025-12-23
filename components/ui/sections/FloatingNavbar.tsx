"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    children?: { name: string; link: string }[];
  }[];
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const directionRef = useRef<"up" | "down" | null>(null);

  useEffect(() => {
    setVisible(true);
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      const isAtBottom = window.innerHeight + currentScrollY >= docHeight - 20;

      if (currentScrollY > lastScrollY.current) {
        directionRef.current = "down";
      } else if (currentScrollY < lastScrollY.current) {
        directionRef.current = "up";
      }

      if (currentScrollY < 50) {
        setVisible(true);
      } else if (isAtBottom) {
        setVisible(false);
      } else if (directionRef.current === "up") {
        setVisible(true);
      } else if (directionRef.current === "down") {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            {navItem.icon && <span className="mr-1">{navItem.icon}</span>}
            <span className="text-sm">{navItem.name}</span>
          </Link>
        ))}
        <ThemeToggle />
      </motion.div>
    </AnimatePresence>
  );
};
