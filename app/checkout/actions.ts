"use server";

import { randomInt } from "node:crypto";
import { ORDER_STATUS, PAYMENT_METHOD } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { parseCartInput, verifyCartForOrder } from "@/lib/serverCart";
import { isClearlyOutsideChechnya, isValidRussianContactPhone } from "@/lib/validation";

export type CheckoutState = {
  error?: string;
  orderNumber?: string;
  totalRub?: number;
  review?: {
    items: {
      productId: string;
      name: string;
      quantity: number;
      unitPriceRub: number;
      subtotalRub: number;
    }[];
    totalRub: number;
  };
};

const CHECKOUT_ATTEMPT_ID_PATTERN = /^[a-zA-Z0-9_-]{16,80}$/;

function createOrderNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  const random = randomInt(100000, 1000000);

  return `IH-${stamp}-${random}`;
}

async function createOrderWithRetry(create: () => Promise<CheckoutState>) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await create();
    } catch (error) {
      if (isUniqueConstraintError(error, "checkoutAttemptId")) {
        throw error;
      }

      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "P2002" &&
        attempt < 2
      ) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("ORDER_NUMBER_COLLISION");
}

function isUniqueConstraintError(error: unknown, field: string) {
  if (!error || typeof error !== "object" || !("code" in error) || error.code !== "P2002") {
    return false;
  }

  const target = "meta" in error && error.meta && typeof error.meta === "object" && "target" in error.meta
    ? error.meta.target
    : undefined;

  return Array.isArray(target) && target.includes(field);
}

async function getOrderByCheckoutAttemptId(checkoutAttemptId: string) {
  return prisma.order.findUnique({
    where: { checkoutAttemptId },
    select: {
      orderNumber: true,
      totalRub: true
    }
  });
}

export async function createOrder(_previousState: CheckoutState, formData: FormData) {
  const customerFirstName = String(formData.get("customerFirstName") ?? "").trim();
  const customerLastName = String(formData.get("customerLastName") ?? "").trim();
  const customerPhone = String(formData.get("customerPhone") ?? "").trim();
  const deliveryAddressOrZone = String(formData.get("deliveryAddressOrZone") ?? "").trim();
  const paymentMethod = String(formData.get("paymentMethod") ?? "");
  const checkoutAttemptId = String(formData.get("checkoutAttemptId") ?? "").trim();
  const expectedTotalRub = Number(formData.get("expectedTotalRub") ?? NaN);
  const cart = parseCartInput(formData.get("cart"));

  if (!CHECKOUT_ATTEMPT_ID_PATTERN.test(checkoutAttemptId)) {
    return { error: ru.checkout.errors.general };
  }

  if (cart.length === 0) {
    return { error: ru.checkout.errors.emptyCart };
  }

  if (customerFirstName.length < 2 || customerFirstName.length > 80) {
    return { error: ru.checkout.errors.missingFirstName };
  }
  if (customerLastName.length < 2 || customerLastName.length > 80) {
    return { error: ru.checkout.errors.missingLastName };
  }
  if (!isValidRussianContactPhone(customerPhone)) {
    return { error: ru.checkout.errors.invalidPhone };
  }
  if (deliveryAddressOrZone.length < 10 || deliveryAddressOrZone.length > 240) {
    return { error: ru.checkout.errors.missingAddress };
  }
  if (isClearlyOutsideChechnya(deliveryAddressOrZone)) {
    return { error: ru.checkout.errors.outsideZone };
  }
  if (
    paymentMethod !== PAYMENT_METHOD.cashOnDelivery &&
    paymentMethod !== PAYMENT_METHOD.transferAfterConfirmation
  ) {
    return { error: ru.checkout.errors.missingPayment };
  }

  const existingOrder = await getOrderByCheckoutAttemptId(checkoutAttemptId);
  if (existingOrder) {
    return {
      orderNumber: existingOrder.orderNumber,
      totalRub: existingOrder.totalRub
    };
  }

  try {
    const createdOrder = await createOrderWithRetry(() =>
      prisma.$transaction(async (tx) => {
        const verifiedCart = await verifyCartForOrder(cart, tx);
        if (!verifiedCart.ok) {
          throw new Error(verifiedCart.reason);
        }

        if (!Number.isInteger(expectedTotalRub) || expectedTotalRub !== verifiedCart.totalRub) {
          return {
            error: ru.checkout.errors.priceUpdated,
            review: {
              items: verifiedCart.items.map((item) => ({
                productId: item.product.id,
                name: item.product.name,
                quantity: item.quantity,
                unitPriceRub: item.product.priceRub,
                subtotalRub: item.subtotalRub
              })),
              totalRub: verifiedCart.totalRub
            }
          };
        }

        for (const item of verifiedCart.items) {
          const updated = await tx.product.updateMany({
            where: {
              id: item.product.id,
              stockQuantity: { gte: item.quantity }
            },
            data: {
              stockQuantity: { decrement: item.quantity }
            }
          });

          if (updated.count !== 1) {
            throw new Error("INSUFFICIENT_STOCK");
          }
        }

        const created = await tx.order.create({
          data: {
            orderNumber: createOrderNumber(),
            customerName: `${customerFirstName} ${customerLastName}`,
            customerPhone: customerPhone.replace(/\s+/g, " "),
            deliveryAddressOrZone,
            paymentMethod,
            checkoutAttemptId,
            status: ORDER_STATUS.new,
            totalRub: verifiedCart.totalRub,
            items: {
              create: verifiedCart.items.map((item) => ({
                productId: item.product.id,
                productNameSnapshot: item.product.name,
                productImageSnapshot: item.product.images[0]?.url ?? null,
                unitPriceRub: item.product.priceRub,
                quantity: item.quantity,
                subtotalRub: item.subtotalRub
              }))
            }
          }
        });

        return {
          orderNumber: created.orderNumber,
          totalRub: created.totalRub
        };
      })
    );

    return createdOrder;
  } catch (error) {
    if (isUniqueConstraintError(error, "checkoutAttemptId")) {
      const existing = await getOrderByCheckoutAttemptId(checkoutAttemptId);
      if (existing) {
        return {
          orderNumber: existing.orderNumber,
          totalRub: existing.totalRub
        };
      }
    }

    if (error instanceof Error && error.message === "EMPTY_CART") {
      return { error: ru.checkout.errors.emptyCart };
    }
    if (error instanceof Error && error.message === "INSUFFICIENT_STOCK") {
      return { error: ru.checkout.errors.insufficientStock };
    }
    if (error instanceof Error && error.message === "UNAVAILABLE_PRODUCT") {
      return { error: ru.checkout.errors.unavailableProduct };
    }
    if (error instanceof Error && error.message === "INVALID_PRICE") {
      return { error: ru.checkout.errors.unavailableProduct };
    }

    return { error: ru.checkout.errors.general };
  }
}
