import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { OrderEditor } from "../OrderEditor";
import { AdminNav } from "../../AdminNav";

export default async function AdminOrderDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });

  if (!order) notFound();

  return (
    <main className="page admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <AdminNav />
        </aside>

        <div className="admin-content">
          <OrderEditor order={order} />
        </div>
      </div>
    </main>
  );
}
