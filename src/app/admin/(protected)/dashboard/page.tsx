import { prisma } from "@/lib/db";
import { Users, Mail, Briefcase, TrendingUp } from "lucide-react";
import { WaitlistEntry, ContactSubmission } from "@prisma/client";

async function getStats() {
    const totalWaitlist = await prisma.waitlistEntry.count();
    const contactSubmissions = await prisma.contactSubmission.count();
    const careerApplications = await prisma.careerApplication.count();

    // Today's signups
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todaySignups = await prisma.waitlistEntry.count({
        where: {
            submittedAt: {
                gte: startOfDay
            }
        }
    });

    return {
        totalWaitlist,
        contactSubmissions,
        careerApplications,
        todaySignups
    };
}

async function getRecentActivity() {
    const waitlist = await prisma.waitlistEntry.findMany({
        take: 5,
        orderBy: { submittedAt: 'desc' }
    });

    const contacts = await prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { submittedAt: 'desc' }
    });

    const activity = [
        ...waitlist.map((w: WaitlistEntry) => ({
            id: w.id.toString(),
            type: "waitlist",
            label: "Waitlist signup",
            description: `${w.email} (${w.role})`,
            date: w.submittedAt
        })),
        ...contacts.map((c: ContactSubmission) => ({
            id: c.id.toString(),
            type: "contact",
            label: "Contact message",
            description: `${c.email} - ${c.type}`,
            date: c.submittedAt
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

    return activity;
}

const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        {children}
    </div>
);

export default async function DashboardPage() {
    const stats = await getStats();
    const recentActivity = await getRecentActivity();

    return (
        <PageTransition>
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-6xl font-orbitron font-bold tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                            System Overview
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live platform metrics and activity
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats Card 1 */}
                    <div className="glass-card glass-card-hover p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 text-primary ring-1 ring-primary/20 shadow-inner">
                                <Users size={32} />
                            </div>
                            <div>
                                <p className="text-5xl font-orbitron font-bold tracking-tight mb-2">{stats.totalWaitlist}</p>
                                <p className="text-sm font-bold uppercase tracking-widest opacity-40">Total Waitlist</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card 2 */}
                    <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/30 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 text-white ring-1 ring-white/30 backdrop-blur-md">
                                <Mail size={32} />
                            </div>
                            <div>
                                <p className="text-5xl font-orbitron font-bold tracking-tight text-white mb-2">{stats.contactSubmissions}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/60">Contact Inquiries</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card 3 */}
                    <div className="glass-card glass-card-hover p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div className="bg-foreground/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 text-foreground ring-1 ring-foreground/10 shadow-inner">
                                <Briefcase size={32} />
                            </div>
                            <div>
                                <p className="text-5xl font-orbitron font-bold tracking-tight mb-2">{stats.careerApplications}</p>
                                <p className="text-sm font-bold uppercase tracking-widest opacity-40">Applications</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card 4 */}
                    <div className="glass-card glass-card-hover p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 text-emerald-600 ring-1 ring-emerald-500/20 shadow-inner">
                                <TrendingUp size={32} />
                            </div>
                            <div>
                                <p className="text-5xl font-orbitron font-bold tracking-tight text-emerald-600 mb-2">{stats.todaySignups}</p>
                                <p className="text-sm font-bold uppercase tracking-widest text-emerald-600/40">Today's Signups</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-[250px] -mt-[250px] pointer-events-none" />
                    <h2 className="text-3xl font-orbitron font-bold mb-10 tracking-tight flex items-center gap-4 relative z-10">
                        Recent Activity
                        <span className="h-0.5 flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </h2>
                    <div className="space-y-4 relative z-10">
                        {recentActivity.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="text-muted-foreground text-lg">No system activity logs found.</p>
                            </div>
                        ) : (
                            recentActivity.map((item, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between group p-6 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/20 dark:hover:border-white/5 hover:shadow-xl hover:shadow-black/5">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-4 h-4 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] ${
                                            item.type === 'waitlist' ? 'bg-primary animate-pulse' : 'bg-blue-500'
                                        }`} />
                                        <div>
                                            <p className="font-bold text-xl text-foreground tracking-tight">{item.label}</p>
                                            <p className="text-muted-foreground font-medium opacity-70">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-muted-foreground/40 mt-4 sm:mt-0 px-4 py-1.5 rounded-full bg-secondary/30">
                                        {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.date).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
