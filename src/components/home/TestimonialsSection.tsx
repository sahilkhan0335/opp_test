"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Content Creator, Mumbai",
            quote:
                "Finally found a platform that lets me show who I really am. Got three amazing offers in my first week.",
            image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        },
        {
            name: "Rahul Verma",
            role: "Startup Founder, Bangalore",
            quote:
                "Hired my entire founding team through 30-second reels. Saw their passion, not just their resumes.",
            image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        },
        {
            name: "Ananya Iyer",
            role: "Marketing Lead, Delhi",
            quote: (
                <>
                    <span className="font-orbitron font-semibold">oppspaces</span> changed everything. Booked 10 meetings in one day with zero back-and-forth emails.
                </>
            ),
            image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        },
    ];

    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-2xl"
                >
                    <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground tracking-tighter">
                        Trusted by thousands
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Real stories from real people building their careers
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            whileHover={{ y: -8 }}
                        >
                            <Card className="p-8 bg-secondary shadow-sm hover:shadow-md transition-all rounded-3xl border-none h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                         width={64}
  height={64}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-foreground">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-foreground leading-relaxed italic">
                                    "{testimonial.quote}"
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
