import { prisma } from "@/lib/db";
import CareersClient from "@/components/admin/CareersClient";

export default async function CareersPage() {
    const applications = await prisma.careerApplication.findMany({
        orderBy: { submittedAt: "desc" },
    });

    return <CareersClient initialData={applications} />;
}
