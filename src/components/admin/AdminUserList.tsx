"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAdminUser, deleteAdminUser, updateAdminUser } from "@/lib/actions";
import { Loader2, Trash2, Edit2, Eye, EyeOff, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface AdminUser {
    id: number;
    email: string;
    createdAt: Date;
}

export function AdminUserList({ users }: { users: AdminUser[] }) {
    const [isPending, startTransition] = useTransition();
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = editingUser 
                ? await updateAdminUser(editingUser.id, formData)
                : await createAdminUser(formData);
                
            if (result.success) {
                toast.success(editingUser ? "Admin updated" : "Admin created");
                setEditingUser(null);
                setShowPassword(false);
                (document.getElementById("admin-form") as HTMLFormElement)?.reset();
            } else {
                toast.error(result.error || `Failed to ${editingUser ? 'update' : 'create'}`);
            }
        });
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to remove this admin?")) return;

        startTransition(async () => {
            const result = await deleteAdminUser(id);
            if (result.success) {
                toast.success("Admin removed");
            } else {
                toast.error(result.error || "Failed to remove");
            }
        });
    }

    return (
        <div className="space-y-8">
            <form id="admin-form" action={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">
                        {editingUser ? `Edit: ${editingUser.email}` : "Add New Sub Admin"}
                    </h2>
                    {editingUser && (
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                                setEditingUser(null);
                                setShowPassword(false);
                            }}
                            className="h-8 px-2"
                        >
                            <X className="mr-1 h-3 w-3" /> Cancel
                        </Button>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        defaultValue={editingUser?.email || ""}
                        key={editingUser?.id || "new"}
                        placeholder="admin@example.com" 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">
                        {editingUser ? "New Password (leave blank to keep current)" : "Password"}
                    </Label>
                    <div className="relative">
                        <Input 
                            id="password" 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            required={!editingUser}
                            placeholder={editingUser ? "••••••••" : "Strong password"} 
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        editingUser ? "Update Administrator" : "Create Admin User"
                    )}
                </Button>
            </form>

            <div className="pt-8 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Current Administrators</h3>
                <div className="space-y-2">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
                            <div>
                                <p className="font-medium">{user.email}</p>
                                <p className="text-xs text-muted-foreground">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:bg-secondary"
                                    onClick={() => {
                                        setEditingUser(user);
                                        setShowPassword(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    disabled={isPending || editingUser?.id === user.id}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDelete(user.id)}
                                    disabled={isPending || editingUser?.id === user.id}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
