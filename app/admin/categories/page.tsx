import { requireAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/.i18n/ru";
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
      <AdminNav />
      <div className="admin-content">
        <section className="admin-page-intro">
          <h1>{ru.admin.categories.title}</h1>
          <p>{ru.admin.categories.text}</p>
        </section>
        <CategoryManager categories={categories} />
      </div>
    </main>
  );
}
