"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FAVORITES_EVENT,
  FavoriteButton,
  readFavoriteIds
} from "@/components/favorites/FavoriteButton";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";
import type { PublicFavoriteProduct } from "@/lib/publicCatalog";

type FavoritesClientProps = {
  products: PublicFavoriteProduct[];
};

export function FavoritesClient({ products }: FavoritesClientProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    function syncFavorites() {
      setFavoriteIds(readFavoriteIds());
      setIsReady(true);
    }

    syncFavorites();
    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
    };
  }, []);

  const favoriteProducts = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));

    return favoriteIds
      .map((productId) => byId.get(productId))
      .filter((product): product is PublicFavoriteProduct => Boolean(product));
  }, [favoriteIds, products]);

  if (!isReady) {
    return (
      <div className="empty-state favorites-empty">
        <p>{ru.favorites.loading}</p>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="empty-state favorites-empty">
        <p>{ru.favorites.empty}</p>
        <Link className="button secondary" href="/">
          {ru.favorites.backToCatalog}
        </Link>
      </div>
    );
  }

  return (
    <section className="favorites-results" aria-label={ru.common.favorites}>
      <p className="favorites-count">{ru.favorites.count(favoriteProducts.length)}</p>
      <div className="product-grid compact">
        {favoriteProducts.map((product) => {
          const image = product.images[0];
          const isSoldOut = product.stockQuantity <= 0;
          const hasBadges = product.isNew || isSoldOut;

          return (
            <article
              className={`product-card compact${isSoldOut ? " is-sold-out" : ""}`}
              key={product.id}
            >
              <Link className="product-image-link" href={`/product/${product.slug}`} aria-label={product.name}>
                {image ? (
                  <Image
                    alt={image.alt}
                    className="product-image"
                    height={800}
                    src={image.url}
                    unoptimized
                    width={600}
                  />
                ) : (
                  <div className="product-image" />
                )}
                {hasBadges ? (
                  <span className="product-badges" aria-hidden="true">
                    {product.isNew ? <span className="badge new">{ru.common.new}</span> : null}
                    {isSoldOut ? <span className="badge sold-out">{ru.common.soldOut}</span> : null}
                  </span>
                ) : null}
              </Link>
              <FavoriteButton className="product-favorite" iconOnly productId={product.id} />
              <div className="product-body">
                <h3 className="product-title">
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                <span className="price">{formatRub(product.priceRub)}</span>
                <div className="product-color-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
