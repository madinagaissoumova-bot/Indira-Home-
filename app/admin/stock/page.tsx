import { requireAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { StockManager } from "./StockManager";
import { AdminNav } from "../AdminNav";

async function getProducts() {
  return prisma.product.findMany({
    orderBy: [{ stockQuantity: "asc" }, { updatedAt: "desc" }],
    include: {
      category: true,
      subcategory: true
    }
  });
}

export default async function AdminStockPage() {
  await requireAdminSession();
  const products = await getProducts();

  return (
    <main className="page admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <AdminNav />
          <section className="admin-sidebar-card">
            <span className="eyebrow">{ru.admin.dashboard.eyebrow}</span>
            <h1>{ru.admin.stock.title}</h1>
            <p>{ru.admin.stock.text}</p>
          </section>
        </aside>

        <div className="admin-content">
          <StockManager products={products} />
        </div>
      </div>
    </main>
  );
}
