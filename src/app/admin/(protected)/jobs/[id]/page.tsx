import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import JobForm from "../../../../../components/admin/JobForm";

export default async function EditJobPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    
    const job = await prisma.jobListing.findUnique({
        where: { id: parseInt(id) },
    });

    if (!job) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Job Listing</h2>
                <p className="text-muted-foreground">Update the job details below.</p>
            </div>
            <JobForm initialData={job} />
        </div>
    );
}
