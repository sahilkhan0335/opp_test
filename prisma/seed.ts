
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultJobs = [
    {
        title: "Senior React Developer",
        location: "Remote / Bangalore",
        type: "Full-time",
        salaryRange: "",
        description: "Join our founding engineering pod to create joyful hiring experiences.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        active: true,
        order: 0,
    },
    {
        title: "Product Designer",
        location: "Remote / Mumbai",
        type: "Full-time",
        salaryRange: "",
        description: "Design delightful mobile-first experiences with a distributed team.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
        active: true,
        order: 1,
    },
    {
        title: "Growth Marketing Lead",
        location: "Remote / Delhi",
        type: "Full-time",
        salaryRange: "",
        description: "Own the playbook for scaling oppspaces across India.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        active: true,
        order: 2,
    },
    {
        title: "Backend Engineer",
        location: "Remote / Hyderabad",
        type: "Full-time",
        salaryRange: "",
        description: "Build reliable infra powering millions of swipes.",
        image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=600&q=80",
        active: true,
        order: 3,
    },
]

const defaultFaqs = [
    {
        question: "What exactly is oppspaces?",
        answer: "oppspaces is the new way Indian creators, founders, and companies find each other in 2025. Think the joy of swiping + the power of showing who you really are in seconds — without the corporate noise.",
        order: 0,
    },
    {
        question: "When is the launch?",
        answer: "Very soon — weeks, not months. The first batch of users gets in by invite only. Join the waitlist to lock your spot.",
        order: 1,
    },
    {
        question: "Is it only for job seekers or only for companies?",
        answer: "Neither. One single account lets you look for opportunities, post opportunities, or do both — just like real life.",
        order: 2,
    },
    {
        question: "Will it be free?",
        answer: "Yes for individuals, forever. Companies will pay when they want to stand out (fair and transparent).",
        order: 3,
    },
    {
        question: "I'm a founder / freelancer / designer / developer / content creator — should I join?",
        answer: "Absolutely yes. If you're tired of LinkedIn and DM chaos, this is being built exactly for you — whether you code, design, create content, or build companies.",
        order: 4,
    },
    {
        question: "Will there be an Android and iOS app?",
        answer: "Yes, native apps from day one. Web version works perfectly too.",
        order: 5,
    },
    {
        question: "How do I get early access?",
        answer: "Join the waitlist right now. The first 25,000 people get lifetime perks and early invites.",
        order: 6,
    },
    {
        question: "I'm hiring — can I post roles before launch?",
        answer: "Yes! Drop your email and we'll personally onboard the first 500 hiring teams.",
        order: 7,
    },
    {
        question: "Still have questions?",
        answer: "Write to oppspacesapp@gmail.com — we actually reply (usually within a few hours).",
        order: 8,
    },
]

const legalTerms = `Acceptance of Terms

By accessing oppspaces, you agree to these terms. Use oppspaces responsibly and only for lawful purposes.

Use License

We grant you a limited, non-transferable license to use the platform. You may not reverse engineer, duplicate, or exploit any part of it without permission.

User Responsibilities

Keep your account secure and respect other members. We reserve the right to suspend accounts that violate these terms.

Contact

Reach us anytime at oppspacesapp@gmail.com or 9602201552.`

const legalPrivacy = `Information We Collect

We collect the information you share (like profile details, video submissions, and messages) to match you with opportunities.

How We Use Data

We use your data to power discovery, improve recommendations, and keep the community safe. We never sell your personal data.

Data Security

We use industry-standard security practices to protect your data. You can request deletion of your data anytime.

  Contact

For privacy questions, email oppspacesapp@gmail.com or call 9602201552.`


const aboutStory = JSON.stringify([
    "We believe hiring should be as easy as swiping right on your phone. That's why we built oppspaces — to make finding your next job or hiring your next team member feel natural, fun, and human.",
    "Born in India, built for India. We understand the unique challenges of the Indian job market, and we're here to solve them with technology that feels familiar and exciting.",
    "No more endless scrolling through job boards. No more generic resumes. No more awkward email chains. Just swipe, connect, and grow."
])

const aboutMission = "To make hiring and job hunting in India as joyful and intuitive as connecting with friends online. We're building the future of work, one swipe at a time."

const aboutFounderMessage = JSON.stringify([
    "Hi, I'm Gaurav — founder of oppspaces.",
    "I built oppspaces because I was tired. Tired of LinkedIn feeling like a corporate graveyard. Tired of Twitter DMs being pure chaos. Tired of sending 200 cold emails and getting 3 replies. Tired of seeing brilliant Indian creators, developers, designers, and founders struggle to find each other in 2025.",
    "So I asked myself: what if finding your next big break felt like Tinder… but joyful? What if you could show who you are in 60 seconds instead of a PDF? What if hiring didn't feel like a chore, but like discovering magic?",
    "That's oppspaces. One place where you can swipe, reel, meet, and build — without the BS. We're bringing back the human in professional networking, and we're doing it the Indian way: fast, warm, and a little chaotic (in the best way).",
    "We're launching very soon. Join the waitlist. Let's build the future of work together."
])

const companyValues = [
    {
        title: "Speed",
        description: "Moving fast to build the future of work in India",
        icon: "🚀",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
        order: 0,
    },
    {
        title: "Authenticity",
        description: "Real connections over polished profiles",
        icon: "👤",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        order: 1,
    },
    {
        title: "India-First",
        description: "Built for the unique needs of Indian professionals",
        icon: "🇮🇳",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
        order: 2,
    },
]

async function main() {
    console.log('Start seeding ...')

    // Seed Jobs
    for (const job of defaultJobs) {
        const createdJob = await prisma.jobListing.create({
            data: job
        })
        console.log(`Created job with id: ${createdJob.id}`)
    }

    // Seed FAQs
    for (const faq of defaultFaqs) {
        const createdFaq = await prisma.fAQ.create({
            data: faq
        })
        console.log(`Created faq with id: ${createdFaq.id}`)
    }

    // Seed Site Settings
    const siteSettings = await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            heroTitle: "oppspaces",
            heroSubtitle: "Swipe your next big opportunity",
            heroButtonText: "Join the Waitlist →",
            heroBgImage: "",
            showTestimonials: true,
            showStats: true,
            showWhy: true,
            showPhoneMockups: true,
        },
    })
    console.log(`Created site settings with id: ${siteSettings.id}`)

    // Seed Legal Content
    // Terms
    const terms = await prisma.legalContent.upsert({
        where: { type: 'terms' },
        update: { content: legalTerms },
        create: {
            type: 'terms',
            content: legalTerms,
        },
    })
    console.log(`Created terms with id: ${terms.id}`)

    // Privacy
    const privacy = await prisma.legalContent.upsert({
        where: { type: 'privacy' },
        update: { content: legalPrivacy },
        create: {
            type: 'privacy',
            content: legalPrivacy,
        },
    })
    console.log(`Created privacy with id: ${privacy.id}`)

    // Seed About Content
    const about = await prisma.aboutContent.upsert({
        where: { id: 1 },
        update: {
            story: aboutStory,
            mission: aboutMission,
            founderMessage: aboutFounderMessage,
            founderName: "Gaurav",
            founderRole: "Founder",
        },
        create: {
            story: aboutStory,
            mission: aboutMission,
            founderMessage: aboutFounderMessage,
            founderName: "Gaurav",
            founderRole: "Founder",
        },
    })
    console.log(`Created about content with id: ${about.id}`)

    // Seed Company Values
    for (const val of companyValues) {
        // We don't have a unique key for CompanyValue other than ID, so we might just create duplicates if we run this multiple times without cleanup.
        // For a seed script intended to be idempotent, we should probably check existence or clear table.
        // However, simplest here is to delete all and recreate, or check by title.
        const existing = await prisma.companyValue.findFirst({
            where: { title: val.title }
        })

        if (!existing) {
            const createdVal = await prisma.companyValue.create({
                data: val
            })
            console.log(`Created value: ${createdVal.title}`)
        } else {
            // Update
            await prisma.companyValue.update({
                where: { id: existing.id },
                data: val
            })
            console.log(`Updated value: ${existing.title}`)
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
