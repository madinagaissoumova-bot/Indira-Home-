import Link from "next/link";
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
      <AdminNav />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.admin.dashboard.eyebrow}</span>
        <h1>{ru.admin.stock.title}</h1>
        <p>{ru.admin.stock.text}</p>
        <Link className="button secondary" href="/admin">
          {ru.admin.common.backDashboard}
        </Link>
      </section>

      <StockManager products={products} />
    </main>
  );
}
