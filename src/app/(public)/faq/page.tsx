import { prisma } from "@/lib/db";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default async function FAQPage() {
    const faqs = await prisma.fAQ.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="container mx-auto px-6 lg:px-20 py-32 sm:py-48">
            <div className="mb-24">
                <h1 className="text-7xl sm:text-9xl font-bold mb-10 tracking-tighter leading-none">
                    Common <br /> <span className="font-orbitron font-semibold text-primary">Questions</span>
                </h1>
                <p className="text-2xl sm:text-3xl font-medium max-w-xl">
                    Everything you need to know about the platform.
                </p>
            </div>

            <div className="w-full">
                <Accordion type="single" collapsible className="w-full space-y-6">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={faq.id} value={`item-${index}`} className="border-b-2 border-border/50 px-2">
                            <AccordionTrigger className="text-2xl sm:text-3xl font-bold py-8 hover:no-underline hover:text-primary transition-colors text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-xl text-muted-foreground pb-8 leading-relaxed max-w-3xl">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
