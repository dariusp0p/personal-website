"use client";

import React from "react";

interface SocialButtonProps {
  icon: React.ReactNode;
  href: string;
  download?: boolean;
  target?: string;
  rel?: string;
  name?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  href,
  download,
  target,
  rel,
  name,
}) => {
  return (
    <div className="flex flex-col items-center">
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className="w-12 h-12 border dark:border-white/[0.2] border-foreground/[0.2] dark:bg-black bg-white bg-opacity-20 rounded-full flex items-center justify-center dark:text-white text-foreground text-xl hover:bg-opacity-40 hover:scale-110 dark:hover:border-white hover:border-foreground hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] light:hover:shadow-[0_0_15px_rgba(0,0,0,0.6)] transition-all duration-200 cursor-pointer"
      >
        {icon}
      </a>
      {name && (
        <span className="text-xs dark:text-white text-foreground mt-1">
          {name}
        </span>
      )}
    </div>
  );
};

export default SocialButton;
