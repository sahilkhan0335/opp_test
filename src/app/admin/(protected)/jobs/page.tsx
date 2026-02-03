import { prisma } from "@/lib/db";
import JobsClient from "@/components/admin/JobsClient";

export default async function JobsPage() {
    const jobs = await prisma.jobListing.findMany({
        orderBy: { order: "asc" },
    });

    return <JobsClient initialData={jobs} />;
}
