"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FAVORITES_EVENT, readFavoriteIds } from "@/components/favorites/FavoriteButton";
import { HeartIcon } from "@/components/layout/PublicIcons";
import { ru } from "@/lib/i18n/ru";

function getFavoriteCount() {
  return readFavoriteIds().length;
}

type FavoritesNavLinkProps = {
  onNavigate?: () => void;
};

export function FavoritesNavLink({ onNavigate }: FavoritesNavLinkProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function syncCount() {
      setCount(getFavoriteCount());
    }

    syncCount();
    window.addEventListener("storage", syncCount);
    window.addEventListener(FAVORITES_EVENT, syncCount);

    return () => {
      window.removeEventListener("storage", syncCount);
      window.removeEventListener(FAVORITES_EVENT, syncCount);
    };
  }, []);

  return (
    <Link
      aria-label={ru.favorites.navLabel(count)}
      className="favorites-nav-link"
      href="/favorites"
      onClick={onNavigate}
    >
      <span className="favorites-nav-icon" aria-hidden="true">
        <HeartIcon />
      </span>
      <span className="favorites-nav-text">{ru.common.favorites}</span>
      {count > 0 ? <span className="favorites-nav-count">{count}</span> : null}
    </Link>
  );
}
