"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PAYMENT_METHOD } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/.i18n/ru";
import { createOrder, type CheckoutState } from "./actions";
import type { CartStorageItem } from "@/types";

const CART_KEY = "indira-home-cart";
const CONFIRMATION_KEY = "indira-home-last-order-confirmation";
const MAX_CART_QUANTITY_PER_PRODUCT = 99;

function createCheckoutAttemptId() {
  if (typeof window.crypto?.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 18)}`;
}

type CheckoutProduct = {
  id: string;
  name: string;
  priceRub: number;
  stockQuantity: number;
};

type CheckoutClientProps = {
  products: CheckoutProduct[];
};

function readCart(): CartStorageItem[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartStorageItem =>
        typeof item?.productId === "string" &&
        Number.isInteger(item?.quantity) &&
        item.quantity > 0 &&
        item.quantity <= MAX_CART_QUANTITY_PER_PRODUCT
    );
  } catch {
    return [];
  }
}

export function CheckoutClient({ products }: CheckoutClientProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartStorageItem[]>([]);
  const [checkoutAttemptId, setCheckoutAttemptId] = useState("");
  const [state, formAction, isPending] = useActionState<CheckoutState, FormData>(createOrder, {});
  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  );

  useEffect(() => {
    setCart(readCart());
    setCheckoutAttemptId(createCheckoutAttemptId());
  }, []);

  const rows = cart.map((item) => {
    const product = productById.get(item.productId);
    const isUnavailable = !product || product.stockQuantity <= 0 || item.quantity > product.stockQuantity;
    const subtotal = product && !isUnavailable ? product.priceRub * item.quantity : 0;

    return { item, product, isUnavailable, subtotal };
  });
  const total = rows.reduce((sum, row) => sum + row.subtotal, 0);
  const reviewedRows = state.review?.items;
  const displayedTotal = state.review?.totalRub ?? total;
  const isInvalid = cart.length === 0 || (!state.review && rows.some((row) => row.isUnavailable));

  useEffect(() => {
    if (!state.orderNumber) return;

    window.sessionStorage.setItem(
      CONFIRMATION_KEY,
      JSON.stringify({
        orderNumber: state.orderNumber,
        totalRub: state.totalRub
      })
    );
    window.localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("indira-home-cart-updated"));
    router.push("/checkout/confirmation");
  }, [router, state.orderNumber, state.totalRub]);

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <p>{ru.cart.empty}</p>
        <Link className="button" href="/cart">
          {ru.cart.backToCart}
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="checkout-layout">
      <input name="cart" type="hidden" value={JSON.stringify(cart)} />
      <input name="expectedTotalRub" type="hidden" value={displayedTotal} />
      <input name="checkoutAttemptId" type="hidden" value={checkoutAttemptId} />

      <section className="form-panel" aria-labelledby="checkout-form-title">
        <h2 id="checkout-form-title">{ru.checkout.contactTitle}</h2>
        {state.error ? <p className="form-error">{state.error}</p> : null}

        <div className="field">
          <label htmlFor="customerFirstName">{ru.checkout.firstName}</label>
          <input
            autoComplete="given-name"
            className="input"
            id="customerFirstName"
            maxLength={80}
            minLength={2}
            name="customerFirstName"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="customerLastName">{ru.checkout.lastName}</label>
          <input
            autoComplete="family-name"
            className="input"
            id="customerLastName"
            maxLength={80}
            minLength={2}
            name="customerLastName"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="customerPhone">{ru.checkout.phone}</label>
          <input
            className="input"
            id="customerPhone"
            inputMode="tel"
            maxLength={24}
            name="customerPhone"
            placeholder={ru.checkout.phonePlaceholder}
            required
            type="tel"
          />
        </div>

        <div className="field">
          <label htmlFor="deliveryAddressOrZone">{ru.checkout.address}</label>
          <textarea
            className="input textarea"
            id="deliveryAddressOrZone"
            maxLength={240}
            minLength={10}
            name="deliveryAddressOrZone"
            placeholder={ru.checkout.addressPlaceholder}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="paymentMethod">{ru.checkout.paymentMethod}</label>
          <select className="input" id="paymentMethod" name="paymentMethod" required>
            <option value={PAYMENT_METHOD.cashOnDelivery}>{ru.checkout.cashOnDelivery}</option>
            <option value={PAYMENT_METHOD.transferAfterConfirmation}>
              {ru.checkout.transferAfterConfirmation}
            </option>
          </select>
        </div>

        <div className="checkout-note">
          <p>{ru.checkout.deliveryNote}</p>
          <p>{ru.checkout.deliveryFeeNote}</p>
        </div>

        <div className="form-actions">
          <Link className="button secondary" href="/cart">
            {ru.cart.backToCart}
          </Link>
          <button className="button" disabled={isInvalid || isPending || !checkoutAttemptId} type="submit">
            {isPending ? ru.checkout.submitting : ru.checkout.submit}
          </button>
        </div>
      </section>

      <aside className="cart-summary">
        <h2>{ru.checkout.summary}</h2>
        <div className="checkout-items">
          {reviewedRows ? reviewedRows.map((item) => (
            <div className="summary-line" key={item.productId}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>{formatRub(item.subtotalRub)}</strong>
            </div>
          )) : rows.map(({ item, product, isUnavailable, subtotal }) => (
            <div className="summary-line" key={item.productId}>
              <span>
                {product?.name ?? ru.common.unavailableProduct} x {item.quantity}
                {isUnavailable ? ru.checkout.unavailableSuffix : ""}
              </span>
              <strong>{formatRub(subtotal)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-line">
          <span>{ru.common.total}</span>
          <strong>{formatRub(displayedTotal)}</strong>
        </div>
        {isInvalid ? <p>{ru.checkout.invalidCart}</p> : null}
        {state.review ? <p>{ru.checkout.reviewUpdated}</p> : null}
      </aside>
    </form>
  );
}
