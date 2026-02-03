import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-stone-50/50 dark:bg-black">
            <AdminSidebar />
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
}
