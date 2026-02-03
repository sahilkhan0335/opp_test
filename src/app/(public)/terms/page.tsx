import { prisma } from "@/lib/db";

export default async function TermsPage() {
    const content = await prisma.legalContent.findUnique({
        where: { type: "terms" }
    });

    return (
        <div className="container mx-auto px-6 lg:px-20 py-24">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-lg dark:prose-invert max-w-4xl">
                {content ? (
                    <div className="whitespace-pre-wrap">{content.content}</div>
                ) : (
                    <p className="text-muted-foreground">No content available.</p>
                )}
            </div>
        </div>
    );
}
