"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";

const Header = () => {
    const pathname = usePathname();
    const { openWaitlist } = useWaitlistModal();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    const navLinks = [
        { to: "/features", label: "Features" },
        { to: "/about", label: "About" },
        { to: "/careers", label: "Careers" },
        { to: "/faq", label: "FAQ" },
        { to: "/contact", label: "Contact" },
    ];

    return (
        <motion.header
            className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-20">
                <div className="flex items-center justify-between h-20">
                    <Link
                        href="/"
                        className="flex items-center hover:opacity-80 transition-opacity"
                    >
                        <span className="text-2xl font-orbitron font-semibold text-foreground">
                            oppspaces
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                href={link.to}
                                className={`text-foreground hover:text-primary transition-colors relative group ${pathname === link.to ? "text-primary" : ""}`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === link.to ? "w-full" : "w-0"}`}></span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={openWaitlist}
                            className="hidden lg:flex bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full px-6 py-5 transition-all hover:scale-105"
                        >
                            Join Waitlist
                        </Button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-background border-t border-border overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6">
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.to}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.to}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block py-3 text-lg transition-colors border-b border-border ${pathname === link.to ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                            <Button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    openWaitlist();
                                }}
                                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 shadow-soft"
                            >
                                Join the Waitlist →
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
