import { prisma } from "@/lib/db";

export async function getSiteSettings() {
    try {
        const settings = await prisma.siteSettings.findUnique({
            where: { id: 1 },
        });

        if (settings) return settings;

        // Default settings if not found
        return {
            heroTitle: "oppspaces",
            heroSubtitle: "Swipe your next big opportunity",
            heroButtonText: "Join the Waitlist →",
            heroBgImage: "",
            showTestimonials: true,
            showStats: true,
            showWhy: true,
            showPhoneMockups: true,
        };
    } catch (error) {
        console.error("Failed to fetch site settings:", error);
        return {
            heroTitle: "oppspaces",
            heroSubtitle: "Swipe your next big opportunity",
            heroButtonText: "Join the Waitlist →",
            heroBgImage: "",
            showTestimonials: true,
            showStats: true,
            showWhy: true,
            showPhoneMockups: true,
        };
    }
}

export async function getWaitlistCount() {
    try {
        return await prisma.waitlistEntry.count();
    } catch (error) {
        return 0;
    }
}
