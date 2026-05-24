import Link from "next/link";
import { ORDER_STATUS, PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { requireAdminSession } from "@/lib/adminAuth";
import { formatRub } from "@/lib/format";
import { logoutAdmin } from "./actions";
import { AdminNav } from "./AdminNav";

const adminSections = [
  {
    title: ru.admin.dashboard.sections.products,
    text: ru.admin.dashboard.sections.productsText,
    href: "/admin/products"
  },
  {
    title: ru.admin.dashboard.sections.categories,
    text: ru.admin.dashboard.sections.categoriesText,
    href: "/admin/categories"
  },
  {
    title: ru.admin.dashboard.sections.stock,
    text: ru.admin.dashboard.sections.stockText,
    href: "/admin/stock"
  },
  {
    title: ru.admin.dashboard.sections.orders,
    text: ru.admin.dashboard.sections.ordersText,
    href: "/admin/orders"
  }
];

async function getDashboardData() {
  const [
    newOrders,
    activeOrders,
    publishedProducts,
    visibleProducts,
    soldOutProducts,
    hiddenProducts,
    recentOrders,
    stockAlerts
  ] = await Promise.all([
    prisma.order.count({ where: { status: ORDER_STATUS.new } }),
    prisma.order.count({
      where: {
        status: {
          in: [ORDER_STATUS.toConfirm, ORDER_STATUS.confirmed, ORDER_STATUS.preparing]
        }
      }
    }),
    prisma.product.count({ where: { status: PRODUCT_STATUS.published } }),
    prisma.product.count({
      where: {
        status: PRODUCT_STATUS.published,
        category: { status: VISIBILITY_STATUS.visible },
        subcategory: { status: VISIBILITY_STATUS.visible }
      }
    }),
    prisma.product.count({
      where: {
        status: PRODUCT_STATUS.published,
        stockQuantity: 0
      }
    }),
    prisma.product.count({ where: { status: PRODUCT_STATUS.hidden } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        items: true
      }
    }),
    prisma.product.findMany({
      where: {
        status: PRODUCT_STATUS.published,
        stockQuantity: { lte: 2 }
      },
      orderBy: [{ stockQuantity: "asc" }, { updatedAt: "desc" }],
      take: 8
    })
  ]);

  return {
    cards: [
      { label: ru.admin.dashboard.newOrders, value: newOrders },
      { label: ru.admin.dashboard.activeOrders, value: activeOrders },
      { label: ru.admin.dashboard.publishedProducts, value: publishedProducts },
      { label: ru.admin.dashboard.visibleProducts, value: visibleProducts },
      { label: ru.admin.dashboard.soldOutProducts, value: soldOutProducts },
      { label: ru.admin.dashboard.hiddenProducts, value: hiddenProducts }
    ],
    recentOrders,
    stockAlerts
  };
}

export default async function AdminPage() {
  await requireAdminSession();
  const dashboard = await getDashboardData();

  return (
    <main className="page">
      <AdminNav />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.admin.dashboard.eyebrow}</span>
        <h1>{ru.admin.dashboard.title}</h1>
        <p>{ru.admin.dashboard.text}</p>
        <form action={logoutAdmin}>
          <button className="button secondary" type="submit">
            {ru.admin.dashboard.logout}
          </button>
        </form>
      </section>

      <section className="admin-grid" aria-label={ru.admin.dashboard.title}>
        {dashboard.cards.map((card) => (
          <article className="admin-panel admin-stat-card" key={card.label}>
            <span className="eyebrow">{card.label}</span>
            <h2>{card.value}</h2>
          </article>
        ))}
      </section>

      <div className="checkout-layout">
        <section className="form-panel">
          <h2>{ru.admin.dashboard.recentOrders}</h2>
          {dashboard.recentOrders.length > 0 ? (
            <div className="checkout-items">
              {dashboard.recentOrders.map((order) => (
                <Link className="summary-line admin-list-row" href={`/admin/orders/${order.id}`} key={order.id}>
                  <span>
                    {order.orderNumber} · <span className="admin-badge">{order.status}</span> · {order.items.length}
                  </span>
                  <strong>{formatRub(order.totalRub)}</strong>
                </Link>
              ))}
            </div>
          ) : (
            <p>{ru.admin.dashboard.noOrders}</p>
          )}
        </section>

        <aside className="cart-summary">
          <h2>{ru.admin.dashboard.stockAlerts}</h2>
          {dashboard.stockAlerts.length > 0 ? (
            <div className="checkout-items">
              {dashboard.stockAlerts.map((product) => (
                <Link className="summary-line admin-list-row" href={`/admin/products/${product.id}`} key={product.id}>
                  <span>{product.name}</span>
                  <strong>{ru.admin.dashboard.stockQuantity(product.stockQuantity)}</strong>
                </Link>
              ))}
            </div>
          ) : (
            <p>{ru.admin.dashboard.noStockAlerts}</p>
          )}
        </aside>
      </div>

      <div className="admin-grid">
        {adminSections.map((section) => (
          <Link className="admin-panel admin-section-card" href={section.href} key={section.href}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
