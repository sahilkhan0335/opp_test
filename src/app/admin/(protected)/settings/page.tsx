import { prisma } from "@/lib/db";
import SettingsClient from "@/components/admin/SettingsClient";

export default async function SettingsPage() {
    const settings = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
    const terms = await prisma.legalContent.findUnique({ where: { type: "terms" } });
    const privacy = await prisma.legalContent.findUnique({ where: { type: "privacy" } });

    return (
        <SettingsClient
            initialSettings={settings}
            initialFaqs={faqs}
            initialLegal={{
                terms: terms?.content || "",
                privacy: privacy?.content || ""
            }}
        />
    );
}
