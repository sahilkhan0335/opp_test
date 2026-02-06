"use client";

import { motion } from "framer-motion";

const StatsSection = () => {
    const stats = [
        { number: "200K+", label: "Swipes", icon: "❤️" },
        { number: "12K+", label: "Matches", icon: "✨" },
        { number: "8K+", label: "Meetings Booked", icon: "📅" },
        { number: "500+", label: "Companies", icon: "🏢" },
    ];

    return (
        <section className="py-24 sm:py-32 border-b border-border/50">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="relative group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                            >
                                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tighter feature-number">
                                    {stat.number}
                                </div>
                                <div className="text-xl text-muted-foreground font-medium border-t-2 border-primary/20 pt-4 max-w-100px group-hover:border-primary transition-colors duration-500">
                                    {stat.label}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;
