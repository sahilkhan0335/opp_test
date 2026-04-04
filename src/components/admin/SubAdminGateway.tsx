"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Shield, XCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function SubAdminGateway({ children }: { children: React.ReactNode }) {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password === "GauravBhagat2001") {
            setIsAuthorized(true);
            setError(false);
            toast.success("Access Granted", {
                description: "You now have permission to manage administrators."
            });
        } else {
            setError(true);
            toast.error("Access Denied", {
                description: "Incorrect password. Please try again."
            });
        }
    };

    if (isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <Card className="w-full max-w-md p-10 border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[2.5rem]">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Lock className="text-primary" size={32} />
                </div>
                
                <h2 className="text-3xl font-orbitron font-bold mb-4">Security Gateway</h2>
                <p className="text-muted-foreground mb-10 text-lg">
                    This section contains sensitive administrator data. Please enter the master password to proceed.
                </p>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="relative group">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Master Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            className={`h-16 px-6 pr-14 rounded-2xl bg-secondary/30 border-transparent transition-all text-center text-xl tracking-widest focus:bg-background focus:ring-4 focus:ring-primary/5 ${
                                error ? "border-destructive ring-destructive/10 ring-4" : ""
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                        {error && (
                            <div className="absolute -bottom-6 left-0 w-full flex items-center justify-center gap-2 text-destructive text-sm font-bold animate-in slide-in-from-top-2">
                                <XCircle size={14} /> Invalid Password
                            </div>
                        )}
                    </div>
                    
                    <Button 
                        type="submit" 
                        className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Shield className="mr-2" size={20} /> Verify & Access
                    </Button>
                </form>

                <p className="mt-12 text-xs text-muted-foreground uppercase tracking-widest font-medium opacity-50">
                    Your authorization will reset once you leave this page.
                </p>
            </Card>
        </div>
    );
}
