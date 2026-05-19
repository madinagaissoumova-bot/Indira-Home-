"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";

const CART_KEY = "indira-home-cart";

type CartStorageItem = {
  productId: string;
  quantity: number;
};

type CartProduct = {
  id: string;
  name: string;
  slug: string;
  priceRub: number;
  stockQuantity: number;
  imageUrl: string | null;
  imageAlt: string;
};

type CartClientProps = {
  products: CartProduct[];
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

function writeCart(items: CartStorageItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("indira-home-cart-updated"));
}

export function CartClient({ products }: CartClientProps) {
  const [items, setItems] = useState<CartStorageItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  );

  const rows = items.map((item) => {
    const product = productById.get(item.productId);
    const isUnavailable = !product || product.stockQuantity <= 0;
    const quantity = product
      ? Math.max(1, Math.min(item.quantity, Math.max(product.stockQuantity, 1)))
      : item.quantity;
    const needsQuantityCorrection = !!product && !isUnavailable && quantity !== item.quantity;
    const subtotal = product && !isUnavailable ? product.priceRub * quantity : 0;

    return { item, product, isUnavailable, needsQuantityCorrection, quantity, subtotal };
  });

  const total = rows.reduce((sum, row) => sum + row.subtotal, 0);
  const hasInvalidItems = rows.some((row) => row.isUnavailable || row.needsQuantityCorrection);

  function updateQuantity(productId: string, quantity: number) {
    const next = items
      .map((item) => (item.productId === productId ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);

    setItems(next);
    writeCart(next);
  }

  function removeItem(productId: string) {
    const next = items.filter((item) => item.productId !== productId);
    setItems(next);
    writeCart(next);
  }

  function applyAvailableQuantity(productId: string, quantity: number) {
    updateQuantity(productId, quantity);
  }

  function cleanInvalidItems() {
    const next = rows
      .filter((row) => row.product && !row.isUnavailable)
      .map((row) => ({
        productId: row.item.productId,
        quantity: row.quantity
      }));

    setItems(next);
    writeCart(next);
  }

  function clearCart() {
    setItems([]);
    writeCart([]);
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>{ru.cart.empty}</p>
        <Link className="button" href="/">
          {ru.common.backToCatalog}
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-layout" aria-label={ru.common.cart}>
      <div className="cart-list">
        {rows.map(({ item, product, isUnavailable, needsQuantityCorrection, quantity, subtotal }) => (
          <article className="cart-row" key={item.productId}>
            {product?.imageUrl ? (
              <Image
                alt={product.imageAlt}
                className="cart-image"
                height={220}
                src={product.imageUrl}
                unoptimized
                width={220}
              />
            ) : (
              <div className="cart-image" />
            )}

            <div className="cart-row-body">
              <div>
                <h2 className="cart-title">
                  {product ? (
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  ) : (
                    ru.common.unavailableProduct
                  )}
                </h2>
                {product && !isUnavailable ? (
                  <>
                    <p>{formatRub(product.priceRub)}</p>
                    {needsQuantityCorrection ? (
                      <p className="cart-warning">
                        {ru.cart.quantityChanged}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <span className="badge sold-out">{ru.cart.unavailableLine}</span>
                    <p className="cart-warning">
                      {ru.cart.removeUnavailable}
                    </p>
                  </>
                )}
              </div>

              <div className="quantity-controls" aria-label={ru.common.quantity}>
                <button
                  className="icon-button"
                  onClick={() => updateQuantity(item.productId, quantity - 1)}
                  type="button"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="icon-button"
                  disabled={isUnavailable || quantity >= (product?.stockQuantity ?? 0)}
                  onClick={() => updateQuantity(item.productId, quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </div>

              <div className="cart-row-footer">
                <strong>{formatRub(subtotal)}</strong>
                <div className="cart-row-actions">
                  {needsQuantityCorrection ? (
                    <button
                      className="text-button"
                      onClick={() => applyAvailableQuantity(item.productId, quantity)}
                      type="button"
                    >
                      {ru.cart.fix}
                    </button>
                  ) : null}
                  <button
                    className="text-button"
                    onClick={() => removeItem(item.productId)}
                    type="button"
                  >
                    {ru.cart.remove}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="cart-summary">
        <h2>{ru.common.total}</h2>
        <div className="summary-line">
          <span>{ru.cart.orderAmount}</span>
          <strong>{formatRub(total)}</strong>
        </div>
        {hasInvalidItems ? (
          <p>{ru.cart.invalid}</p>
        ) : (
          <p>{ru.cart.noOnlinePayment}</p>
        )}
        {hasInvalidItems ? (
          <>
            <button className="button" onClick={cleanInvalidItems} type="button">
              {ru.cart.fixCart}
            </button>
            <span className="button disabled-link" aria-disabled="true">
              {ru.cart.checkout}
            </span>
          </>
        ) : (
          <Link className="button" href="/checkout">
            {ru.cart.checkout}
          </Link>
        )}
        <button className="button secondary" onClick={clearCart} type="button">
          {ru.cart.clear}
        </button>
      </aside>
    </section>
  );
}
