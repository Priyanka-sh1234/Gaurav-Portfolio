"use client";
import gsap from "gsap";
import Image from "next/image";
import { hero } from "@public";
import { Navbar } from "@/components";
import { TextMask } from "@animation";
import { useLayoutEffect } from "react";

export default function Hero() {
	const phares1 = [
		"Helping businesses grow their online presence through proven SEO strategies, data driven digital marketing, and result-focused campaigns. We turn visibility into traffic, and traffic into customers.",
	];
	const phares2 = [
		"Empowering brands in Kharar, Mohali & Chandigarh to stand out online. From search rankings to lead generation, we create digital strategies that drive consistent business growth.",
	];
	useLayoutEffect(() => {
		const textWrapper = document.querySelector(".ml12");
		if (textWrapper && textWrapper.textContent) {
			textWrapper.innerHTML = textWrapper.textContent.replace(
				/\S/g,
				"<span class='letter'>$&</span>",
			);
		}

		gsap.timeline().from(".ml12 .letter", {
			opacity: 0,
			stagger: {
				amount: 0.5,
				grid: "auto",
				from: "random",
			},
			delay: 0.5,
			duration: 1,
			ease: "power2.out",
		});

		gsap.to("nav", {
			top: 0,
			ease: "power3.inOut",
			duration: 1,
			delay: 0.5,
		});

		gsap.from(".hero-img", {
			scale: 0.5,
			opacity: 0,
			duration: 1,
			delay: 0.5,
			ease: "power4.inOut",
		});

		gsap.to(".header .col p", {
			left: 0,
			opacity: 1,
			duration: 1,
			delay: 0.5,
			ease: "power2.inOut",
		});
	}, []);
	return (
		<section className="w-full h-screen relative py-[10px]" id="home">
			<Navbar />
			<div className="w-full h-full flex gap-[30px] pt-[8vh] overflow-hidden items-center">
				<div className="header flex-1 flex flex-col gap-[10px] justify-between h-full">
					<div className="col flex-1 flex flex-col justify-center">
						<h1 className="ml-8 text-[70px] inline-block font-bold leading-none tracking-tight uppercase">
							Best SEO & Digital Marketing <br />
							Agency in Kharar, <br /> Mohali & Chandigarh
						</h1>
					</div>
					<div className="ml-8 col flex flex-1 flex-col gap-[10px] justify-center">
						<p className="relative opacity-0 text-[20px] inline-block leading-normal tracking-wide">
							<TextMask>{phares1}</TextMask>
						</p>
						<p className="relative opacity-0 text-[20px] inline-block leading-normal tracking-wide">
							<TextMask>{phares2}</TextMask>
						</p>
					</div>
				</div>
				<div className="hero-img animate-orb flex-1 h-full">
					<Image
						src={hero}
						alt="heroImg"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
