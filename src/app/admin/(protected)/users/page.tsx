import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { AdminUserList } from "@/components/admin/AdminUserList";
import { SubAdminGateway } from "../../../../components/admin/SubAdminGateway";

export default async function AdminUsersPage() {
    const users = await prisma.adminUser.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, email: true, createdAt: true } // Don't select password
    });

    return (
        <SubAdminGateway>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Sub Admin Management</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Create New Admin */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Sub Admin</h2>
                        <AdminUserList users={users} />
                    </Card>

                    {/* Info Card */}
                    <Card className="p-6 bg-secondary/20 border-none">
                        <h2 className="text-xl font-semibold mb-2">Security Note</h2>
                        <p className="text-muted-foreground">
                            Sub Admins have full access to all dashboard management tools. 
                            Ensure you set unique and strong passwords for each account.
                            You cannot delete the last remaining administrator.
                        </p>
                    </Card>
                </div>
            </div>
        </SubAdminGateway>
    );
}
