"use server";

import { randomInt } from "node:crypto";
import { ORDER_STATUS, PAYMENT_METHOD } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { parseCartInput, verifyCartForOrder } from "@/lib/serverCart";

export type CheckoutState = {
  error?: string;
  orderNumber?: string;
  totalRub?: number;
};

function isClearlyOutsideChechnya(address: string) {
  const value = address.toLowerCase();
  const chechnyaSignals = ["чеч", "гроз", "аргун", "шали", "гудермес", "урус", "chechen"];
  const outsideSignals = ["москва", "санкт", "петербург", "дагестан", "ингуш", "ставроп", "краснодар"];

  return outsideSignals.some((signal) => value.includes(signal)) &&
    !chechnyaSignals.some((signal) => value.includes(signal));
}

function createOrderNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  const random = randomInt(100000, 1000000);

  return `IH-${stamp}-${random}`;
}

type CreatedOrderResult = {
  orderNumber: string;
  totalRub: number;
};

async function createOrderWithRetry(create: () => Promise<CreatedOrderResult>) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await create();
    } catch (error) {
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

export async function createOrder(_previousState: CheckoutState, formData: FormData) {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerPhone = String(formData.get("customerPhone") ?? "").trim();
  const deliveryAddressOrZone = String(formData.get("deliveryAddressOrZone") ?? "").trim();
  const paymentMethod = String(formData.get("paymentMethod") ?? "");
  const cart = parseCartInput(formData.get("cart"));
  const phoneDigits = customerPhone.replace(/[\s()+-]/g, "");

  if (cart.length === 0) {
    return { error: ru.checkout.errors.emptyCart };
  }

  if (customerName.length < 2 || customerName.length > 80) {
    return { error: ru.checkout.errors.missingName };
  }
  if (!/^[0-9]{7,20}$/.test(phoneDigits)) {
    return { error: ru.checkout.errors.invalidPhone };
  }
  if (deliveryAddressOrZone.length < 5 || deliveryAddressOrZone.length > 240) {
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

  try {
    const createdOrder = await createOrderWithRetry(() =>
      prisma.$transaction(async (tx) => {
        const verifiedCart = await verifyCartForOrder(cart, tx);
        if (!verifiedCart.ok) {
          throw new Error(verifiedCart.reason);
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
            customerName,
            customerPhone: customerPhone.replace(/\s+/g, " "),
            deliveryAddressOrZone,
            paymentMethod,
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
