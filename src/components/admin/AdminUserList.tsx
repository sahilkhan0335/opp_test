"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAdminUser, deleteAdminUser } from "@/lib/actions";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface AdminUser {
    id: number;
    email: string;
    createdAt: Date;
}

export function AdminUserList({ users }: { users: AdminUser[] }) {
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await createAdminUser(formData);
            if (result.success) {
                toast.success("Admin created");
                // Reset form manually or use ref
                (document.getElementById("create-admin-form") as HTMLFormElement)?.reset();
            } else {
                toast.error(result.error || "Failed to create");
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
            <form id="create-admin-form" action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="admin@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required placeholder="Strong password" />
                </div>
                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Admin User"}
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
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(user.id)}
                                disabled={isPending}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
