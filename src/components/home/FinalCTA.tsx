"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";
import Link from "next/link";

const FinalCTA = () => {
    const { openWaitlist } = useWaitlistModal();
    return (
        <section className="py-24 sm:py-32 container mx-auto px-6 lg:px-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-primary rounded-[3rem] p-12 sm:p-24 text-center overflow-hidden relative"
            >
                {/* Abstract background shape */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-800px h-800px border-100px border-white rounded-full blur-3xl opacity-50" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 text-white tracking-tighter leading-[0.9]">
                        Ready to start?
                    </h2>

                    <p className="text-xl sm:text-3xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join thousands of creators building their careers the modern way.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button
                            size="lg"
                            onClick={openWaitlist}
                            className="bg-white text-primary hover:bg-white/90 text-xl px-10 py-8 rounded-full shadow-2xl transition-transform hover:scale-105"
                        >
                            Join the Waitlist
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-xl px-10 py-8 rounded-full transition-all"
                        >
                            <Link href="/features">See Features</Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FinalCTA;
