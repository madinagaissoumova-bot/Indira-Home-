import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { getAdminOrderStatusLabel } from "@/lib/adminLabels";
import { prisma } from "@/lib/db";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";
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
      <AdminNav />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.admin.orders.title}</span>
        <h1>{order.orderNumber}</h1>
        <p>
          {getAdminOrderStatusLabel(order.status)} · {formatRub(order.totalRub)}
        </p>
        <Link className="button secondary" href="/admin/orders">
          {ru.admin.orders.title}
        </Link>
      </section>

      <OrderEditor order={order} />
    </main>
  );
}
