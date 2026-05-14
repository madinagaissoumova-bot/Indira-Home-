"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PAYMENT_METHOD } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { createOrder, type CheckoutState } from "./actions";

const CART_KEY = "indira-home-cart";

type CartStorageItem = {
  productId: string;
  quantity: number;
};

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
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

export function CheckoutClient({ products }: CheckoutClientProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartStorageItem[]>([]);
  const [state, formAction, isPending] = useActionState<CheckoutState, FormData>(createOrder, {});

  useEffect(() => {
    setCart(readCart());
  }, []);

  useEffect(() => {
    if (!state.orderNumber) return;

    window.localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("indira-home-cart-updated"));
    router.push(`/checkout/confirmation?order=${encodeURIComponent(state.orderNumber)}`);
  }, [router, state.orderNumber]);

  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  );

  const rows = cart.map((item) => {
    const product = productById.get(item.productId);
    const isUnavailable = !product || product.stockQuantity <= 0 || item.quantity > product.stockQuantity;
    const subtotal = product && !isUnavailable ? product.priceRub * item.quantity : 0;

    return { item, product, isUnavailable, subtotal };
  });
  const total = rows.reduce((sum, row) => sum + row.subtotal, 0);
  const isInvalid = cart.length === 0 || rows.some((row) => row.isUnavailable);

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <p>Ваша корзина пуста.</p>
        <Link className="button" href="/cart">
          Вернуться в корзину
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="checkout-layout">
      <input name="cart" type="hidden" value={JSON.stringify(cart)} />

      <section className="form-panel" aria-labelledby="checkout-form-title">
        <h2 id="checkout-form-title">Контактные данные</h2>
        {state.error ? <p className="form-error">{state.error}</p> : null}

        <div className="field">
          <label htmlFor="customerName">Имя</label>
          <input className="input" id="customerName" name="customerName" required />
        </div>

        <div className="field">
          <label htmlFor="customerPhone">Телефон или WhatsApp</label>
          <input
            className="input"
            id="customerPhone"
            name="customerPhone"
            placeholder="+7 ..."
            required
            type="tel"
          />
        </div>

        <div className="field">
          <label htmlFor="deliveryAddressOrZone">Адрес или зона доставки</label>
          <textarea
            className="input textarea"
            id="deliveryAddressOrZone"
            name="deliveryAddressOrZone"
            placeholder="Доставка только по Чеченской Республике"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="paymentMethod">Способ оплаты</label>
          <select className="input" id="paymentMethod" name="paymentMethod" required>
            <option value={PAYMENT_METHOD.cashOnDelivery}>Оплата при получении</option>
            <option value={PAYMENT_METHOD.transferAfterConfirmation}>
              Перевод после подтверждения
            </option>
          </select>
        </div>

        <p>
          Онлайн-оплаты нет. Магазин свяжется с вами по телефону или WhatsApp для
          подтверждения заказа.
        </p>

        <div className="form-actions">
          <Link className="button secondary" href="/cart">
            Вернуться в корзину
          </Link>
          <button className="button" disabled={isInvalid || isPending} type="submit">
            {isPending ? "Отправка..." : "Отправить заказ"}
          </button>
        </div>
      </section>

      <aside className="cart-summary">
        <h2>Ваш заказ</h2>
        <div className="checkout-items">
          {rows.map(({ item, product, isUnavailable, subtotal }) => (
            <div className="summary-line" key={item.productId}>
              <span>
                {product?.name ?? "Товар недоступен"} x {item.quantity}
                {isUnavailable ? " - недоступно" : ""}
              </span>
              <strong>{formatRub(subtotal)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-line">
          <span>Итого</span>
          <strong>{formatRub(total)}</strong>
        </div>
        {isInvalid ? <p>Корзину нужно исправить перед отправкой заказа.</p> : null}
      </aside>
    </form>
  );
}
