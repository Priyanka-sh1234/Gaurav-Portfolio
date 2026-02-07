"use client";
import { gsap } from "gsap";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { servicesItem } from "@constants";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
	const cardsRef = useRef<HTMLElement[]>([]);
	const stickyHeaderRef = useRef<HTMLDivElement>(null);
	const stickySectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const stickyHeight = window.innerHeight * 5;

		const lenis = new Lenis();
		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);

		ScrollTrigger.create({
			trigger: stickySectionRef.current,
			start: "top top",
			end: `+=${stickyHeight}px`,
			pin: true,
			pinSpacing: true,
			onUpdate: (self) => {
				const progress = self.progress;

				if (stickyHeaderRef.current) {
					const maxTranslate =
						stickyHeaderRef.current.offsetWidth - window.innerWidth;
					gsap.set(stickyHeaderRef.current, {
						x: -progress * maxTranslate,
					});
				}

				cardsRef.current.forEach((card, index) => {
					const delay = index * 0.1125;
					const cardProgress = Math.max(
						0,
						Math.min((progress - delay) * 2, 1),
					);

					if (cardProgress > 0) {
						gsap.set(card, {
							xPercent: gsap.utils.interpolate(25, -650, cardProgress),
							opacity: 1,
						});
					} else {
						gsap.set(card, { opacity: 0 });
					}
				});
			},
		});

		return () => {
			ScrollTrigger.killAll();
		};
	}, []);

	return (
		<div
			className="relative bg-[#d6d5d5] w-full h-screen overflow-hidden"
			id="services"
			ref={stickySectionRef}
		>
			<div
				className="absolute top-0 left-0 w-[250vw] h-full flex items-center justify-center will-change-transform"
				ref={stickyHeaderRef}
			>
				<h1 className="text-black text-[30vw] tracking-tight leading-tight font-semibold m-0">
					services we provide
				</h1>
			</div>

			{servicesItem.map((card, index) => (
				<Link
					href={`/services/${card.slug}`}
					key={card.id}
					className="absolute left-full w-[325px] bg-black rounded-[10px] p-3 will-change-transform z-20 cursor-pointer block"
					ref={(el) => {
						if (el) cardsRef.current[index] = el;
					}}
				>
					<div className="w-full h-[200px] rounded-lg overflow-hidden relative">
						<Image
							src={card.img}
							alt={card.title}
							fill
							className="object-cover"
						/>
					</div>
					<div className="w-full h-[300px] flex flex-col justify-between text-white p-2">
						<h2 className="text-[42px] tracking-tighter leading-tight font-medium">
							{card.title}
						</h2>
						<p className="text-[20px] leading-tight">
							{card.description}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
}
