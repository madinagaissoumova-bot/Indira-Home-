import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { fallbackCategories, isDatabaseUnavailable } from "@/lib/fallbackCatalog";
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

export type PublicSearchSort = "default" | "price-asc" | "price-desc" | "new-first";

export type PublicFavoriteProduct = {
  id: string;
  slug: string;
  name: string;
  priceRub: number;
  stockQuantity: number;
  isNew: boolean;
  category: { name: string } | null;
  subcategory: { name: string } | null;
  images: { url: string; alt: string }[];
};

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
  try {
    return await db.category.findMany({
      where: { status: VISIBILITY_STATUS.visible },
      orderBy: { displayOrder: "asc" },
      include: {
        subcategories: {
          where: { status: VISIBILITY_STATUS.visible },
          orderBy: { displayOrder: "asc" }
        }
      }
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    return fallbackCategories;
  }
}

export async function listPublicProductsForCart() {
  try {
    return await prisma.product.findMany({
      where: publicProductWhere,
      include: {
        images: { orderBy: { displayOrder: "asc" }, take: 1 }
      }
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    const { fallbackProducts } = await import("@/lib/fallbackCatalog");
    return fallbackProducts;
  }
}

export async function listPublicProductsForCheckout() {
  try {
    return await prisma.product.findMany({
      where: publicProductWhere,
      select: {
        id: true,
        name: true,
        priceRub: true,
        stockQuantity: true
      }
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    const { fallbackProducts } = await import("@/lib/fallbackCatalog");
    return fallbackProducts.map(({ id, name, priceRub, stockQuantity }) => ({
      id,
      name,
      priceRub,
      stockQuantity
    }));
  }
}

export async function listPublicProductsForFavorites(): Promise<PublicFavoriteProduct[]> {
  try {
    return await prisma.product.findMany({
      where: publicProductWhere,
      select: {
        id: true,
        slug: true,
        name: true,
        priceRub: true,
        stockQuantity: true,
        isNew: true,
        category: { select: { name: true } },
        subcategory: { select: { name: true } },
        images: {
          orderBy: { displayOrder: "asc" },
          select: { url: true, alt: true },
          take: 1
        }
      },
      orderBy: publicProductOrderBy
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    const { fallbackProducts } = await import("@/lib/fallbackCatalog");

    return fallbackProducts.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      priceRub: product.priceRub,
      stockQuantity: product.stockQuantity,
      isNew: product.isNew,
      category: { name: product.category.name },
      subcategory: { name: product.subcategory.name },
      images: product.images.map((image) => ({ url: image.url, alt: image.alt })).slice(0, 1)
    }));
  }
}

function getPublicSearchOrderBy(sort: PublicSearchSort) {
  if (sort === "price-asc") {
    return [{ priceRub: "asc" }, ...publicProductOrderBy] satisfies Prisma.ProductOrderByWithRelationInput[];
  }

  if (sort === "price-desc") {
    return [{ priceRub: "desc" }, ...publicProductOrderBy] satisfies Prisma.ProductOrderByWithRelationInput[];
  }

  if (sort === "new-first") {
    return [{ isNew: "desc" }, { stockQuantity: "desc" }, { displayOrder: "asc" }] satisfies Prisma.ProductOrderByWithRelationInput[];
  }

  return publicProductOrderBy;
}

export function filterAndSortPublicProducts<
  T extends { priceRub: number; isNew: boolean; stockQuantity: number; displayOrder?: number }
>(
  products: T[],
  options: { sort?: PublicSearchSort; inStockOnly?: boolean; newOnly?: boolean } = {}
) {
  const sort = options.sort ?? "default";
  const filteredProducts = products.filter((product) => {
    if (options.inStockOnly && product.stockQuantity <= 0) return false;
    if (options.newOnly && !product.isNew) return false;
    return true;
  });

  return [...filteredProducts].sort((first, second) => {
    if (sort === "price-asc") {
      return first.priceRub - second.priceRub;
    }

    if (sort === "price-desc") {
      return second.priceRub - first.priceRub;
    }

    if (sort === "new-first") {
      return (
        Number(second.isNew) - Number(first.isNew) ||
        Number(second.stockQuantity > 0) - Number(first.stockQuantity > 0) ||
        (first.displayOrder ?? 0) - (second.displayOrder ?? 0)
      );
    }

    return (
      Number(second.stockQuantity > 0) - Number(first.stockQuantity > 0) ||
      Number(second.isNew) - Number(first.isNew) ||
      (first.displayOrder ?? 0) - (second.displayOrder ?? 0)
    );
  });
}

export async function searchPublicProducts(
  query: string,
  options: { newOnly?: boolean; sort?: PublicSearchSort; inStockOnly?: boolean } = {}
) {
  const trimmedQuery = query.trim();
  const sort = options.sort ?? "default";

  if (!trimmedQuery && !options.newOnly && !options.inStockOnly && sort === "default") return [];

  try {
    return await prisma.product.findMany({
      where: {
        ...publicProductWhere,
        ...(options.newOnly ? { isNew: true } : {}),
        ...(options.inStockOnly ? { stockQuantity: { gt: 0 } } : {}),
        ...(trimmedQuery
          ? {
              OR: [
                { name: { contains: trimmedQuery } },
                { description: { contains: trimmedQuery } },
                { brand: { contains: trimmedQuery } }
              ]
            }
          : {})
      },
      include: {
        category: true,
        subcategory: true,
        images: { orderBy: { displayOrder: "asc" }, take: 1 }
      },
      orderBy: getPublicSearchOrderBy(sort)
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    const { fallbackProducts, searchFallbackProducts } = await import("@/lib/fallbackCatalog");
    const baseProducts = trimmedQuery ? searchFallbackProducts(trimmedQuery) : fallbackProducts;

    return filterAndSortPublicProducts(baseProducts, {
      inStockOnly: options.inStockOnly,
      newOnly: options.newOnly,
      sort
    });
  }
}
