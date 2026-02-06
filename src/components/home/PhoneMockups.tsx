"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

const PhoneMockups = () => {
    const features: {
        title: ReactNode;
        altText?: string;
        description: string;
        image: string;
        icon: string;
    }[] = [
            {
                title: "Swipe Tab",
                description:
                    "Discover opportunities with intuitive swipe gestures — mix of video profiles and job posts",
                image:
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
                icon: "❤️",
            },
            {
                title: "Live Hiring Events",
                description:
                    "Join real-time hiring sessions and connect with opportunities as they happen",
                image:
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
                icon: "📺",
            },
            {
                title: (
                    <>
                        <span className="font-orbitron font-semibold">oppspaces</span> Booking
                    </>
                ),
                altText: "oppspaces Booking",
                description:
                    "Book meetings instantly in one tap — no more back-and-forth scheduling",
                image:
                    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
                icon: "📅",
            },
        ];

    return (
        <section className="py-24 sm:py-32 bg-secondary/50">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-2xl"
                >
                    <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground tracking-tighter">
                        Everything you need to grow
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto auto-rows-[400px]">
                    {/* Card 1: Large (4 cols) */}
                    <div className="md:col-span-4 group relative rounded-[2.5rem] overflow-hidden bg-[#F2F0E9] border border-black/5">
                        <Image
                            src={features[0].image}
                            alt="Swipe"
                            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to- from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-10">
                            <div className="text-5xl mb-4 text-white">{features[0].icon}</div>
                            <h3 className="text-3xl font-bold text-white mb-2">{features[0].title}</h3>
                            <p className="text-lg text-white/80 max-w-md">{features[0].description}</p>
                        </div>
                    </div>

                    {/* Card 2: Tall/Narrow (2 cols) */}
                    <div className="md:col-span-2 group relative rounded-[2.5rem] overflow-hidden bg-[#E6E4DD] border border-black/5">
                        <Image
                            src={features[1].image}
                            alt="Events"
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute top-8 left-8">
                            <div className="text-4xl bg-white/20 backdrop-blur-md p-3 rounded-2xl inline-block text-white border border-white/20">
                                {features[1].icon}
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{features[1].title}</h3>
                        </div>
                    </div>

                    {/* Card 3: Wide (6 cols) */}
                    <div className="md:col-span-6 group relative rounded-[2.5rem] overflow-hidden bg-[#F2F0E9] flex flex-col md:flex-row items-center justify-between p-10 md:p-14 border border-black/5">
                        <div className="relative z-10 max-w-xl">
                            <div className="text-5xl mb-6">{features[2].icon}</div>
                            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                                {features[2].title}
                            </h3>
                            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                                {features[2].description}
                            </p>
                        </div>
                        <div className="relative mt-8 md:mt-0 w-full md:w-1/2 h-64 md:h-full rounded-3xl overflow-hidden shadow-xl rotate-3">
                            <Image
                                src={features[2].image}
                                alt="Booking"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhoneMockups;
