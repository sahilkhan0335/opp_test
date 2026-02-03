"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2,  CheckCircle, XCircle } from "lucide-react";
import { deleteContactSubmission, updateContactSubmission } from "@/lib/actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";


interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    type: string;
    message: string;
    resolved: boolean;
    submittedAt: Date;
}

export default function ContactClient({ initialData }: { initialData: ContactSubmission[] }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: number) => {
        if (!confirm("Are you sure?")) return;
        startTransition(async () => {
            const res = await deleteContactSubmission(id);
            if (res.success) toast.success("Deleted");
            else toast.error("Failed to delete");
        });
    };

    const toggleStatus = (id: number, currentStatus: boolean) => {
        startTransition(async () => {
            const res = await updateContactSubmission(id, { resolved: !currentStatus });
            if (res.success) toast.success(currentStatus ? "Marked pending" : "Marked resolved");
            else toast.error("Update failed");
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
                <p className="text-muted-foreground">Manage contact form submissions.</p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="w-[40%]">Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                                    No messages yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="whitespace-nowrap text-muted-foreground">
                                        {format(new Date(item.submittedAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-sm text-muted-foreground">{item.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {item.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm leading-relaxed">
                                        {item.message}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {item.resolved ? (
                                                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Resolved</Badge>
                                            ) : (
                                                <Badge variant="secondary">Pending</Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => toggleStatus(item.id, item.resolved)}
                                                className={item.resolved ? "text-muted-foreground hover:text-orange-500" : "text-muted-foreground hover:text-green-500"}
                                                title={item.resolved ? "Mark as pending" : "Mark as resolved"}
                                            >
                                                {item.resolved ? <XCircle size={18} /> : <CheckCircle size={18} />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(item.id)}
                                                className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
