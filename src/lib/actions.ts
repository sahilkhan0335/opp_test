"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

// --- EXISTING ACTIONS ---

export async function submitWaitlist(formData: FormData) {
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    if (!email || !role) {
        return { success: false, error: "Email and role are required" };
    }

    try {
        await prisma.waitlistEntry.create({
            data: {
                email,
                role,
                submittedAt: new Date(),
            },
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to submit waitlist:", error);
        return { success: false, error: "Failed to join waitlist" };
    }
}

export async function getWaitlistCount() {
    try {
        const count = await prisma.waitlistEntry.count();
        return count;
    } catch {
        return 0;
    }
}

export async function submitContact(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const type = formData.get("type") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, error: "Missing fields" };
    }

    try {
        await prisma.contactSubmission.create({
            data: {
                name,
                email,
                type,
                message,
                submittedAt: new Date(),
                resolved: false
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Contact submission error:", error);
        return { success: false, error: "Failed to submit" };
    }
}

export async function updateSiteSettings(formData: FormData) {
    try {
        const data = {
            heroTitle: formData.get("heroTitle") as string,
            heroSubtitle: formData.get("heroSubtitle") as string,
            heroButtonText: formData.get("heroButtonText") as string,
            heroBgImage: formData.get("heroBgImage") as string,
            showTestimonials: formData.get("showTestimonials") === "on",
            showStats: formData.get("showStats") === "on",
            showWhy: formData.get("showWhy") === "on",
            showPhoneMockups: formData.get("showPhoneMockups") === "on",
        };

        const count = await prisma.siteSettings.count();
        if (count === 0) {
            await prisma.siteSettings.create({
                data: { id: 1, ...data },
            });
        } else {
            await prisma.siteSettings.update({
                where: { id: 1 },
                data,
            });
        }

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update settings:", error);
        return { success: false, error: "Failed to update settings" };
    }
}

// --- NEW CRUD ACTIONS ---

// FAQs
export async function createFAQ(data: Prisma.FAQCreateInput) {
    try {
        await prisma.fAQ.create({ data });
        revalidatePath("/faq");
        revalidatePath("/admin/faq");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to create FAQ" };
    }
}

export async function updateFAQ(id: number, data: Prisma.FAQUpdateInput) {
    try {
        await prisma.fAQ.update({ where: { id }, data });
        revalidatePath("/faq");
        revalidatePath("/admin/faq");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update FAQ" };
    }
}

export async function deleteFAQ(id: number) {
    try {
        await prisma.fAQ.delete({ where: { id } });
        revalidatePath("/faq");
        revalidatePath("/admin/faq");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete FAQ" };
    }
}

export async function updateFaqs(faqs: Prisma.FAQCreateInput[]) {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.fAQ.deleteMany({});
            for (const faq of faqs) {
                await tx.fAQ.create({ data: faq });
            }
        });
        revalidatePath("/");
        revalidatePath("/admin/settings");
        revalidatePath("/faq");
        return { success: true };
    } catch (error) {
        console.error("Failed to update FAQs:", error);
        return { success: false, error: "Failed to update FAQs" };
    }
}

// Legal
export async function updateLegalContent(type: string, content: string) {
    try {
        await prisma.legalContent.upsert({
            where: { type },
            update: { content },
            create: { type, content }
        });
        revalidatePath(`/${type}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update legal content:", error);
        return { success: false, error: "Failed to update legal content" };
    }
}

// Jobs
export async function createJob(data: Prisma.JobListingCreateInput) {
    try {
        await prisma.jobListing.create({ data });
        revalidatePath("/careers");
        revalidatePath("/admin/jobs");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to create job" };
    }
}

export async function updateJob(id: number, data: Prisma.JobListingUpdateInput) {
    try {
        await prisma.jobListing.update({ where: { id }, data });
        revalidatePath("/careers");
        revalidatePath("/admin/jobs");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update job" };
    }
}

export async function deleteJob(id: number) {
    try {
        await prisma.jobListing.delete({ where: { id } });
        revalidatePath("/careers");
        revalidatePath("/admin/jobs");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete job" };
    }
}

export async function reorderJobs(items: { id: number, order: number }[]) {
    try {
        await prisma.$transaction(
            items.map(item =>
                prisma.jobListing.update({
                    where: { id: item.id },
                    data: { order: item.order }
                })
            )
        );
        revalidatePath("/careers");
        revalidatePath("/admin/jobs");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to reorder" };
    }
}


// Waitlist
export async function deleteWaitlistEntry(id: number) {
    try {
        await prisma.waitlistEntry.delete({ where: { id } });
        revalidatePath("/admin/waitlist");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete entry" };
    }
}

export async function updateWaitlistEntry(id: number, data: Prisma.WaitlistEntryUpdateInput) {
    try {
        await prisma.waitlistEntry.update({ where: { id }, data });
        revalidatePath("/admin/waitlist");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update entry" };
    }
}

export async function bulkDeleteWaitlist(ids: number[]) {
    try {
        await prisma.waitlistEntry.deleteMany({
            where: { id: { in: ids } }
        });
        revalidatePath("/admin/waitlist");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to bulk delete" };
    }
}

export async function bulkInviteWaitlist(ids: number[]) {
    try {
        await prisma.waitlistEntry.updateMany({
            where: { id: { in: ids } },
            data: { invited: true }
        });
        revalidatePath("/admin/waitlist");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to bulk invite" };
    }
}

// Contact
export async function deleteContactSubmission(id: number) {
    try {
        await prisma.contactSubmission.delete({ where: { id } });
        revalidatePath("/admin/contact");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete contact" };
    }
}

export async function updateContactSubmission(id: number, data: Prisma.ContactSubmissionUpdateInput) {
    try {
        await prisma.contactSubmission.update({ where: { id }, data });
        revalidatePath("/admin/contact");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update contact" };
    }
}

// Careers
export async function deleteCareerApplication(id: number) {
    try {
        await prisma.careerApplication.delete({ where: { id } });
        revalidatePath("/admin/careers");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete application" };
    }
}

export async function updateCareerApplication(id: number, data: Prisma.CareerApplicationUpdateInput) {
    try {
        await prisma.careerApplication.update({ where: { id }, data });
        revalidatePath("/admin/careers");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update application" };
    }
}

// Admin Users
import { hash } from "bcryptjs";

export async function createAdminUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { success: false, error: "Email and password are required" };
    }

    try {
        // Check if user already exists
        const existing = await prisma.adminUser.findUnique({ where: { email } });
        if (existing) {
            return { success: false, error: "User already exists" };
        }

        const hashedPassword = await hash(password, 12);
        await prisma.adminUser.create({
            data: {
                email,
                password: hashedPassword,
            }
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to create admin:", error);
        return { success: false, error: "Failed to create admin" };
    }
}

export async function deleteAdminUser(id: number) {
    try {
        // Prevent deleting the last admin or specific protection logic could go here
        const count = await prisma.adminUser.count();
        if (count <= 1) {
            return { success: false, error: "Cannot delete the last admin" };
        }

        await prisma.adminUser.delete({ where: { id } });
        revalidatePath("/admin/users");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete admin" };
    }
}

// Career Application Submission
// Career Application Submission
export async function submitApplication(formData: FormData) {
    const jobTitle = formData.get("jobTitle") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const resume = formData.get("resume") as string;
    const portfolio = formData.get("portfolio") as string;
    const coverLetter = formData.get("coverLetter") as string;

    console.log("--- DEBUG SUBMIT APPLICATION ---");
    console.log("Job:", jobTitle);
    console.log("Name:", name);
    console.log("Portfolio:", portfolio);
    console.log("Date:", new Date().toISOString());

    if (!jobTitle || !name || !email || !resume) {
        console.error("Missing fields:", { jobTitle, name, email, resume });
        return { success: false, error: "Missing required fields" };
    }

    try {
        await prisma.careerApplication.create({
            data: {
                jobTitle,
                name,
                email,
                phone,
                resume,
                portfolio: portfolio || null,
                coverLetter: coverLetter || "",
                status: "Pending",
                submittedAt: new Date(),
            }
        });
        revalidatePath("/admin/careers");
        return { success: true };
    } catch (error) {
        console.error("Application submission error:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to submit application" };
    }
}
