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
import { Trash2, Plus, GripVertical, Pencil } from "lucide-react";
import { deleteJob, updateJob } from "@/lib/actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

interface JobListing {
    id: number;
    title: string;
    location: string;
    type: string;
    active: boolean;
    order: number;
}

export default function JobsClient({ initialData }: { initialData: JobListing[] }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: number) => {
        if (!confirm("Are you sure?")) return;
        startTransition(async () => {
            const res = await deleteJob(id);
            if (res.success) toast.success("Deleted");
            else toast.error("Failed to delete");
        });
    };

    const toggleActive = (id: number, current: boolean) => {
        startTransition(async () => {
            const res = await updateJob(id, { active: !current });
            if (res.success) toast.success(current ? "Deactivated" : "Activated");
            else toast.error("Update failed");
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Job Listings</h2>
                    <p className="text-muted-foreground">Manage open positions.</p>
                </div>
                <Link href="/admin/jobs/new">
                    <Button className="gap-2">
                        <Plus size={16} /> Add Job
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-50px"></TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                                    No jobs posted.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialData.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell>
                                        <GripVertical className="text-muted-foreground cursor-move" size={16} />
                                    </TableCell>
                                    <TableCell className="font-medium py-4 text-base">
                                        {job.title}
                                    </TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{job.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={job.active}
                                                onCheckedChange={() => toggleActive(job.id, job.active)}
                                            />
                                            <span className="text-sm text-muted-foreground">
                                                {job.active ? "Active" : "Draft"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/jobs/${job.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil size={18} className="text-muted-foreground hover:text-foreground" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(job.id)}
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
