"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Briefcase,
    Settings,
    LogOut,
    FileText,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
    const pathname = usePathname();

    const links = [
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/waitlist", label: "Waitlist", icon: Users },
        { href: "/admin/contact", label: "Messages", icon: MessageSquare },
        { href: "/admin/careers", label: "Applications", icon: Briefcase },
        { href: "/admin/jobs", label: "Jobs", icon: FileText },
        { href: "/admin/faq", label: "FAQs", icon: HelpCircle },
        { href: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="w-72 bg-card/80 backdrop-blur-xl border-r border-border/50 min-h-screen flex flex-col sticky top-0 h-screen">
            <div className="p-8 mb-4">
                <h1 className="text-3xl font-orbitron font-bold text-foreground tracking-tighter mb-1">
                    oppspaces
                </h1>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium border border-border/50 px-2 py-1 rounded-md inline-block">
                    Admin Panel
                </span>
            </div>

            <nav className="flex-1 space-y-2 px-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium duration-300 ${isActive
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-[1.02]"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "stroke-[2.5px]" : "stroke-2"} />
                            <span className="text-sm tracking-wide">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-border/50 bg-secondary/20">
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-14 px-6 rounded-2xl transition-colors group"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                >
                    <div className="p-2 rounded-lg bg-background group-hover:bg-destructive/10 transition-colors">
                        <LogOut size={18} />
                    </div>
                    <span className="font-medium">Sign Out</span>
                </Button>
            </div>
        </div>
    );
};

export default AdminSidebar;
