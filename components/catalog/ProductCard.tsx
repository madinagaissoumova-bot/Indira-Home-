import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/.i18n/ru";

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
  meta?: "category" | "subcategory" | "both";
  compact?: boolean;
};

export function ProductCard({ product, meta = "both", compact = true }: ProductCardProps) {
  const image = product.images[0];
  const isSoldOut = product.stockQuantity <= 0;
  const metaText = [
    meta === "both" || meta === "category" ? product.category?.name : null,
    meta === "both" || meta === "subcategory" ? product.subcategory?.name : null
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <article className={`product-card${compact ? " compact" : ""}`}>
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
      <div className="product-body">
        <div className="price-row">
          {product.isNew ? <span className="badge new">{ru.common.new}</span> : <span />}
          {isSoldOut ? <span className="badge sold-out">{ru.common.soldOut}</span> : null}
        </div>
        <h3 className="product-title">{product.name}</h3>
        {metaText ? <div className="product-meta">{metaText}</div> : null}
        <span className="price">{formatRub(product.priceRub)}</span>
        <div className="card-actions">
          <Link className="button secondary" href={`/product/${product.slug}`}>
            {ru.common.viewProduct}
          </Link>
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
