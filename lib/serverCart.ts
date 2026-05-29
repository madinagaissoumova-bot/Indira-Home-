import { prisma } from "@/lib/db";
import { publicProductWhere } from "@/lib/publicCatalog";
import type { Prisma } from "@prisma/client";

const MAX_CART_QUANTITY_PER_PRODUCT = 99;

export type ServerCartInput = {
  productId: string;
  quantity: number;
};

export type VerifiedCartItem = {
  product: {
    id: string;
    name: string;
    priceRub: number;
    stockQuantity: number;
    images: { url: string }[];
  };
  quantity: number;
  subtotalRub: number;
};

export type VerifyCartResult =
  | {
      ok: true;
      items: VerifiedCartItem[];
      totalRub: number;
    }
  | {
      ok: false;
      reason: "EMPTY_CART" | "UNAVAILABLE_PRODUCT" | "INSUFFICIENT_STOCK" | "INVALID_PRICE";
    };

export function parseCartInput(value: FormDataEntryValue | null): ServerCartInput[] {
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    const quantityByProductId = new Map<string, number>();

    for (const item of parsed) {
      if (
        typeof item?.productId !== "string" ||
        !Number.isInteger(item?.quantity) ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > MAX_CART_QUANTITY_PER_PRODUCT
      ) {
        continue;
      }

      const nextQuantity = (quantityByProductId.get(item.productId) ?? 0) + item.quantity;
      if (!Number.isSafeInteger(nextQuantity) || nextQuantity > MAX_CART_QUANTITY_PER_PRODUCT) {
        continue;
      }

      quantityByProductId.set(item.productId, nextQuantity);
    }

    return Array.from(quantityByProductId, ([productId, quantity]) => ({ productId, quantity }));
  } catch {
    return [];
  }
}

export async function verifyCartForOrder(
  cart: ServerCartInput[],
  db: Prisma.TransactionClient | typeof prisma = prisma
): Promise<VerifyCartResult> {
  if (cart.length === 0) {
    return { ok: false, reason: "EMPTY_CART" };
  }

  const products = await db.product.findMany({
    where: {
      id: { in: cart.map((item) => item.productId) },
      ...publicProductWhere
    },
    include: {
      images: { orderBy: { displayOrder: "asc" }, take: 1 }
    }
  });

  const productById = new Map(products.map((product) => [product.id, product]));
  const items: VerifiedCartItem[] = [];

  for (const item of cart) {
    const product = productById.get(item.productId);

    if (!product || product.stockQuantity <= 0) {
      return { ok: false, reason: "UNAVAILABLE_PRODUCT" };
    }
    if (item.quantity > product.stockQuantity) {
      return { ok: false, reason: "INSUFFICIENT_STOCK" };
    }
    if (!Number.isInteger(product.priceRub) || product.priceRub <= 0) {
      return { ok: false, reason: "INVALID_PRICE" };
    }

    items.push({
      product,
      quantity: item.quantity,
      subtotalRub: product.priceRub * item.quantity
    });
  }

  return {
    ok: true,
    items,
    totalRub: items.reduce((sum, item) => sum + item.subtotalRub, 0)
  };
}
