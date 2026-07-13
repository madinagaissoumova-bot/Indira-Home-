"use client";

import { useEffect, useRef, useState } from "react";
import { ru } from "@/lib/i18n/ru";

type FavoriteButtonProps = {
  productId: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
};

export const FAVORITES_KEY = "indira-home-favorites";
export const FAVORITES_EVENT = "indira-home-favorites-updated";

export function readFavoriteIds() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function writeFavorites(productIds: string[]) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(new Set(productIds))));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function FavoriteButton({
  productId,
  label = ru.favorites.add,
  className = "favorite-button",
  iconOnly = false
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const liveMessageRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    function syncFavorite() {
      setIsFavorite(readFavoriteIds().includes(productId));
      setIsReady(true);
    }

    syncFavorite();
    window.addEventListener("storage", syncFavorite);
    window.addEventListener(FAVORITES_EVENT, syncFavorite);

    return () => {
      window.removeEventListener("storage", syncFavorite);
      window.removeEventListener(FAVORITES_EVENT, syncFavorite);
    };
  }, [productId]);

  function toggleFavorite() {
    const favorites = readFavoriteIds();
    const nextFavorites = favorites.includes(productId)
      ? favorites.filter((item) => item !== productId)
      : [...favorites, productId];

    writeFavorites(nextFavorites);
    setIsFavorite(!favorites.includes(productId));

    if (liveMessageRef.current) {
      liveMessageRef.current.textContent = favorites.includes(productId)
        ? ru.favorites.removeMessage
        : ru.favorites.addMessage;
    }
  }

  const visibleLabel = isFavorite ? ru.favorites.selected : label;

  return (
    <>
      <button
        aria-label={visibleLabel}
        aria-pressed={isReady ? isFavorite : false}
        className={`${className}${isFavorite ? " is-favorite" : ""}`}
        onClick={toggleFavorite}
        type="button"
      >
        <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
        {iconOnly ? <span className="sr-only">{visibleLabel}</span> : <span>{visibleLabel}</span>}
      </button>
      <span className="sr-only" aria-live="polite" ref={liveMessageRef} />
    </>
  );
}
