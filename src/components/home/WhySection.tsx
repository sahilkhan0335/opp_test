"use client";

import { motion } from "framer-motion";

const WhySection = () => {
    const features = [
        {
            title: "Swipe, don't scroll",
            description:
                "Discover opportunities with a simple swipe. Intuitive matching that feels natural, not tedious.",
            image:
                "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
            icon: "❤️",
        },
        {
            title: "Reels over resumes",
            description:
                "Show your personality and skills in 30-second videos. Be authentic, be memorable.",
            image:
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
            icon: "🎥",
        },
        {
            title: "Meet in one tap",
            description: (
                <>
                    Skip the email chains. Schedule meetings instantly with <span className="font-orbitron font-semibold">oppspaces</span> booking.
                </>
            ),
            image:
                "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
            icon: "📅",
        },
    ];

    return (
        <section className="py-32 sm:py-40 bg-secondary">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 text-foreground">
                        Why creators & founders choose us
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Built for the way modern professionals actually work
                    </p>
                </motion.div>

                <div className="space-y-24 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-80 object-cover"
                                    />
                                </div>
                            </div>
                            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-3xl font-semibold mb-4 text-foreground">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhySection;
