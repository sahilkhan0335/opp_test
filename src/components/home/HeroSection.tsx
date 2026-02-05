"use client";

import { Button } from "@/components/ui/button";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
    hero: {
        heroTitle: string;
        heroSubtitle: string;
        heroButtonText: string;
        heroBgImage: string | null;
    };
}

const HeroSection = ({ hero }: HeroSectionProps) => {
    const { openWaitlist } = useWaitlistModal();

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center overflow-hidden bg-background pt-20 pb-20">
            {/* Background Pattern: Dot Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px] pointer-events-none" />

            {/* Abstract Background Blobs */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-200 h-200 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10 opacity-70" />

            <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <span className="inline-block py-3 px-8 rounded-full bg-[#F2F0E9] border border-[#E6E4DD] text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8 shadow-sm">
                        The Future of Work
                    </span>

                    <div className="w-full max-w-[100vw] overflow-hidden px-2 mb-8">
                        <h1 className="text-[11vw] sm:text-[12vw] xl:text-[13vw] font-orbitron font-bold text-primary tracking-tighter leading-none select-none mix-blend-multiply dark:mix-blend-normal">
                            {hero.heroTitle || "oppspaces"}
                        </h1>
                    </div>

                    <p className="text-xl sm:text-3xl lg:text-4xl text-foreground font-medium max-w-3xl mx-auto mb-12 leading-relaxed tracking-tight px-4">
                        {hero.heroSubtitle || "Swipe your next big opportunity. Hiring reimagined for the bold."}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button
                            size="lg"
                            onClick={openWaitlist}
                            className="h-16 px-10 rounded-full text-xl font-bold bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all shadow-xl shadow-black/10"
                        >
                            {hero.heroButtonText || "Get Early Access"}
                        </Button>
                        <Link href="/features">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-16 px-10 rounded-full text-xl font-bold border-2 bg-transparent hover:bg-secondary transition-all"
                            >
                                Features
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
