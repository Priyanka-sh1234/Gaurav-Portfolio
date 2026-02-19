"use client";
import { gsap } from "gsap";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { servicesItem } from "@constants";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const stickyHeaderRef = useRef<HTMLDivElement>(null);
    const stickySectionRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Reduced height slightly to make the scroll feel faster/tighter
            const stickyHeight = window.innerHeight * 5;

            ScrollTrigger.create({
                trigger: stickySectionRef.current,
                start: "top top",
                end: `+=${stickyHeight}px`,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    const progress = self.progress;

                    if (stickyHeaderRef.current) {
                        const maxTranslate = stickyHeaderRef.current.offsetWidth - window.innerWidth;
                        gsap.set(stickyHeaderRef.current, {
                            x: -progress * maxTranslate,
                        });
                    }

                    cardsRef.current.forEach((card, index) => {
                        if (!card) return;
                        
                        // FIX: Lower delay (0.05) makes cards follow each other closely
                        const delay = index * 0.05; 
                        const cardProgress = Math.max(0, Math.min((progress - delay) * 3, 1));

                        if (cardProgress > 0) {
                            gsap.set(card, {
                                // Start from 110% to ensure they don't start "half-hidden"
                                xPercent: gsap.utils.interpolate(110, -900, cardProgress),
                                rotation: gsap.utils.interpolate(8, -8, cardProgress),
                                opacity: 1,
                            });
                        } else {
                            gsap.set(card, { opacity: 0 });
                        }
                    });
                },
            });
        });

        return () => {
            mm.revert();
            lenis.destroy();
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <section
            className={`relative bg-[#d6d5d5] w-full overflow-hidden ${isMobile ? "h-auto py-20 px-6" : "h-screen"}`}
            id="services"
            ref={stickySectionRef}
        >
            {/* Background Text */}
            {!isMobile && (
                <div
                    className="absolute top-0 left-0 w-[250vw] h-full flex items-center justify-center will-change-transform pointer-events-none"
                    ref={stickyHeaderRef}
                >
                    <h1 className="text-black text-[25vw] tracking-tight leading-tight font-bold m-0 whitespace-nowrap">
                        services we provide
                    </h1>
                </div>
            )}

            {/* Mobile Title */}
            {isMobile && (
                <h1 className="text-black text-5xl font-bold uppercase tracking-tighter mb-10">
                    Our Services
                </h1>
            )}

            {/* Cards Container */}
            <div className={isMobile ? "flex flex-col gap-10" : ""}>
                {servicesItem.map((card, index) => {
                    const isOdd = index % 2 !== 0;
                    const threadHeight = isOdd ? "48vh" : "108vh";
                    
                    return (
                        <Link
                            href={`#`}
                            key={card.id}
                            style={!isMobile ? { 
                                top: isOdd ? "58%" : "52%",
                                transformOrigin: "50% -100px" // Swings from a point above the card
                            } : {}}
                            className={`
                                ${isMobile ? "relative w-full" : "absolute left-full -translate-y-1/2 w-[320px] z-20"} 
                                bg-black rounded-[15px] p-4 shadow-2xl cursor-pointer block group
                            `}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                        >
                            {/* Thread Line */}
                            {!isMobile && (
                                <div 
                                    className="absolute left-1/2 -translate-x-1/2 bottom-full w-[1.5px] bg-black/40"
                                    style={{ height: threadHeight }}
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full" />
                                </div>
                            )}

                            <div className="w-full h-[190px] rounded-xl overflow-hidden relative">
                                <Image
                                    src={card.img}
                                    alt={card.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className={`w-full flex flex-col justify-between text-white ${isMobile ? "pt-5" : "h-[260px] p-2"}`}>
                                <h2 className="text-[34px] tracking-tighter leading-none font-bold mt-4">
                                    {card.title}
                                </h2>
                                <p className="text-[15px] leading-tight text-gray-400 mt-4">
                                    {card.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}