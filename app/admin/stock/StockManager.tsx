"use client";

import { useActionState } from "react";
import { ru } from "@/lib/i18n/ru";
import type { AdminActionState } from "../actions";
import { setStockAction } from "../actions";

type ProductItem = {
  id: string;
  name: string;
  slug: string;
  stockQuantity: number;
  status: string;
  category: { name: string };
  subcategory: { name: string };
};

type StockManagerProps = {
  products: ProductItem[];
};

function initialState(): AdminActionState {
  return {};
}

function StockRow({ product }: { product: ProductItem }) {
  const [state, action, isPending] = useActionState(setStockAction, initialState());

  return (
    <form action={action} className="summary-line">
      <input name="productId" type="hidden" value={product.id} />
      <span>
        {product.name} · {product.category.name} / {product.subcategory.name}
        <br />
        <small>{product.status}</small>
      </span>
      <div className="stock-controls">
        <input
          className="input"
          defaultValue={product.stockQuantity}
          min={0}
          name="stockQuantity"
          type="number"
        />
        <button className="button secondary" disabled={isPending} type="submit">
          Mettre a jour
        </button>
      </div>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p>{state.success}</p> : null}
    </form>
  );
}

export function StockManager({ products }: StockManagerProps) {
  return (
    <section className="form-panel">
      <h2>Stock disponible</h2>
      {products.length > 0 ? (
        <div className="checkout-items">
          {products.map((product) => (
            <StockRow key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>{ru.admin.stock.empty}</p>
      )}
    </section>
  );
}
