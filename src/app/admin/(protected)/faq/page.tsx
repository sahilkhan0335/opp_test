
import { prisma } from "@/lib/db";
import { FAQClient } from "@/components/admin/FAQClient";

export const revalidate = 0;

export default async function AdminFAQPage() {
    const faqs = await prisma.fAQ.findMany({
        orderBy: { id: 'asc' },
    });

    return <FAQClient faqs={faqs} />;
}
