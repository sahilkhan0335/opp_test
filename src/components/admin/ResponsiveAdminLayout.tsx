"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AdminSidebar from "./AdminSidebar";

export default function ResponsiveAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-stone-50/50 dark:bg-black overflow-x-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Mobile Sidebar (Drawer) */}
            <div className="lg:hidden">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetContent side="left" className="p-0 w-72 border-none">
                        <AdminSidebar onLinkClick={() => setIsSidebarOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Bar */}
                <header className="h-20 border-b border-white/10 bg-card/40 backdrop-blur-3xl flex items-center justify-between px-6 lg:hidden sticky top-0 z-50">
                    <h1 className="text-2xl font-orbitron font-bold text-foreground tracking-tighter">oppspaces</h1>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsSidebarOpen(true)}
                        className="h-12 w-12 rounded-xl bg-primary/10 text-primary"
                    >
                        <Menu size={28} />
                    </Button>
                </header>

                <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto max-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
