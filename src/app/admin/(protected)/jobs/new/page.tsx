import JobForm from "@/components/admin/JobForm";

export default function NewJobPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Create Job Listing</h2>
                <p className="text-muted-foreground">Add a new job opening to your careers page.</p>
            </div>
            <JobForm />
        </div>
    );
}
