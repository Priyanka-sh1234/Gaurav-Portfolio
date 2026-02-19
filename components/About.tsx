"use client";
import React, { useEffect, useRef } from "react";
import { Word } from "@animation";
import { paragraph } from "@constants";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, ArrowRight, Target, BarChart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const title = "Driving Organic Growth";
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply the floating scrub effect on screens larger than 1024px (Desktop)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!imageRef.current) return;
      gsap.to(imageRef.current, {
        y: 20,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative w-full py-16 px-6 lg:px-24 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <header className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3"
          >
            SEO Strategy & Performance
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#202020] leading-tight tracking-tight">
            {title}
          </h2>
        </header>

        {/* Responsive Grid: Column on Mobile, Row on Desktop */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-16 items-start">

          {/* Left Column: Image Area */}
          {/* Removed 'sticky' on mobile, enabled on lg screens */}
          <div className="w-full lg:w-[35%] relative lg:sticky lg:top-28">
            <div className="relative w-full max-w-[400px] lg:max-w-none mx-auto">
              <motion.div
                ref={imageRef}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl lg:shadow-none"
              >
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/041/714/219/small/ai-generated-professional-man-in-suit-with-arms-crossed-on-transparent-background-stock-png.png"
                  alt="SEO Expert"
                  className="w-full h-full object-contain pt-4 relative z-10"
                />

                {/* ROI Bubble: Visible on all, adjusted position for mobile */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 -right-2 md:-top-10 md:-right-6 z-40 h-16 w-16 md:h-28 md:w-28 bg-white shadow-2xl rounded-full border-4 border-green-50 flex flex-col items-center justify-center text-green-600"
                >
                  <TrendingUp size={20} className="mb-0.5 md:mb-1" />
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-[12px] md:text-base font-black">+140%</span>
                    <span className="text-[8px] md:text-xs font-bold uppercase">Growth</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Keyword Strategy Bubble */}
              <motion.div
                className="absolute -left-6 top-10 z-30 h-16 w-16 md:h-24 md:w-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-center p-2 shadow-xl border-4 border-white"
              >
                <span className="text-[8px] md:text-[10px] font-bold uppercase leading-tight">
                  Keyword<br />Strategy
                </span>
              </motion.div>

              {/* Technical SEO Bubble */}
              <motion.div
                className="absolute -right-6 bottom-24 z-30 h-14 w-14 md:h-20 md:w-20 bg-blue-700 text-white rounded-full flex items-center justify-center text-center p-2 shadow-xl border-4 border-white"
              >
                <span className="text-[8px] md:text-[9px] font-bold uppercase leading-tight">
                  Technical<br />SEO
                </span>
              </motion.div>

              {/* Backlink Building Bubble */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-30 h-16 w-16 md:h-24 md:w-24 bg-[#202020] text-white rounded-full flex items-center justify-center text-center p-2 shadow-xl border-4 border-white"
              >
                <span className="text-[8px] md:text-[10px] font-bold uppercase leading-tight">
                  Backlink<br />Building
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6 pt-10 lg:pt-0">
            {paragraph.slice(0, 3).map((p: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-gray-700 text-base md:text-lg leading-relaxed"
              >
                <Word paragraph={p} />
              </motion.div>
            ))}

            {/* Expertise Cards */}
            <div className="pt-10 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-neutral-100/50 rounded-2xl flex flex-col gap-2">
                  <Target className="text-blue-600" size={24} />
                  <h4 className="font-bold text-neutral-900">Audience Targeting</h4>
                  <p className="text-sm text-neutral-500 leading-snug">Connecting users to content that actually converts.</p>
                </div>
                <div className="p-6 bg-neutral-100/50 rounded-2xl flex flex-col gap-2">
                  <BarChart className="text-blue-600" size={24} />
                  <h4 className="font-bold text-neutral-900">Search Analytics</h4>
                  <p className="text-sm text-neutral-500 leading-snug">Data-driven decisions for sustainable organic growth.</p>
                </div>
              </div>

              {/* Re-Designed Slide Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 relative w-full md:w-[280px] h-14 bg-[#202020] rounded-full overflow-hidden group cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full flex items-center justify-center text-white text-sm font-bold tracking-wide z-10 transition-transform group-hover:translate-x-[-10px]">
                  Slide to Discuss Growth
                </span>
                <motion.div
                  className="absolute left-0 top-0 h-full w-14 bg-blue-600 rounded-full z-0"
                  animate={{ x: [0, 220, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
                <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 text-white z-20 group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}