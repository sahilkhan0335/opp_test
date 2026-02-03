import { prisma } from "@/lib/db";
import ContactClient from "@/components/admin/ContactClient";

export default async function ContactPage() {
    const submissions = await prisma.contactSubmission.findMany({
        orderBy: { submittedAt: "desc" },
    });

    return <ContactClient initialData={submissions} />;
}
