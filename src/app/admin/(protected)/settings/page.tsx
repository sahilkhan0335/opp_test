import SettingsClient from "@/components/admin/SettingsClient";
import { prisma } from "@/lib/db";

export default async function SettingsPage() {
    const settings = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    const terms = await prisma.legalContent.findUnique({ where: { type: "terms" } });
    const privacy = await prisma.legalContent.findUnique({ where: { type: "privacy" } });

    const defaultSettings = {
        heroTitle: "oppspaces",
        heroSubtitle: "Swipe your next big opportunity",
        heroButtonText: "Join the Waitlist →",
        heroBgImage: null,
        showTestimonials: true,
        showStats: true,
        showWhy: true,
        showPhoneMockups: true,
    };

    return (
        <SettingsClient
            initialSettings={settings || defaultSettings}
            initialLegal={{
                terms: terms?.content || "",
                privacy: privacy?.content || ""
            }}
        />
    );
}
