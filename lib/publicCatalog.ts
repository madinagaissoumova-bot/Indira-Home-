import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const publicProductWhere = {
  status: PRODUCT_STATUS.published,
  priceRub: { gt: 0 },
  images: { some: {} },
  category: { status: VISIBILITY_STATUS.visible },
  subcategory: { status: VISIBILITY_STATUS.visible }
} satisfies Prisma.ProductWhereInput;

export const publicProductOrderBy = [
  { stockQuantity: "desc" },
  { isNew: "desc" },
  { displayOrder: "asc" },
  { createdAt: "desc" }
] satisfies Prisma.ProductOrderByWithRelationInput[];

type PublicProductCandidate = {
  status: string;
  stockQuantity: number;
  priceRub: number;
  category: { status: string } | null;
  subcategory: { status: string } | null;
};

export function isPublicProduct(product: Pick<PublicProductCandidate, "status" | "category" | "subcategory">) {
  return (
    product.status === PRODUCT_STATUS.published &&
    product.category?.status === VISIBILITY_STATUS.visible &&
    product.subcategory?.status === VISIBILITY_STATUS.visible
  );
}

export function isCommandableProduct(product: PublicProductCandidate) {
  return isPublicProduct(product) && product.stockQuantity > 0 && product.priceRub > 0;
}

export async function listVisibleCategories(db: typeof prisma = prisma) {
  return db.category.findMany({
    where: { status: VISIBILITY_STATUS.visible },
    orderBy: { displayOrder: "asc" },
    include: {
      subcategories: {
        where: { status: VISIBILITY_STATUS.visible },
        orderBy: { displayOrder: "asc" }
      }
    }
  });
}
