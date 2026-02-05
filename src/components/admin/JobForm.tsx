"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createJob, updateJob } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface JobFormData {
    id?: number;
    title: string;
    location: string;
    type: string;
    salaryRange?: string | null;
    description: string;
    image: string;
    active: boolean;
}

export default function JobForm({ initialData }: { initialData?: JobFormData }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<JobFormData>({
        title: initialData?.title || "",
        location: initialData?.location || "",
        type: initialData?.type || "Full-time",
        salaryRange: initialData?.salaryRange || "",
        description: initialData?.description || "",
        image: initialData?.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        active: initialData?.active ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        startTransition(async () => {
            const res = initialData?.id
                ? await updateJob(initialData.id, formData)
                : await createJob(formData);

            if (res.success) {
                toast.success(initialData?.id ? "Job updated!" : "Job created!");
                router.push("/admin/jobs");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to save job");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="rounded-xl border bg-card shadow-sm p-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Senior React Developer"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Remote / Bangalore"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Job Type *</Label>
                        <Input
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            placeholder="e.g. Full-time, Part-time"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="salaryRange">Salary Range (Optional)</Label>
                    <Input
                        id="salaryRange"
                        value={formData.salaryRange || ""}
                        onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                        placeholder="e.g. $80k - $120k"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the role, responsibilities, and requirements..."
                        rows={6}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Image URL *</Label>
                    <Input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        required
                    />
                    <p className="text-sm text-muted-foreground">
                        Add a cover image URL from Unsplash or other sources
                    </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                    />
                    <Label htmlFor="active" className="cursor-pointer">
                        Active (visible on careers page)
                    </Label>
                </div>
            </div>

            <div className="flex gap-3">
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData?.id ? "Update Job" : "Create Job"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/jobs")}
                    disabled={isPending}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
