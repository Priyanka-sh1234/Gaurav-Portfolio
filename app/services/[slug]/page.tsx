"use client";
import { servicesItem } from "@constants";
import { Navbar, Footer } from "@components";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function ServiceDetail() {
    const params = useParams();
    const service = servicesItem.find((item) => item.slug === params.slug);

    if (!service) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-[#d6d5d5] text-[#202020]">
                <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                <Link href="/" className="px-6 py-3 bg-black text-white rounded-full uppercase text-sm">
                    Go Back Home
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-[#d6d5d5] min-h-screen w-full text-[#202020]">
            <Navbar />

            {/* Hero Section */}
            <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-[20px] pt-[150px] pb-[50px]">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <h5 className="text-[16px] uppercase tracking-widest mb-4 opacity-60">Service Detail</h5>
                    <h1 className="text-[50px] md:text-[90px] font-bold uppercase leading-[0.9] tracking-tighter mb-10 max-w-[1200px]">
                        {service.title}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                    className="w-full h-[1px] bg-[#202020] opacity-20"
                ></motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="w-full h-[50vh] md:h-[70vh] relative rounded-[20px] overflow-hidden mt-[50px]"
                >
                    <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        className="object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="w-full max-w-[1200px] mx-auto px-[20px] md:px-[50px] pb-[150px] flex flex-col md:flex-row gap-[50px]">

                <div className="flex-1">
                    <h2 className="text-[32px] md:text-[42px] leading-tight font-medium sticky top-[120px]">
                        {service.description}
                    </h2>
                </div>

                <div className="flex-1 flex flex-col gap-[30px] text-[18px] md:text-[20px] leading-relaxed opacity-80">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        We offer professional <strong>{service.title}</strong> services tailored to meet your business needs.
                        Our team of experts uses data-driven strategies to ensure you get the best results.
                        Whether you are looking to expand your reach, increase conversions, or build a strong brand identity,
                        we are here to help you achieve your goals.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        In the rapidly evolving digital landscape, staying ahead requires innovation and precision.
                        Our comprehensive approach ensures every aspect of your {service.title.toLowerCase()} strategy is optimized for success.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-10"
                    >
                        <Link href="/#contact" className="inline-block px-8 py-4 bg-[#202020] text-[#f1f1f1] rounded-full uppercase text-sm font-medium hover:bg-black transition-all hover:scale-105">
                            Start Your Project
                        </Link>
                    </motion.div>
                </div>

            </section>

            <Footer />
        </main>
    );
}
