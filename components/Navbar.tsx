"use client";
import { Menu } from "@components";
import { navVarients } from "@motion";
import { links } from "@constants";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const itemVariants = {
  initial: { opacity: 0, y: -20 },
  vissible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((sectionElement) => {
        const section = sectionElement as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset check: adjust -100 to match your navbar height
        if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
          const id = section.getAttribute("id");
          if (id) {
            // Find title in constants, or fallback to capitalized ID
            const foundLink = links.find(l => l.href.replace("#", "") === id);
            const title = foundLink ? foundLink.title : id.charAt(0).toUpperCase() + id.slice(1);
            setActiveSection(title);
          }
        }
      });

      if (scrollY < 50) setActiveSection("Home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      variants={navVarients}
      initial="initial"
      animate="vissible"
      className="
        fixed top-0 left-0 w-full 
        h-[60px] md:h-[8vh]
        px-4 md:px-12
        flex items-center justify-between
        backdrop-blur-md bg-white/20
        border-b border-white/10
        z-[100]
      "
    >
      {/* Left: Logo */}
      <motion.div variants={itemVariants} className="z-10">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-[18px] sm:text-[22px] font-bold tracking-tight text-black uppercase">
            SEO Agency
          </h1>
        </Link>
      </motion.div>

      {/* Center: Active Page Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="hidden md:block overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeSection}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="text-black text-[14px] font-semibold tracking-[0.2em] uppercase pointer-events-auto"
            >
              {activeSection}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Menu Button */}
      <motion.div variants={itemVariants} className="z-10">
        <Menu />
      </motion.div>
    </motion.nav>
  );
}