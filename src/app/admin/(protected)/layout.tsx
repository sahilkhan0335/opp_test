import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ResponsiveAdminLayout from "@/components/admin/ResponsiveAdminLayout";

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
        <ResponsiveAdminLayout>
            {children}
        </ResponsiveAdminLayout>
    );
}
