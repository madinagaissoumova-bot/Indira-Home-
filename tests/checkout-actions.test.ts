import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createOrder } from "@/app/checkout/actions";
import { PAYMENT_METHOD } from "@/lib/constants";
import { ru } from "@/lib/.i18n/ru";

function checkoutForm(overrides: Record<string, string> = {}) {
  const formData = new FormData();

  formData.set("cart", JSON.stringify([{ productId: "product-1", quantity: 1 }]));
  formData.set("expectedTotalRub", "1000");
  formData.set("customerFirstName", "Амина");
  formData.set("customerLastName", "Исаева");
  formData.set("customerPhone", "+7 988 906-41-06");
  formData.set("deliveryAddressOrZone", "Грозный, ул. Ленина, дом 1");
  formData.set("paymentMethod", PAYMENT_METHOD.cashOnDelivery);
  formData.set("checkoutAttemptId", "checkout-attempt-validation-1");

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value);
  }

  return formData;
}

describe("createOrder customer validation", () => {
  it("rejects missing first and last names before creating an order", async () => {
    assert.deepEqual(await createOrder({}, checkoutForm({ customerFirstName: " " })), {
      error: ru.checkout.errors.missingFirstName
    });

    assert.deepEqual(await createOrder({}, checkoutForm({ customerLastName: " " })), {
      error: ru.checkout.errors.missingLastName
    });
  });

  it("rejects invalid phone and short addresses before creating an order", async () => {
    assert.deepEqual(await createOrder({}, checkoutForm({ customerPhone: "+33 1 23 45 67 89" })), {
      error: ru.checkout.errors.invalidPhone
    });

    assert.deepEqual(await createOrder({}, checkoutForm({ deliveryAddressOrZone: "Грозный" })), {
      error: ru.checkout.errors.missingAddress
    });
  });

  it("rejects clearly outside delivery zones before creating an order", async () => {
    assert.deepEqual(await createOrder({}, checkoutForm({ deliveryAddressOrZone: "Москва, ул. Тверская, дом 1" })), {
      error: ru.checkout.errors.outsideZone
    });
  });
});
