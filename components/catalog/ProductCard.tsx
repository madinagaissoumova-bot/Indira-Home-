import Image from "next/image";
import Link from "next/link";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  priceRub: number;
  stockQuantity: number;
  isNew: boolean;
  category?: { name: string } | null;
  subcategory?: { name: string } | null;
  images: { url: string; alt: string }[];
};

type ProductCardProps = {
  product: ProductCardData;
  compact?: boolean;
};

export function ProductCard({ product, compact = true }: ProductCardProps) {
  const image = product.images[0];
  const isSoldOut = product.stockQuantity <= 0;
  const hasBadges = product.isNew || isSoldOut;

  return (
    <article className={`product-card${compact ? " compact" : ""}${isSoldOut ? " is-sold-out" : ""}`}>
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
        <div className="card-actions">
          <AddToCartButton
            disabled={isSoldOut}
            label={ru.common.addToCart}
            maxQuantity={product.stockQuantity}
            productId={product.id}
          />
        </div>
      </div>
    </article>
  );
}
