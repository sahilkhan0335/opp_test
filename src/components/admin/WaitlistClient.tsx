"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Search, Download, Check, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    deleteWaitlistEntry,
    updateWaitlistEntry,
    bulkDeleteWaitlist,
    bulkInviteWaitlist,
} from "@/lib/actions";
import { WaitlistEntry } from "@prisma/client";

interface WaitlistClientProps {
    initialData: WaitlistEntry[];
}

export default function WaitlistClient({ initialData }: WaitlistClientProps) {
    const [data, setData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isPending, startTransition] = useTransition();

    const filteredData = data.filter(
        (item) =>
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString();
    };

    const getRoleLabel = (role: string) => {
        const roleMap: Record<string, string> = {
            looking: "Seeker",
            hiring: "Founder",
            both: "Both",
        };
        return roleMap[role] || role;
    };

    const handleExport = () => {
        if (filteredData.length === 0) {
            toast.error("Nothing to export");
            return;
        }
        const headers = ["ID", "Email", "Role", "Invited", "Date"];
        const rows = filteredData.map((item) => [
            item.id,
            item.email,
            item.role,
            item.invited ? "Yes" : "No",
            item.submittedAt,
        ]);
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "waitlist_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Exported successfully");
    };

    const handleDelete = (id: number) => {
        startTransition(async () => {
            const res = await deleteWaitlistEntry(id);
            if (res.success) {
                setData((prev) => prev.filter((item) => item.id !== id));
                toast.success("Entry deleted");
            } else {
                toast.error("Failed to delete");
            }
        });
    };

    const handleInvite = (id: number) => {
        startTransition(async () => {
            const res = await updateWaitlistEntry(id, { invited: true });
            if (res.success) {
                setData((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, invited: true } : item
                    )
                );
                toast.success("Marked as invited");
            } else {
                toast.error("Failed to update");
            }
        });
    };

    const handleBulkDelete = () => {
        startTransition(async () => {
            const res = await bulkDeleteWaitlist(selectedItems);
            if (res.success) {
                setData((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
                setSelectedItems([]);
                toast.success("Bulk delete successful");
            } else {
                toast.error("Failed to delete");
            }
        });
    };

    const handleBulkInvite = () => {
        startTransition(async () => {
            const res = await bulkInviteWaitlist(selectedItems);
            if (res.success) {
                setData((prev) =>
                    prev.map((item) =>
                        selectedItems.includes(item.id) ? { ...item, invited: true } : item
                    )
                );
                setSelectedItems([]);
                toast.success("Bulk invite successful");
            } else {
                toast.error("Failed to invite");
            }
        });
    };

    const toggleSelect = (id: number) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === filteredData.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredData.map((item) => item.id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-orbitron text-foreground">
                        Waitlist Management
                    </h1>
                    <p className="text-muted-foreground">Manage all waitlist signups</p>
                </div>
                <Button onClick={handleExport} size="sm">
                    <Download className="mr-2" size={16} />
                    Export CSV
                </Button>
            </div>

            <Card className="p-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                    <div className="relative w-full md:w-96">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            size={16}
                        />
                        <Input
                            placeholder="Search by email or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    {selectedItems.length > 0 && (
                        <div className="flex gap-2">
                            <Button onClick={handleBulkInvite} size="sm" variant="outline">
                                <Check className="mr-2" size={16} />
                                Mark Invited ({selectedItems.length})
                            </Button>
                            <Button onClick={handleBulkDelete} size="sm" variant="destructive">
                                <Trash2 className="mr-2" size={16} />
                                Delete ({selectedItems.length})
                            </Button>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={
                                            filteredData.length > 0 &&
                                            selectedItems.length === filteredData.length
                                        }
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        No entries found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.includes(item.id)}
                                                onCheckedChange={() => toggleSelect(item.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                                                {getRoleLabel(item.role)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {item.invited ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                                    Invited
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                    Pending
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>{formatDate(item.submittedAt)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {!item.invited && (
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="h-8 w-8"
                                                        onClick={() => handleInvite(item.id)}
                                                    >
                                                        <Check size={14} />
                                                    </Button>
                                                )}
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    className="h-8 w-8"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
