
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const defaultFaqs = [
    {
        question: "What exactly is oppspaces?",
        answer: "oppspaces is the new way Indian creators, founders, and companies find each other in 2025. Think the joy of swiping + the power of showing who you really are in seconds — without the corporate noise.",
    },
    {
        question: "When is the launch?",
        answer: "Very soon — weeks, not months. The first batch of users gets in by invite only. Join the waitlist to lock your spot.",
    },
    {
        question: "Is it only for job seekers or only for companies?",
        answer: "Neither. One single account lets you look for opportunities, post opportunities, or do both — just like real life.",
    },
    {
        question: "Will it be free?",
        answer: "Yes for individuals, forever. Companies will pay when they want to stand out (fair and transparent).",
    },
    {
        question: "I'm a founder / freelancer / designer / developer / content creator — should I join?",
        answer: "Absolutely yes. If you're tired of LinkedIn and DM chaos, this is being built exactly for you — whether you code, design, create content, or build companies.",
    },
    {
        question: "Will there be an Android and iOS app?",
        answer: "Yes, native apps from day one. Web version works perfectly too.",
    },
    {
        question: "How do I get early access?",
        answer: "Join the waitlist right now. The first 25,000 people get lifetime perks and early invites.",
    },
    {
        question: "I'm hiring — can I post roles before launch?",
        answer: "Yes! Drop your email and we'll personally onboard the first 500 hiring teams.",
    },
    {
        question: "Still have questions?",
        answer: "Write to oppspacesapp@gmail.com — we actually reply (usually within a few hours).",
    },
];

const defaultJobs = [
    {
        title: "Senior React Developer",
        location: "Remote / Bangalore",
        type: "Full-time",
        description: "Join our founding engineering pod to create joyful hiring experiences.",
        salaryRange: "",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        active: true,
    },
    {
        title: "Product Designer",
        location: "Remote / Mumbai",
        type: "Full-time",
        description: "Design delightful mobile-first experiences with a distributed team.",
        salaryRange: "",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
        active: true,
    },
    {
        title: "Growth Marketing Lead",
        location: "Remote / Delhi",
        type: "Full-time",
        description: "Own the playbook for scaling oppspaces across India.",
        salaryRange: "",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        active: true,
    },
    {
        title: "Backend Engineer",
        location: "Remote / Hyderabad",
        type: "Full-time",
        description: "Build reliable infra powering millions of swipes.",
        salaryRange: "",
        image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=600&q=80",
        active: true,
    },
];

const termsContent = `Acceptance of Terms\n\nBy accessing oppspaces, you agree to these terms. Use oppspaces responsibly and only for lawful purposes.\n\nUse License\n\nWe grant you a limited, non-transferable license to use the platform. You may not reverse engineer, duplicate, or exploit any part of it without permission.\n\nUser Responsibilities\n\nKeep your account secure and respect other members. We reserve the right to suspend accounts that violate these terms.\n\nContact\n\nReach us anytime at oppspacesapp@gmail.com or 9602201552.`;

const privacyContent = `Information We Collect\n\nWe collect the information you share (like profile details, video submissions, and messages) to match you with opportunities.\n\nHow We Use Data\n\nWe use your data to power discovery, improve recommendations, and keep the community safe. We never sell your personal data.\n\nData Security\n\nWe use industry-standard security practices to protect your data. You can request deletion of your data anytime.\n\nContact\n\nFor privacy questions, email oppspacesapp@gmail.com or call 9602201552.`;

async function main() {
    console.log("Seeding database...");

    // Clear existing
    await prisma.jobListing.deleteMany({});
    await prisma.fAQ.deleteMany({});
    await prisma.legalContent.deleteMany({});

    // Seed FAQs
    for (const faq of defaultFaqs) {
        await prisma.fAQ.create({ data: faq });
    }

    // Seed Jobs
    for (const job of defaultJobs) {
        await prisma.jobListing.create({ data: job });
    }

    // Seed Legal Content
    await prisma.legalContent.create({
        data: { type: "terms", content: termsContent }
    });

    await prisma.legalContent.create({
        data: { type: "privacy", content: privacyContent }
    });

    // Seed Site Settings if not exists
    await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            heroTitle: "oppspaces",
            heroSubtitle: "Swipe your next big opportunity",
            heroButtonText: "Join the Waitlist →",
            showTestimonials: true,
            showStats: true,
            showWhy: true,
            showPhoneMockups: true
        }
    });

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
