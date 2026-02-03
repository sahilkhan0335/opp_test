"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { submitApplication } from "@/lib/actions";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface JobListing {
    id: number;
    title: string;
    location: string;
    type: string;
}

export function ApplyJobDialog({ job, trigger }: { job: JobListing; trigger: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("jobTitle", job.title);

        console.log("Submitting application for:", job.title); // Debug log

        startTransition(async () => {
            try {
                const result = await submitApplication(formData);
                console.log("Submission result:", result);

                if (result.success) {
                    toast.success("Application Received!", {
                        description: "We'll review your profile and get back to you.",
                    });
                    setOpen(false);
                } else {
                    toast.error("Submission Failed", {
                        description: result.error || "Please try again later.",
                    });
                }
            } catch (err) {
                console.error("Submission exception:", err);
                toast.error("Something went wrong", {
                    description: "Please check your connection and try again.",
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-background border-none shadow-2xl rounded-[2rem] [&>button]:hidden">
                <div className="relative flex flex-col max-h-[90vh]">
                    {/* Custom Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                    </button>

                    <div className="flex-1 overflow-y-auto p-8 md:p-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Header */}
                        <DialogHeader className="mb-12 text-left space-y-6">
                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-bold uppercase tracking-wider">
                                    {job.type} <span className="text-primary">•</span> {job.location}
                                </span>
                            </div>
                            <DialogTitle className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
                                Join as <br />
                                <span className="text-primary font-orbitron">{job.title}</span>
                            </DialogTitle>
                            <p className="text-xl text-muted-foreground font-medium max-w-lg">
                                Share your details and let's build something great together.
                            </p>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-base font-semibold ml-1 text-foreground/80">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        className="h-16 px-6 rounded-2xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-lg shadow-sm"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-base font-semibold ml-1 text-foreground/80">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="h-16 px-6 rounded-2xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-lg shadow-sm"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-base font-semibold ml-1 text-foreground/80">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    required
                                    className="h-16 px-6 rounded-2xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-lg shadow-sm"
                                    placeholder="+91 98765 43210"
                                    type="tel"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="resume" className="text-base font-semibold ml-1 text-foreground/80">Resume Link</Label>
                                <Input
                                    id="resume"
                                    name="resume"
                                    required
                                    className="h-16 px-6 rounded-2xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-lg shadow-sm"
                                    placeholder="G-Drive / Dropbox / LinkedIn PDF"
                                />
                                <p className="text-sm font-medium text-muted-foreground ml-1">Please ensure the link is publicly accessible.</p>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="portfolio" className="text-base font-semibold ml-1 text-foreground/80">Portfolio (Optional)</Label>
                                <Input
                                    id="portfolio"
                                    name="portfolio"
                                    className="h-16 px-6 rounded-2xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-lg shadow-sm"
                                    placeholder="https://your-portfolio.com"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="coverLetter" className="text-base font-semibold ml-1 text-foreground/80">Why OppSpaces?</Label>
                                <Textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    rows={4}
                                    className="p-6 rounded-2xl bg-secondary/30 border-transparent hover:bg-secondary/50 focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all resize-none text-lg shadow-sm"
                                    placeholder="Tell us a bit about yourself and why you'd be a great fit..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-20 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-bold transition-all shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] mt-6 flex items-center justify-between px-8"
                            >
                                <span>Submit Application</span>
                                {isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
                            </Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
