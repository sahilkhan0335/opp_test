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
import { Trash2, ExternalLink, Mail, Phone, FileText } from "lucide-react";
import { deleteCareerApplication, updateCareerApplication } from "@/lib/actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Application {
    id: number;
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    resume: string;
    portfolio?: string | null;
    coverLetter: string | null;
    status: string;
    submittedAt: Date;
}

export default function CareersClient({ initialData }: { initialData: Application[] }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: number) => {
        if (!confirm("Are you sure?")) return;
        startTransition(async () => {
            const res = await deleteCareerApplication(id);
            if (res.success) toast.success("Deleted");
            else toast.error("Failed to delete");
        });
    };

    const updateStatus = (id: number, newStatus: string) => {
        startTransition(async () => {
            const res = await updateCareerApplication(id, { status: newStatus });
            if (res.success) toast.success("Status updated");
            else toast.error("Update failed");
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
                <p className="text-muted-foreground">Review and manage job applications.</p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Applied Date</TableHead>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>Links</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                                    No applications yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialData.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(app.submittedAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium text-base">{app.name}</div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                            <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>
                                            <span className="flex items-center gap-1"><Phone size={12} /> {app.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal border-primary/20 bg-primary/5 text-primary">
                                            {app.jobTitle}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 items-start">
                                            <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-blue-500 hover:underline">
                                                <FileText size={12} /> Resume
                                            </a>
                                            {app.portfolio && (
                                                <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-purple-500 hover:underline">
                                                    <ExternalLink size={12} /> Portfolio
                                                </a>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`
                                            ${app.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20' : ''}
                                            ${app.status === 'Reviewed' ? 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20' : ''}
                                            ${app.status === 'Rejected' ? 'bg-red-500/10 text-red-600 hover:bg-red-500/20' : ''}
                                            ${app.status === 'Interview' ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' : ''}
                                        `}>
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm">View Cover Letter</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Cover Letter - {app.name}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground mt-4 p-4 bg-secondary/50 rounded-lg">
                                                        {app.coverLetter || "No cover letter provided."}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(app.id)}
                                                className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                        <div className="mt-2 text-xs flex justify-end gap-1">
                                            <button onClick={() => updateStatus(app.id, "Reviewed")} className="hover:underline text-blue-500">Review</button>
                                            <button onClick={() => updateStatus(app.id, "Interview")} className="hover:underline text-green-500">Interview</button>
                                            <button onClick={() => updateStatus(app.id, "Rejected")} className="hover:underline text-red-500">Reject</button>
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
