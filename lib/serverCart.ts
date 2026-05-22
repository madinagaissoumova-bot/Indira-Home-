import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

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
        item.quantity < 1
      ) {
        continue;
      }

      quantityByProductId.set(
        item.productId,
        (quantityByProductId.get(item.productId) ?? 0) + item.quantity
      );
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
      status: PRODUCT_STATUS.published,
      category: { status: VISIBILITY_STATUS.visible },
      subcategory: { status: VISIBILITY_STATUS.visible }
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
