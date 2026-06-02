import Link from "next/link";
import { requireAdminSession } from "@/lib/adminAuth";
import { getAdminProductStatusLabel } from "@/lib/adminLabels";
import { prisma } from "@/lib/db";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";
import { ProductEditor } from "./ProductEditor";
import { AdminNav } from "../AdminNav";

async function getProducts() {
  return prisma.product.findMany({
    orderBy: [{ updatedAt: "desc" }],
    include: {
      category: true,
      subcategory: true,
      images: { orderBy: { displayOrder: "asc" }, take: 1 }
    }
  });
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      subcategories: {
        orderBy: { displayOrder: "asc" }
      }
    }
  });
}

export default async function AdminProductsPage() {
  await requireAdminSession();
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main className="page">
      <AdminNav />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.admin.dashboard.eyebrow}</span>
        <h1>{ru.admin.products.title}</h1>
        <p>{ru.admin.products.text}</p>
        <Link className="button secondary" href="/admin">
          {ru.admin.common.backDashboard}
        </Link>
      </section>

      <ProductEditor categories={categories} />

      <section className="form-panel admin-list-panel">
        <h2>{ru.admin.products.existing}</h2>
        {products.length > 0 ? (
          <div className="checkout-items">
            {products.map((product) => (
              <Link className="summary-line admin-list-row" href={`/admin/products/${product.id}`} key={product.id}>
                <span className="admin-list-main">
                  <strong>{product.name}</strong>
                  <span className="admin-badge">{getAdminProductStatusLabel(product.status)}</span>
                </span>
                <span className="admin-list-meta">
                  <span>{product.category.name}</span>
                  <span>{product.subcategory.name}</span>
                </span>
                <strong className="admin-list-value">{formatRub(product.priceRub)}</strong>
              </Link>
            ))}
          </div>
        ) : (
          <p>{ru.admin.products.empty}</p>
        )}
      </section>
    </main>
  );
}
