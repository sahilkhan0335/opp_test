"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import confetti from "canvas-confetti";
import { submitWaitlist } from "@/lib/actions";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
    const [isPending, startTransition] = useTransition();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (formData: FormData) => {
        setError("");
        startTransition(async () => {
            const result = await submitWaitlist(formData);
            if (result.success) {
                setSubmitted(true);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#FF5A5F", "#00AA88", "#FFD700"],
                });
            } else {
                setError(result.error || "Something went wrong.");
            }
        });
    };

    const handleClose = () => {
        setSubmitted(false);
        setError("");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-background rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                                title="Close"
                            >
                                <X size={24} />
                            </button>

                            {!submitted ? (
                                <>
                                    <h2 className="text-3xl font-bold text-foreground mb-3">
                                        Be the first to swipe your next big opportunity
                                    </h2>
                                    <p className="text-muted-foreground mb-8">
                                        We're launching very soon. Drop your email and role – we'll send you
                                        early access + a surprise gift 🎁
                                    </p>

                                    <form action={handleSubmit} className="space-y-6">
                                        <div>
                                            <Label htmlFor="email" className="text-foreground mb-2 block">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                required
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="role" className="text-foreground mb-2 block">
                                                I am...
                                            </Label>
                                            <Select name="role" required>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="looking">
                                                        I'm looking for opportunities
                                                    </SelectItem>
                                                    <SelectItem value="hiring">
                                                        I'm hiring/posting opportunities
                                                    </SelectItem>
                                                    <SelectItem value="both">Both</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {error && <p className="text-red-500 text-sm">{error}</p>}

                                        <Button
                                            type="submit"
                                            disabled={isPending}
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg shadow-soft-lg hover:scale-105 transition-all text-lg font-semibold"
                                        >
                                            {isPending ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Securing...
                                                </>
                                            ) : (
                                                "Secure My Spot"
                                            )}
                                        </Button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="text-6xl mb-6">🎉</div>
                                    <h3 className="text-3xl font-bold text-foreground mb-3">
                                        You're in!
                                    </h3>
                                    <p className="text-xl text-muted-foreground mb-8">
                                        We've added you to the exclusive list.
                                    </p>
                                    <Button
                                        onClick={handleClose}
                                        variant="outline"
                                        className="border-2 border-border hover:bg-secondary"
                                    >
                                        Close
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WaitlistModal;
