import { requireAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { CategoryManager } from "./CategoryManager";
import { AdminNav } from "../AdminNav";

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      subcategories: {
        orderBy: { displayOrder: "asc" },
        include: {
          products: { select: { id: true } }
        }
      },
      products: { select: { id: true } }
    }
  });
}

export default async function AdminCategoriesPage() {
  await requireAdminSession();
  const categories = await getCategories();

  return (
    <main className="page admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <AdminNav />
          <section className="admin-sidebar-card">
            <span className="eyebrow">{ru.admin.dashboard.eyebrow}</span>
            <h1>{ru.admin.categories.title}</h1>
            <p>{ru.admin.categories.text}</p>
          </section>
        </aside>

        <div className="admin-content">
          <CategoryManager categories={categories} />
        </div>
      </div>
    </main>
  );
}
