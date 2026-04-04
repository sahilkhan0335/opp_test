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
    HelpCircle,
    UserPlus,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AdminSidebar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "View Public Site", icon: ExternalLink },
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/users", label: "Sub Admin", icon: UserPlus },
        { href: "/admin/waitlist", label: "Waitlist", icon: Users },
        { href: "/admin/contact", label: "Messages", icon: MessageSquare },
        { href: "/admin/careers", label: "Applications", icon: Briefcase },
        { href: "/admin/jobs", label: "Jobs", icon: FileText },
        { href: "/admin/faq", label: "FAQs", icon: HelpCircle },
        { href: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="w-80 bg-card/40 backdrop-blur-3xl border-r border-white/10 min-h-screen flex flex-col sticky top-0 h-screen shadow-2xl z-50">
            <div className="p-10 mb-6">
                <Link href="/admin/dashboard" className="group">
                    <h1 className="text-4xl font-orbitron font-bold text-foreground tracking-tighter mb-2 group-hover:text-primary transition-colors">
                        oppspaces
                    </h1>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-primary/80 uppercase tracking-[0.3em] font-bold bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                        Admin Core
                    </span>
                </div>
            </div>

            <nav className="flex-1 space-y-2 px-6">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold duration-300 group relative ${isActive
                                ? "bg-primary text-white shadow-[0_8px_20px_-4px_rgba(255,87,92,0.4)] scale-[1.02]"
                                : "text-foreground/80 hover:bg-white/10 dark:hover:bg-white/5 hover:text-foreground hover:translate-x-1"
                                }`}
                            onClick={onLinkClick}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 bg-primary rounded-2xl -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Icon size={20} className={isActive ? "stroke-[2.5px]" : "stroke-2 group-hover:scale-110 transition-transform"} />
                            <span className="text-sm tracking-tight">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-8 mt-auto border-t border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md">
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-4 text-foreground/60 hover:text-destructive hover:bg-destructive/10 h-16 px-6 rounded-2xl transition-all group overflow-hidden relative"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                >
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-destructive scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    <div className="p-2.5 rounded-xl bg-background/50 group-hover:bg-destructive/20 transition-all group-hover:rotate-12">
                        <LogOut size={18} />
                    </div>
                    <span className="font-bold tracking-tight">System Sign Out</span>
                </Button>
            </div>
        </div>
    );
};

export default AdminSidebar;
