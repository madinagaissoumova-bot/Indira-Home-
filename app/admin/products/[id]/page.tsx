import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { ProductEditor } from "../ProductEditor";
import { AdminNav } from "../../AdminNav";

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

export default async function AdminProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      subcategory: true,
      images: { orderBy: { displayOrder: "asc" } }
    }
  });

  if (!product) notFound();

  const categories = await getCategories();

  return (
    <main className="page">
      <AdminNav />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.admin.products.title}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Link className="button secondary" href="/admin/products">
          {ru.admin.products.title}
        </Link>
      </section>

      <ProductEditor categories={categories} product={product} />
    </main>
  );
}
