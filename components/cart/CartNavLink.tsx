"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ru } from "@/lib/i18n/ru";

const CART_KEY = "indira-home-cart";

function getCartCount() {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return 0;

    return parsed.reduce((count, item) => {
      if (!Number.isInteger(item?.quantity) || item.quantity <= 0) return count;
      return count + item.quantity;
    }, 0);
  } catch {
    return 0;
  }
}

export function CartNavLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function syncCount() {
      setCount(getCartCount());
    }

    syncCount();
    window.addEventListener("storage", syncCount);
    window.addEventListener("indira-home-cart-updated", syncCount);

    return () => {
      window.removeEventListener("storage", syncCount);
      window.removeEventListener("indira-home-cart-updated", syncCount);
    };
  }, []);

  return (
    <Link className="cart-nav-link" href="/cart" aria-label={ru.cart.navLabel(count)}>
      <span>{ru.common.cart}</span>
      {count > 0 ? <span className="cart-nav-count">{count}</span> : null}
    </Link>
  );
}
