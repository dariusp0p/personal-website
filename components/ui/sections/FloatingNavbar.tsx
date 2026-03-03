"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const pathname = usePathname();
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
        document.documentElement.offsetHeight,
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex max-w-fit fixed top-8 inset-x-0 mx-auto border-2 border-border rounded-full z-5000 px-4 py-1 items-center justify-center",
          "bg-primary text-primary-foreground shadow-lg",
          "dark:bg-primary dark:text-primary-foreground",
          className,
        )}
      >
        {navItems.map((navItem, idx) => (
          <motion.div
            key={`link-${idx}`}
            initial={{ marginLeft: 12, marginRight: 12 }}
            whileHover={{ marginLeft: 16, marginRight: 16, scale: 1.05 }} // 16px = 1rem
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex"
          >
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative items-center flex space-x-1 transition-colors duration-300",
                "text-primary-foreground hover:text-muted-foreground",
                pathname === navItem.link && "text-accent-foreground",
              )}
            >
              {navItem.icon && <span className="mr-1">{navItem.icon}</span>}
              <span className="text-sm">{navItem.name}</span>
            </Link>
          </motion.div>
        ))}
        <ThemeToggle />
      </motion.div>
    </AnimatePresence>
  );
};

export { FloatingNav };
