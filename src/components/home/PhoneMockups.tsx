"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

type Feature = {
  title: ReactNode;
  description: string;
  image: string;
  icon: string;
};

const PhoneMockups = () => {
  const features: Feature[] = [
    {
      title: "Swipe Tab",
      description:
        "Discover opportunities with intuitive swipe gestures — mix of video profiles and job posts",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
      icon: "❤️",
    },
    {
      title: "Live Hiring Events",
      description:
        "Join real-time hiring sessions and connect with opportunities as they happen",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80",
      icon: "📺",
    },
    {
      title: (
        <>
          <span className="font-orbitron font-semibold">oppspaces</span> Booking
        </>
      ),
      description:
        "Book meetings instantly in one tap — no more back-and-forth scheduling",
      image:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=80",
      icon: "📅",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter">
            Everything you need to grow
          </h2>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {/* CARD 1 */}
          <div className="relative md:col-span-4 rounded-[2.5rem] overflow-hidden h-[360px] sm:h-[420px]">
            <Image
              src={features[0].image}
              alt="Swipe tab"
              fill
              sizes="(max-width:768px) 100vw, 66vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-8 text-white">
              <div className="text-5xl mb-3">{features[0].icon}</div>
              <h3 className="text-3xl font-bold mb-2">{features[0].title}</h3>
              <p className="text-lg opacity-90 max-w-md">
                {features[0].description}
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="relative md:col-span-2 rounded-[2.5rem] overflow-hidden h-[360px] sm:h-[420px]">
            <Image
              src={features[1].image}
              alt="Live events"
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 p-6 text-white">
              <div className="text-4xl mb-2">{features[1].icon}</div>
              <h3 className="text-2xl font-bold">{features[1].title}</h3>
            </div>
          </div>

          {/* CARD 3 — BOOKING */}
          <div className="md:col-span-6 rounded-[2.5rem] bg-[#F2F0E9] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10">
            {/* Text */}
            <div className="max-w-xl">
              <div className="text-5xl mb-4">{features[2].icon}</div>
              <h3 className="text-3xl sm:text-5xl font-bold mb-4">
                {features[2].title}
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {features[2].description}
              </p>
            </div>

            {/* Image */}
            <div className="relative w-full md:w-1/2 h-65 sm:h-80 rounded-3xl overflow-hidden shadow-xl md:rotate-3">
              <Image
                src={features[2].image}
                alt="Booking preview"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneMockups;
