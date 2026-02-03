
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = await prisma.jobListing.findUnique({
        where: { id: parseInt(id) },
    });

    if (!job || !job.active) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header Hero */}
            <div className="bg-secondary/30 pt-32 pb-20 rounded-b-[3rem] px-6 lg:px-20 relative overflow-hidden">
                <Link href="/careers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to careers
                </Link>

                <div className="max-w-4xl">
                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50 text-sm font-medium">
                            <Briefcase size={16} />
                            {job.type}
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50 text-sm font-medium">
                            <MapPin size={16} />
                            {job.location}
                        </span>
                        {job.salaryRange && (
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50 text-sm font-medium">
                                <Clock size={16} />
                                {job.salaryRange}
                            </span>
                        )}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">{job.title}</h1>

                    <Button size="lg" className="rounded-full text-xl px-10 py-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20">
                        Apply for this Role
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-20 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold mb-8">Role Description</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-xl leading-relaxed text-muted-foreground">
                        {/* We are treating description as plain text for now, but could be markdown */}
                        {job.description.split('\n').map((paragraph: string, i: number) => (
                            paragraph.trim() && <p key={i} className="mb-6">{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-16 pt-16 border-t border-border">
                        <h3 className="text-2xl font-bold mb-6">Ready to join?</h3>
                        <Button size="lg" className="rounded-full text-lg px-10 py-7 bg-foreground text-background hover:bg-primary hover:text-white transition-colors">
                            Apply Now
                        </Button>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-32 p-8 rounded-3xl bg-card border border-border/50">
                        <h3 className="text-xl font-bold mb-6">About this role</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center py-3 border-b border-border/30">
                                <span className="text-muted-foreground">Department</span>
                                <span className="font-medium">Engineering</span>
                            </li>
                            <li className="flex justify-between items-center py-3 border-b border-border/30">
                                <span className="text-muted-foreground">Location</span>
                                <span className="font-medium">{job.location}</span>
                            </li>
                            <li className="flex justify-between items-center py-3 border-b border-border/30">
                                <span className="text-muted-foreground">Type</span>
                                <span className="font-medium">{job.type}</span>
                            </li>
                            <li className="flex justify-between items-center py-3 pt-3">
                                <span className="text-muted-foreground">Posted</span>
                                <span className="font-medium">Recently</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
