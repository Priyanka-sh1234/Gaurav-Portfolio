"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, ArrowRight, Target, BarChart, Sparkles } from "lucide-react";

// Custom components & Assets
import { Word, TextMask } from "@animation";
import { paragraph } from "@constants";
import { hero } from "@public";
import { Navbar } from "@/components";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef(null);

  const phares1 = [
    "Helping businesses grow their online presence through proven SEO strategies, data driven digital marketing, and result-focused campaigns.",
  ];
  const phares2 = [
    "Empowering brands in Kharar, Mohali & Chandigarh to stand out online. From search rankings to lead generation, we create digital strategies.",
  ];

  // Hero Entrance Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-img-container", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    }, heroContainerRef);
    return () => ctx.revert();
  }, []);

  // About Section Scrub (Desktop Only)
  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (!aboutImageRef.current) return;
      gsap.to(aboutImageRef.current, {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: aboutImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <main className=" bg-white rounded-xl w-full">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section ref={heroContainerRef} className="w-full min-h-full lg:min-h-screen relative flex items-center pt-24 pb-5 lg:pb-15 lg:pt-[20vh]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center w-full">

          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter uppercase text-[#202020]">
              Best SEO & Digital <br />
              <span className="text-blue-600">Marketing Agency</span>
            </h1>

            <div className="hero-text flex flex-col gap-4 max-w-lg">
              <p className="text-black text-base md:text-lg leading-relaxed">
                <TextMask>{phares1}</TextMask>
              </p>
              <p className="text-black text-sm md:text-base">
                <TextMask>{phares2}</TextMask>
              </p>
            </div>

            <div className="hero-text pt-4">
              <a href="tel:62833 18275" className="px-8 py-4 bg-[#202020] text-white rounded-full font-bold flex items-center gap-3 hover:bg-blue-600 transition-colors duration-300">
                Start Growing Now <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right: The Original Orb Design */}
          <div className="hero-img-container flex-1 w-full h-auto md:h-[650px]">
            <div className="animate-orb w-full h-full relative">
              <Image
                src={hero}
                alt="heroImg"
                fill
                className="object-cover rounded-[3rem]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="relative w-full py-2 pb-12 md:py-24 px-6 lg:px-24" id="about">
        <div className="max-w-7xl mx-auto">

          <header className="mb-16">
            <p className="text-blue-600 font-bold tracking-widest uppercase text-base mb-3 flex items-center gap-2">
              SEO Strategy & Performance
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-[#202020] tracking-tight">Driving Organic Growth</h2>
          </header>

          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Left Column: Image with Circular Bubbles */}
            <div className="w-full lg:w-[35%] lg:sticky lg:top-32 shrink-0">
              <div className="relative max-w-[380px] mx-auto lg:mx-0">
                <motion.div ref={aboutImageRef} className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-xl lg:shadow-none border-4 border-white">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/041/714/219/small/ai-generated-professional-man-in-suit-with-arms-crossed-on-transparent-background-stock-png.png"
                    className="w-full h-full object-contain pt-8 relative z-10"
                    alt="Expert"
                  />

                  {/* ROI Bubble */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-2 z-40 h-20 w-20 md:h-28 md:w-28 bg-white shadow-2xl rounded-full border-4 border-green-50 flex flex-col items-center justify-center text-green-600"
                  >
                    <TrendingUp size={24} />
                    <span className="text-sm md:text-lg font-black leading-none">+140%</span>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase">Growth</span>
                  </motion.div>
                </motion.div>

                {/* Skill Bubbles */}
                <div className="absolute -left-8 top-12 z-30 h-20 w-20 md:h-24 md:w-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-center p-3 shadow-xl border-4 border-white text-[9px] md:text-[10px] font-bold uppercase leading-tight">
                  Keyword<br />Strategy
                </div>

                <div className="absolute -right-6 bottom-24 z-30 h-16 w-16 md:h-20 md:w-20 bg-blue-700 text-white rounded-full flex items-center justify-center text-center p-2 shadow-xl border-4 border-white text-[8px] md:text-[9px] font-bold uppercase leading-tight">
                  Technical<br />SEO
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 z-30 h-20 w-20 md:h-24 md:w-24 bg-[#202020] text-white rounded-full flex items-center justify-center text-center p-2 shadow-xl border-4 border-white text-[9px] md:text-[10px] font-bold uppercase leading-tight">
                  Backlink<br />Building
                </div>
              </div>
            </div>

            {/* Right Column: Content & Expertise */}
            <div className="w-full lg:w-[65%] flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                {paragraph.slice(0, 3).map((p: string, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-gray-700 text-lg md:text-xl leading-relaxed">
                    <Word paragraph={p} />
                  </motion.div>
                ))}
              </div>

              <div className="pt-10 border-t border-gray-500 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-sky-50 to-[#b4b2b2] rounded-3xl shadow-sm border border-gray-300 flex flex-col gap-3">
                  <Target className="text-blue-600" size={24} />
                  <h4 className="font-bold text-gray-900">Audience Targeting</h4>
                  <p className="text-sm text-gray-500">Connecting users to content that actually converts.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-sky-50 to-[#b4b2b2] rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-3">
                  <BarChart className="text-blue-600" size={24} />
                  <h4 className="font-bold text-gray-900">Search Analytics</h4>
                  <p className="text-sm text-gray-500">Data-driven decisions for sustainable organic growth.</p>
                </div>
              </div>

              {/* Premium Slide Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 relative w-full md:w-[320px] h-16 bg-[#202020] rounded-full overflow-hidden group shadow-lg"
              >
                <a href="tel:62833 18275" className="absolute inset-0 w-full h-full flex items-center justify-center z-10 group">
                  <span className="text-white font-bold tracking-tight transition-transform group-hover:translate-x-[-15px]">
                    Call to Discuss Growth
                  </span>
                </a>

                <motion.div
                  className="absolute left-0 top-0 h-full w-16 bg-blue-600 rounded-full z-0 flex items-center justify-center"
                  animate={{ x: [0, 250, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <ArrowRight className="text-white" size={24} />
                </motion.div>
              </motion.button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}