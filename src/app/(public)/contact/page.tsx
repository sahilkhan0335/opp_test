"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { submitContact } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2} from "lucide-react";

export default function Contact() {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.type) {
            toast.error("Please select a user type");
            return;
        }

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("type", formData.type);
        payload.append("message", formData.message);

        startTransition(async () => {
            const result = await submitContact(payload);
            if (result.success) {
                toast.success("Message sent!", {
                    description: "We'll get back to you within 24 hours.",
                });
                setFormData({ name: "", email: "", type: "", message: "" });
            } else {
                toast.error("Failed to send", {
                    description: result.error || "Please try again later.",
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-black pt-32 pb-20">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left Side: Copy */}
                    <div className="lg:sticky lg:top-32">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl sm:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
                        >
                            Let's start a <br />
                            <span className="font-orbitron text-primary">conversation.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-12 max-w-lg"
                        >
                            <p className="text-xl font-medium leading-relaxed text-muted-foreground">
                                Whether you're a founder, talent, or partner, we're here to help you build the future.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
                                    <h3 className="text-lg font-bold mb-1">Email Us</h3>
                                    <a href="mailto:hello@oppspaces.in" className="text-muted-foreground hover:text-primary transition-colors">hello@oppspaces.in</a>
                                </div>
                                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
                                    <h3 className="text-lg font-bold mb-1">Visit Us</h3>
                                    <p className="text-muted-foreground">Bangalore, KA</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-card p-8 sm:p-12 rounded-[2rem] shadow-2xl shadow-black/5 border border-border/50 relative overflow-hidden"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-semibold ml-1 text-foreground/80">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Jane Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="h-14 px-6 rounded-xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-semibold ml-1 text-foreground/80">Work Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="jane@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="h-14 px-6 rounded-xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type" className="text-sm font-semibold ml-1 text-foreground/80">I am a...</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(val) => setFormData({ ...formData, type: val })}
                                        required
                                    >
                                        <SelectTrigger className="h-14 px-6 rounded-xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-base">
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="founder">Founder hiring talent</SelectItem>
                                            <SelectItem value="talent">Talent seeking work</SelectItem>
                                            <SelectItem value="investor">Investor / Partner</SelectItem>
                                            <SelectItem value="fan">Fan / Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-sm font-semibold ml-1 text-foreground/80">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={5}
                                        className="p-6 rounded-2xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all resize-none text-base"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-16 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 mt-4"
                                >
                                    {isPending ? (
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
