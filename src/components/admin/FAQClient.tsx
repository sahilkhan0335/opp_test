"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { createFAQ, updateFAQ, deleteFAQ } from "@/lib/actions";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export function FAQClient({ faqs }: { faqs: FAQ[] }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ question: "", answer: "" });
    const [isPending, startTransition] = useTransition();

    const openCreate = () => {
        setEditingId(null);
        setFormData({ question: "", answer: "" });
        setIsDialogOpen(true);
    };

    const openEdit = (faq: FAQ) => {
        setEditingId(faq.id);
        setFormData({ question: faq.question, answer: faq.answer });
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (!formData.question || !formData.answer) {
            toast.error("Please fill in all fields");
            return;
        }

        startTransition(async () => {
            let result;
            if (editingId) {
                result = await updateFAQ(editingId, formData);
            } else {
                result = await createFAQ(formData);
            }

            if (result.success) {
                toast.success(editingId ? "FAQ updated" : "FAQ created");
                setIsDialogOpen(false);
            } else {
                toast.error(result.error || "Operation failed");
            }
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Are you sure you want to delete this FAQ?")) return;

        startTransition(async () => {
            const result = await deleteFAQ(id);
            if (result.success) {
                toast.success("FAQ deleted");
            } else {
                toast.error("Failed to delete");
            }
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">FAQ Management</h2>
                    <p className="text-muted-foreground">Add, edit, or remove frequently asked questions.</p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus size={16} /> Add FAQ
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-300px">Question</TableHead>
                            <TableHead>Answer</TableHead>
                            <TableHead className="w-100px text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faqs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center h-32 text-muted-foreground">
                                    No FAQs found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            faqs.map((faq) => (
                                <TableRow key={faq.id}>
                                    <TableCell className="font-medium align-top py-4">{faq.question}</TableCell>
                                    <TableCell className="text-muted-foreground align-top py-4 whitespace-pre-wrap">{faq.answer}</TableCell>
                                    <TableCell className="text-right align-top py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEdit(faq)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Pencil size={16} className="text-muted-foreground hover:text-foreground" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(faq.id)}
                                                className="h-8 w-8 p-0 hover:bg-destructive/10"
                                            >
                                                {isPending ? (
                                                    <Loader2 size={16} className="animate-spin text-muted-foreground" />
                                                ) : (
                                                    <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                                                )}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit FAQ" : "Create New FAQ"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Question</label>
                            <Input
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                placeholder="e.g., What is your refund policy?"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Answer</label>
                            <Textarea
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                placeholder="Enter the answer here..."
                                rows={5}
                            />
                        </div>
                        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
                            {isPending ? <Loader2 className="animate-spin" /> : (editingId ? "Update FAQ" : "Create FAQ")}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
