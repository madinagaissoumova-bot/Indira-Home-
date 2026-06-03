import Link from "next/link";
import { ORDER_STATUS, PRODUCT_STATUS } from "@/lib/constants";
import { getAdminOrderStatusLabel, getAdminProductStatusLabel } from "@/lib/adminLabels";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { requireAdminSession } from "@/lib/adminAuth";
import { formatRub } from "@/lib/format";
import { AdminNav } from "./AdminNav";

const dashboardDateFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

function formatDashboardDate(date: Date) {
  return dashboardDateFormat.format(date);
}

async function getDashboardData() {
  const [revenue, orderCount, productCount, outOfStockCount, recentOrders, recentProducts] = await Promise.all([
    prisma.order.aggregate({
      where: {
        status: { not: ORDER_STATUS.cancelled }
      },
      _sum: {
        totalRub: true
      }
    }),
    prisma.order.count(),
    prisma.product.count(),
    prisma.product.count({
      where: {
        status: PRODUCT_STATUS.published,
        stockQuantity: 0
      }
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        category: true
      }
    })
  ]);

  return {
    metrics: [
      { label: ru.admin.dashboard.revenue, value: formatRub(revenue._sum.totalRub ?? 0) },
      { label: ru.admin.dashboard.orderCount, value: orderCount },
      { label: ru.admin.dashboard.productCount, value: productCount },
      { label: ru.admin.dashboard.outOfStockCount, value: outOfStockCount }
    ],
    recentOrders,
    recentProducts
  };
}

export default async function AdminPage() {
  await requireAdminSession();
  const dashboard = await getDashboardData();

  return (
    <main className="page admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <AdminNav />
        </aside>

        <div className="admin-content">
          <div className="admin-dashboard-stack">
            <section className="admin-dashboard-metrics" aria-label={ru.admin.dashboard.metrics}>
              {dashboard.metrics.map((metric) => (
                <div className="admin-dashboard-metric" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </section>

            <section className="admin-dashboard-section">
              <div className="admin-section-heading">
                <h2>{ru.admin.dashboard.recentOrders}</h2>
                <Link className="text-link" href="/admin/orders">
                  {ru.admin.dashboard.actions.viewOrders}
                </Link>
              </div>
              {dashboard.recentOrders.length > 0 ? (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{ru.admin.dashboard.orderNumber}</th>
                        <th>{ru.admin.common.customer}</th>
                        <th>{ru.admin.common.createdAt}</th>
                        <th>{ru.admin.common.status}</th>
                        <th>{ru.admin.common.total}</th>
                        <th>{ru.admin.dashboard.tableAction}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td data-label={ru.admin.dashboard.orderNumber}>
                            <strong>{order.orderNumber}</strong>
                          </td>
                          <td data-label={ru.admin.common.customer}>{order.customerName}</td>
                          <td data-label={ru.admin.common.createdAt}>{formatDashboardDate(order.createdAt)}</td>
                          <td data-label={ru.admin.common.status}>
                            <span className="admin-badge">{getAdminOrderStatusLabel(order.status)}</span>
                          </td>
                          <td data-label={ru.admin.common.total}>{formatRub(order.totalRub)}</td>
                          <td data-label={ru.admin.dashboard.tableAction}>
                            <Link className="admin-table-action" href={`/admin/orders/${order.id}`}>
                              {ru.common.viewProduct}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>{ru.admin.dashboard.noOrders}</p>
              )}
            </section>

            <section className="admin-dashboard-section">
              <div className="admin-section-heading">
                <h2>{ru.admin.dashboard.recentProducts}</h2>
                <Link className="text-link" href="/admin/products">
                  {ru.admin.nav.products}
                </Link>
              </div>
              {dashboard.recentProducts.length > 0 ? (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{ru.admin.products.name}</th>
                        <th>{ru.admin.common.category}</th>
                        <th>{ru.admin.common.status}</th>
                        <th>{ru.admin.common.price}</th>
                        <th>{ru.admin.common.createdAt}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.recentProducts.map((product) => (
                        <tr key={product.id}>
                          <td data-label={ru.admin.products.name}>
                            <strong>{product.name}</strong>
                          </td>
                          <td data-label={ru.admin.common.category}>{product.category.name}</td>
                          <td data-label={ru.admin.common.status}>
                            <span className="admin-badge">{getAdminProductStatusLabel(product.status)}</span>
                          </td>
                          <td data-label={ru.admin.common.price}>{formatRub(product.priceRub)}</td>
                          <td data-label={ru.admin.common.createdAt}>{formatDashboardDate(product.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>{ru.admin.products.empty}</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
