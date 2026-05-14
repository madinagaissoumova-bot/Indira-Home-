"use server";

import { ORDER_STATUS, PAYMENT_METHOD, PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";

type CartItem = {
  productId: string;
  quantity: number;
};

export type CheckoutState = {
  error?: string;
  orderNumber?: string;
};

function parseCart(value: FormDataEntryValue | null): CartItem[] {
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.productId === "string" &&
        Number.isInteger(item?.quantity) &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

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
  const random = Math.floor(1000 + Math.random() * 9000);

  return `IH-${stamp}-${random}`;
}

export async function createOrder(_previousState: CheckoutState, formData: FormData) {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerPhone = String(formData.get("customerPhone") ?? "").trim();
  const deliveryAddressOrZone = String(formData.get("deliveryAddressOrZone") ?? "").trim();
  const paymentMethod = String(formData.get("paymentMethod") ?? "");
  const cart = parseCart(formData.get("cart"));

  if (cart.length === 0) {
    return { error: "Ваша корзина пуста или содержит товары, которые нужно исправить." };
  }

  if (!customerName) return { error: "Пожалуйста, укажите имя." };
  if (!/^\+?[0-9\s()\-]{8,20}$/.test(customerPhone)) {
    return { error: "Пожалуйста, укажите корректный номер телефона или WhatsApp." };
  }
  if (!deliveryAddressOrZone) {
    return { error: "Пожалуйста, укажите адрес или зону доставки в Чеченской Республике." };
  }
  if (isClearlyOutsideChechnya(deliveryAddressOrZone)) {
    return { error: "Доставка пока доступна только по Чеченской Республике." };
  }
  if (
    paymentMethod !== PAYMENT_METHOD.cashOnDelivery &&
    paymentMethod !== PAYMENT_METHOD.transferAfterConfirmation
  ) {
    return { error: "Пожалуйста, выберите способ оплаты." };
  }

  const products = await prisma.product.findMany({
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

  try {
    const productById = new Map(products.map((product) => [product.id, product]));
    const items = cart.map((item) => {
      const product = productById.get(item.productId);
      if (!product || product.stockQuantity <= 0) {
        throw new Error("UNAVAILABLE_PRODUCT");
      }
      if (item.quantity > product.stockQuantity) {
        throw new Error("INSUFFICIENT_STOCK");
      }

      return {
        product,
        quantity: item.quantity,
        subtotalRub: product.priceRub * item.quantity
      };
    });

    const orderNumber = await prisma.$transaction(async (tx) => {
      for (const item of items) {
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

      const totalRub = items.reduce((sum, item) => sum + item.subtotalRub, 0);
      const created = await tx.order.create({
        data: {
          orderNumber: createOrderNumber(),
          customerName,
          customerPhone,
          deliveryAddressOrZone,
          paymentMethod,
          status: ORDER_STATUS.new,
          totalRub,
          items: {
            create: items.map((item) => ({
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

      return created.orderNumber;
    });

    return { orderNumber };
  } catch (error) {
    if (error instanceof Error && error.message === "INSUFFICIENT_STOCK") {
      return { error: "Запрошенное количество больше недоступно. Пожалуйста, обновите корзину." };
    }
    if (error instanceof Error && error.message === "UNAVAILABLE_PRODUCT") {
      return { error: "Один из товаров больше недоступен для заказа." };
    }

    return { error: "Не удалось отправить заказ. Попробуйте еще раз." };
  }
}
