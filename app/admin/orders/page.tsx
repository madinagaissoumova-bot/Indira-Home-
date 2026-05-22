import Link from "next/link";
import { requireAdminSession } from "@/lib/adminAuth";
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
    <main className="page">
      <AdminNav />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.admin.dashboard.eyebrow}</span>
        <h1>{ru.admin.orders.title}</h1>
        <p>{ru.admin.orders.text}</p>
        <Link className="button secondary" href="/admin">
          {ru.admin.common.backDashboard}
        </Link>
      </section>

      <section className="form-panel admin-list-panel">
        <h2>{ru.admin.orders.title}</h2>
        {orders.length > 0 ? (
          <div className="checkout-items">
            {orders.map((order) => (
              <Link className="summary-line admin-list-row" href={`/admin/orders/${order.id}`} key={order.id}>
                <span>
                  {order.orderNumber} · <span className="admin-badge">{order.status}</span> · {order.customerName} · {order.items.length}
                </span>
                <strong>{formatRub(order.totalRub)}</strong>
              </Link>
            ))}
          </div>
        ) : (
          <p>{ru.admin.orders.empty}</p>
        )}
      </section>
    </main>
  );
}
