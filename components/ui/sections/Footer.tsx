import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";

const socials = [
  {
    icon: <FaEnvelope />,
    href: "mailto:dariuspop2005@gmail.com",
    label: "Email",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/darius-pop-2a0192353",
    label: "LinkedIn",
  },
  {
    icon: <FaGithub />,
    href: "https://github.com/dariusp0p",
    label: "GitHub",
  },
  {
    icon: <FaDownload />,
    href: "/resume.pdf",
    label: "Resume",
    download: true,
  },
];

const Footer = () => (
  <footer className="w-full py-6 flex flex-col items-center justify-center bg-background border-t border-neutral-200 dark:border-neutral-800">
    <div className="flex gap-6 mb-2">
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          download={social.download}
          aria-label={social.label}
          className="text-xl text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition"
        >
          {social.icon}
        </a>
      ))}
    </div>
    <span className="text-xs text-neutral-500 dark:text-neutral-400">
      © {new Date().getFullYear()} Darius Pop. All rights reserved.
    </span>
  </footer>
);

export default Footer;
