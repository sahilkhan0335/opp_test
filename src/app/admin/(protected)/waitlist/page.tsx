import { prisma } from "@/lib/db";
import WaitlistClient from "@/components/admin/WaitlistClient";

export default async function WaitlistPage() {
    const entries = await prisma.waitlistEntry.findMany({
        orderBy: { submittedAt: "desc" },
    });

    return <WaitlistClient initialData={entries} />;
}
