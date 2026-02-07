import Image from "next/image";
import { logo } from "@public";
import { Menu } from "@components";
import { navVarients } from "@motion";
import { links } from "@constants";
import { LinkHover } from "@animation";
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
				if (scrollY >= sectionTop - 300 && scrollY < sectionTop + sectionHeight - 300) {
					const id = section.getAttribute("id");
					if (id) {
						// Capitalize and set active
						const title = id === "home" ? "Home" :
							links.find(l => l.href === id)?.title ||
							id.charAt(0).toUpperCase() + id.slice(1);
						setActiveSection(title);
					}
				}
			});

			if (scrollY < 100) setActiveSection("Home");
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.nav
			variants={navVarients}
			initial="initial"
			animate="vissible"
			className="w-full h-[8vh] flex items-center justify-between px-[20px] md:px-[50px] fixed backdrop-blur-md bg-white/10 z-[99] top-0 left-0 border-b border-white/10">
			<motion.div variants={itemVariants} className="flex items-center gap-2">
				{/* Logo */}
				<Link href="/" className="cursor-pointer">
					<h1 className="text-[24px] font-bold tracking-tight text-[#202020] uppercase font-montreal">
						SEO Agency
					</h1>
				</Link>
			</motion.div>

			{/* Active Page Name Centered */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
				<AnimatePresence mode="wait">
					<motion.span
						key={activeSection}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="text-[#202020] text-[16px] font-medium tracking-wide uppercase block"
					>
						{activeSection}
					</motion.span>
				</AnimatePresence>
			</div>

			<motion.div variants={itemVariants} className="flex items-center gap-[20px]">
				<Link href="/#contact" className="hidden md:block px-6 py-2 bg-gradient-to-r from-[#202020] to-[#404040] text-white rounded-full text-sm uppercase font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-xl">
					Get Started
				</Link>
				{/* Side Menu Button */}
				<div className="flex items-center justify-center">
					<Menu />
				</div>
			</motion.div>
		</motion.nav>
	);
}
