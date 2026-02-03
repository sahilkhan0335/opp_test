
import { prisma } from "../src/lib/db";

async function main() {
    console.log("Checking for duplicate FAQs...");

    const faqs = await prisma.fAQ.findMany({
        orderBy: { id: 'asc' }
    });

    const seenQuestions = new Set<string>();
    const duplicatesToDelete: number[] = [];

    for (const faq of faqs) {
        const questionLower = faq.question.toLowerCase().trim();
        if (seenQuestions.has(questionLower)) {
            duplicatesToDelete.push(faq.id);
        } else {
            seenQuestions.add(questionLower);
        }
    }

    if (duplicatesToDelete.length > 0) {
        console.log(`Found ${duplicatesToDelete.length} duplicates. Deleting...`);
        await prisma.fAQ.deleteMany({
            where: {
                id: {
                    in: duplicatesToDelete
                }
            }
        });
        console.log("Duplicates deleted.");
    } else {
        console.log("No duplicates found.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
