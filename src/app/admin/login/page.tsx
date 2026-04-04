"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast.error("Invalid credentials");
            } else {
                toast.success("Identity verified");
                router.push("/admin/dashboard");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F4F1] dark:bg-black p-6 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[480px] relative z-10"
            >
                <div className="glass-card p-12 rounded-[3rem] shadow-2xl relative">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-6 ring-1 ring-primary/20 shadow-inner">
                            <ShieldCheck size={40} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-orbitron font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent mb-3">Admin Core</h1>
                        <p className="text-muted-foreground font-medium">
                            Authorized personnel only
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest ml-1 opacity-50">Email Access</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@opp.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:ring-4 focus:ring-primary/5 transition-all px-6 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest ml-1 opacity-50">Security Key</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:ring-4 focus:ring-primary/5 transition-all px-6 pr-14 text-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            ) : (
                                "Initiate Session"
                            )}
                        </Button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground/40 font-bold uppercase tracking-[0.3em]">
                        oppspaces security nexus
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
