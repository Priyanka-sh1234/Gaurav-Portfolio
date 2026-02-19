"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { testimonials } from "@constants";
import { Marquee, TextMask } from "@animation";

export default function Testimonials() {
  const phares = ["what my"];
  const phares1 = ["client says"];
  
  // We triple the data to create a massive "track" so users don't hit a blank wall while dragging
  const rowOneItems = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const rowTwoItems = [...testimonials.slice(4), ...testimonials.slice(4), ...testimonials.slice(4)];

  const dragRef1 = useRef<HTMLDivElement>(null);
  const dragRef2 = useRef<HTMLDivElement>(null);
  const [constraints1, setConstraints1] = useState({ left: 0, right: 0 });
  const [constraints2, setConstraints2] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (dragRef1.current) {
        const scrollWidth = dragRef1.current.scrollWidth;
        setConstraints1({ left: -(scrollWidth * 0.6), right: 0 });
      }
      if (dragRef2.current) {
        const scrollWidth = dragRef2.current.scrollWidth;
        setConstraints2({ left: -(scrollWidth * 0.6), right: 0 });
      }
    };

    const timer = setTimeout(updateConstraints, 200);
    window.addEventListener("resize", updateConstraints);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  return (
    <section className="py-[60px] md:py-[100px] bg-[#e1e1e1] relative overflow-hidden" id="testimonials">
      {/* Header Container */}
      <div className="w-full flex justify-start px-6 md:px-12 pb-[40px] md:pb-[60px]">
        <h1 className="text-[#202020] uppercase leading-[0.9] text-[55px] sm:text-[80px] md:text-[120px] font-bold overflow-hidden tracking-tighter">
          <TextMask>{phares}</TextMask>
          <TextMask>{phares1}</TextMask>
        </h1>
      </div>

      <div className="w-full flex flex-col gap-[20px] md:gap-[30px] bg-[#e1e1e1] relative">
        
        {/* ROW 1: Moves Left */}
        <Marquee baseVelocity={-0.1}>
          <motion.div 
            ref={dragRef1}
            drag="x"
            dragConstraints={constraints1}
            dragElastic={0.1}
            className="flex m-0 gap-x-[15px] md:gap-x-[25px] items-center pr-[25px] cursor-grab active:cursor-grabbing"
          >
            {rowOneItems.map((item, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0">
                <div className="w-[85vw] md:w-[550px] min-h-[350px] md:min-h-[420px] py-[30px] px-[25px] md:px-[45px] border border-[#222222]/10 rounded-[15px] bg-[#d6d5d5] flex flex-col justify-between pointer-events-none select-none shadow-sm">
                  <p className="text-black text-[22px] md:text-[32px] lg:text-[36px] font-medium leading-tight tracking-tight">
                    &quot;{item.text}&quot;
                  </p>
                  
                  <div className="flex items-center gap-[15px] md:gap-[20px] pt-6 border-t border-black/5">
                    <div className="relative h-[55px] w-[55px] md:h-[65px] md:w-[65px] overflow-hidden rounded-full shrink-0 bg-gray-300">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 55px, 65px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-black text-[16px] md:text-[19px] font-bold leading-tight uppercase tracking-tighter">
                        {item.name}
                      </h3>
                      <p className="text-black/50 text-[14px] md:text-[16px] font-medium leading-tight">
                        {item.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </Marquee>

        {/* ROW 2: Moves Right */}
        <Marquee baseVelocity={0.1}>
          <motion.div 
            ref={dragRef2}
            drag="x"
            dragConstraints={constraints2}
            dragElastic={0.1}
            className="flex m-0 gap-x-[15px] md:gap-x-[25px] items-center pr-[25px] cursor-grab active:cursor-grabbing"
          >
            {rowTwoItems.map((item, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0">
                <div className="w-[85vw] md:w-[550px] min-h-[350px] md:min-h-[420px] py-[30px] px-[25px] md:px-[45px] border border-[#222222]/10 rounded-[15px] bg-[#d6d5d5] flex flex-col justify-between pointer-events-none select-none shadow-sm">
                  <p className="text-black text-[22px] md:text-[32px]  lg:text-[36px] font-medium leading-tight tracking-tight">
                    &quot;{item.text}&quot;
                  </p>
                  
                  <div className="flex items-center gap-[15px] md:gap-[20px] pt-6 border-t border-black/5">
                    <div className="relative h-[55px] w-[55px] md:h-[65px] md:w-[65px] overflow-hidden rounded-full shrink-0 bg-gray-300">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 55px, 65px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-black text-[16px] md:text-[19px] font-bold leading-tight uppercase tracking-tighter">
                        {item.name}
                      </h3>
                      <p className="text-black/50 text-[14px] md:text-[16px] font-medium leading-tight">
                        {item.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </Marquee>
      </div>
    </section>
  );
}