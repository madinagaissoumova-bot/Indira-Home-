import Link from "next/link";
import { requireAdminSession } from "@/lib/adminAuth";
import { getAdminOrderStatusLabel } from "@/lib/adminLabels";
import { prisma } from "@/lib/db";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";
import { AdminNav } from "../AdminNav";

export default async function AdminOrdersPage() {
  await requireAdminSession();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true }
  });

  return (
    <main className="page admin-page">
      <AdminNav />
      <div className="admin-content">
        <section className="admin-list-panel">
          <h2>{ru.admin.orders.title}</h2>
          {orders.length > 0 ? (
            <div className="checkout-items">
              {orders.map((order) => (
                <Link className="summary-line admin-list-row" href={`/admin/orders/${order.id}`} key={order.id}>
                  <span className="admin-list-main">
                    <strong>{order.orderNumber}</strong>
                    <span className="admin-badge">{getAdminOrderStatusLabel(order.status)}</span>
                  </span>
                  <span className="admin-list-meta">
                    <span>{order.customerName}</span>
                    <span>{order.items.length} шт.</span>
                  </span>
                  <strong className="admin-list-value">{formatRub(order.totalRub)}</strong>
                </Link>
              ))}
            </div>
          ) : (
            <p>{ru.admin.orders.empty}</p>
          )}
        </section>
      </div>
    </main>
  );
}
