"use client";

import { useEffect, useRef, useState } from "react";
import { ru } from "@/lib/i18n/ru";
import type { CartStorageItem } from "@/types";

type AddToCartButtonProps = {
  productId: string;
  disabled?: boolean;
  label?: string;
  maxQuantity?: number;
  withQuantity?: boolean;
};

const CART_KEY = "indira-home-cart";
const MAX_CART_QUANTITY_PER_PRODUCT = 99;

function readCart(): CartStorageItem[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item): item is CartStorageItem =>
          typeof item?.productId === "string" &&
          Number.isInteger(item?.quantity) &&
          item.quantity > 0 &&
          item.quantity <= MAX_CART_QUANTITY_PER_PRODUCT
      )
      .map((item) => ({ productId: item.productId, quantity: item.quantity }));
  } catch {
    return [];
  }
}

function writeCart(items: CartStorageItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("indira-home-cart-updated"));
}

export function AddToCartButton({
  productId,
  disabled = false,
  label = ru.common.addToCartLong,
  maxQuantity,
  withQuantity = false
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const resetTimer = useRef<number | null>(null);
  const quantityLimit =
    maxQuantity == null
      ? MAX_CART_QUANTITY_PER_PRODUCT
      : Math.max(0, Math.min(maxQuantity, MAX_CART_QUANTITY_PER_PRODUCT));

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function addToCart() {
    const cart = readCart();
    const existing = cart.find((item) => item.productId === productId);
    const currentQuantity = existing?.quantity ?? 0;
    const quantityToAdd = withQuantity ? selectedQuantity : 1;

    if (disabled || quantityLimit < 1 || currentQuantity + quantityToAdd > quantityLimit) {
      setIsAdded(false);
      setIsLimitReached(true);

      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }

      resetTimer.current = window.setTimeout(() => {
        setIsLimitReached(false);
      }, 1600);
      return;
    }

    if (existing) {
      existing.quantity += quantityToAdd;
    } else {
      cart.push({ productId, quantity: quantityToAdd });
    }

    writeCart(cart);
    setIsAdded(true);
    setIsLimitReached(false);

    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }

    resetTimer.current = window.setTimeout(() => {
      setIsAdded(false);
    }, 1600);
  }

  function updateSelectedQuantity(quantity: number) {
    setSelectedQuantity(Math.min(Math.max(quantity, 1), Math.max(quantityLimit, 1)));
    setIsLimitReached(false);
  }

  const button = (
    <button
      className={`button add-to-cart-button${isAdded ? " is-added" : ""}`}
      disabled={disabled || quantityLimit < 1}
      onClick={addToCart}
      type="button"
    >
      {disabled || quantityLimit < 1
        ? ru.common.unavailable
        : isLimitReached
          ? ru.cart.maxReached
          : isAdded
            ? ru.common.added
            : label}
    </button>
  );

  if (withQuantity && !disabled && quantityLimit > 1) {
    return (
      <div className="add-to-cart-with-quantity">
        <div className="quantity-controls compact" aria-label={ru.common.quantity}>
          <button
            className="icon-button"
            disabled={selectedQuantity <= 1}
            onClick={() => updateSelectedQuantity(selectedQuantity - 1)}
            type="button"
          >
            -
          </button>
          <span>{selectedQuantity}</span>
          <button
            className="icon-button"
            disabled={selectedQuantity >= quantityLimit}
            onClick={() => updateSelectedQuantity(selectedQuantity + 1)}
            type="button"
          >
            +
          </button>
        </div>
        {button}
      </div>
    );
  }

  return button;
}
