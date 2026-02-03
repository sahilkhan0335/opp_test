import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
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

export default async function DashboardPage() {
    const stats = await getStats();
    const recentActivity = await getRecentActivity();

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                    Dashboard
                </h1>
                <p className="text-xl text-muted-foreground font-medium">
                    Overview of platform activity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-8 rounded-[2rem] bg-stone-100 border-none shadow-none hover:shadow-md transition-all">
                    <div className="flex flex-col h-full justify-between">
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-foreground">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-4xl font-bold tracking-tight mb-2">{stats.totalWaitlist}</p>
                            <p className="text-muted-foreground font-medium">Total Waitlist</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-8 rounded-[2rem] bg-primary text-white border-none shadow-md hover:shadow-lg transition-all">
                    <div className="flex flex-col h-full justify-between">
                        <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white">
                            <Mail size={28} />
                        </div>
                        <div>
                            <p className="text-4xl font-bold tracking-tight mb-2">{stats.contactSubmissions}</p>
                            <p className="text-white/80 font-medium">Contact Msgs</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-8 rounded-[2rem] bg-stone-100 border-none shadow-none hover:shadow-md transition-all">
                    <div className="flex flex-col h-full justify-between">
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-foreground">
                            <Briefcase size={28} />
                        </div>
                        <div>
                            <p className="text-4xl font-bold tracking-tight mb-2">{stats.careerApplications}</p>
                            <p className="text-muted-foreground font-medium">Applications</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-8 rounded-[2rem] bg-white border-border shadow-soft hover:shadow-md transition-all">
                    <div className="flex flex-col h-full justify-between">
                        <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <p className="text-4xl font-bold tracking-tight mb-2">{stats.todaySignups}</p>
                            <p className="text-muted-foreground font-medium">Today's Signups</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-8 rounded-[2.5rem] border-none shadow-soft bg-white">
                <h2 className="text-2xl font-bold mb-8 tracking-tight">Recent Activity</h2>
                <div className="space-y-6">
                    {recentActivity.length === 0 ? (
                        <p className="text-muted-foreground py-8">No activity yet.</p>
                    ) : (
                        recentActivity.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between group p-4 rounded-xl hover:bg-secondary/30 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`w-3 h-3 rounded-full mt-2 ${item.type === 'waitlist' ? 'bg-primary' : 'bg-blue-500'}`} />
                                    <div>
                                        <p className="font-bold text-lg text-foreground">{item.label}</p>
                                        <p className="text-muted-foreground font-medium">{item.description}</p>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-muted-foreground mt-2 sm:mt-0 pl-7 sm:pl-0">
                                    {item.date.toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
}
