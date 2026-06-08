import { requireAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
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
      <div className="admin-content">
        <StockManager products={products} />
      </div>
    </main>
  );
}
