"use client";

import { useEffect, useRef, useState } from "react";

type AddToCartButtonProps = {
  productId: string;
  disabled?: boolean;
  label?: string;
};

const CART_KEY = "indira-home-cart";

type CartItem = {
  productId: string;
  quantity: number;
};

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item): item is CartItem =>
          typeof item?.productId === "string" &&
          Number.isInteger(item?.quantity) &&
          item.quantity > 0
      )
      .map((item) => ({ productId: item.productId, quantity: item.quantity }));
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("indira-home-cart-updated"));
}

export function AddToCartButton({
  productId,
  disabled = false,
  label = "Добавить в корзину"
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
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

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    writeCart(cart);
    setIsAdded(true);

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
      {disabled ? "Недоступно" : isAdded ? "Добавлено" : label}
    </button>
  );
}
