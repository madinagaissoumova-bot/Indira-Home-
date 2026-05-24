"use client";

import { useEffect, useRef, useState } from "react";
import { ru } from "@/lib/i18n/ru";
import type { CartStorageItem } from "@/types";

type AddToCartButtonProps = {
  productId: string;
  disabled?: boolean;
  label?: string;
  maxQuantity?: number;
};

const CART_KEY = "indira-home-cart";

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
          item.quantity > 0
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
  maxQuantity
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const resetTimer = useRef<number | null>(null);

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

    if (maxQuantity != null && currentQuantity >= maxQuantity) {
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
      existing.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
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

  return (
    <button
      className={`button add-to-cart-button${isAdded ? " is-added" : ""}`}
      disabled={disabled}
      onClick={addToCart}
      type="button"
    >
      {disabled
        ? ru.common.unavailable
        : isLimitReached
          ? ru.cart.maxReached
          : isAdded
            ? ru.common.added
            : label}
    </button>
  );
}
