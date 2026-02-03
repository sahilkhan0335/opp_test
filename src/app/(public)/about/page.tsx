
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

interface CompanyValue {
    id: number;
    title: string;
    description: string;
    icon: string;
    image: string;
    order: number;
}

export const revalidate = 0;

export default async function AboutPage() {
    const aboutContent = await prisma.aboutContent.findFirst();
    const values = await prisma.companyValue.findMany({
        orderBy: { order: "asc" },
    });

    if (!aboutContent) {
        // If no content, just render a basic placeholder or 404
        // But since we seeded, it should be there.
        return (
            <div className="container mx-auto px-6 lg:px-20 py-32">
                <h1 className="text-4xl font-bold">About Us</h1>
                <p>Content not found.</p>
            </div>
        )
    }

    const story = JSON.parse(aboutContent.story) as string[];
    const founderMessage = JSON.parse(aboutContent.founderMessage) as string[];

    return (
        <div className="container mx-auto px-6 lg:px-20 py-32 sm:py-48">
            {/* Header / Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-48 items-start mb-32">
                <div>
                    <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold mb-12 tracking-tighter leading-[0.9]">
                        About <br />
                        <span className="font-orbitron font-semibold text-primary">oppspaces</span>
                    </h1>
                </div>
                <div className="pt-4 lg:pt-8">
                    <p className="text-2xl sm:text-3xl font-medium leading-relaxed mb-12">
                        {aboutContent.mission}
                    </p>
                    <p className="text-xl text-muted-foreground border-l-4 border-primary pl-6">
                        Founded with purpose in Bangalore. <br />
                        Built for the next generation of builders.
                    </p>
                </div>
            </div>

            {/* Our Story */}
            <section className="mb-32">
                <h2 className="text-4xl font-bold mb-12">Our Story</h2>
                <div className="prose prose-lg dark:prose-invert max-w-4xl space-y-6 text-xl leading-relaxed text-muted-foreground">
                    {story.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="mb-32">
                <h2 className="text-4xl font-bold mb-12">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value: CompanyValue) => (
                        <div key={value.id} className="p-8 rounded-3xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                            <div className="text-5xl mb-6">{value.icon}</div>
                            <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                            <p className="text-lg text-muted-foreground">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Founder's Message */}
            <section className="p-12 sm:p-20 rounded-[3rem] bg-foreground text-background">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12">A note from the founder</h2>
                    <div className="space-y-6 text-xl leading-relaxed opacity-90">
                        {founderMessage.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="mt-12 pt-12 border-t border-white/20">
                        <p className="text-2xl font-bold">{aboutContent.founderName}</p>
                        <p className="opacity-60">{aboutContent.founderRole}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
