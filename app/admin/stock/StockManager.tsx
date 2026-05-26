"use client";

import { useActionState } from "react";
import { STOCK_ADJUSTMENT_MODE } from "@/lib/constants";
import { getAdminProductStatusLabel } from "@/lib/adminLabels";
import { ru } from "@/lib/i18n/ru";
import type { AdminActionState } from "../actions";
import { adjustStockAction } from "../actions";
import type { AdminStockProductItem } from "@/types";

type StockManagerProps = {
  products: AdminStockProductItem[];
};

function initialState(): AdminActionState {
  return {};
}

function StockRow({ product }: { product: AdminStockProductItem }) {
  const [state, action, isPending] = useActionState(adjustStockAction, initialState());
  const statusLabel = getAdminProductStatusLabel(product.status);

  return (
    <form action={action} className="summary-line">
      <input name="productId" type="hidden" value={product.id} />
      <span>
        {product.name} · {product.category.name} / {product.subcategory.name}
        <br />
        <small>
          {statusLabel} · {ru.admin.stock.current}: {product.stockQuantity}
        </small>
      </span>
      <div className="stock-controls">
        <div className="field">
          <label htmlFor={`stockQuantity-${product.id}`}>{ru.admin.stock.quantity}</label>
          <input className="input" defaultValue={0} id={`stockQuantity-${product.id}`} min={0} name="stockQuantity" type="number" />
        </div>
        <div className="stock-actions">
          <button className="button secondary" disabled={isPending} name="mode" value={STOCK_ADJUSTMENT_MODE.add} type="submit">
            {ru.admin.stock.add}
          </button>
          <button className="button secondary" disabled={isPending} name="mode" value={STOCK_ADJUSTMENT_MODE.remove} type="submit">
            {ru.admin.stock.remove}
          </button>
          <button className="button" disabled={isPending} name="mode" value={STOCK_ADJUSTMENT_MODE.set} type="submit">
            {ru.admin.stock.set}
          </button>
        </div>
      </div>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      {state.success ? <p>{state.success}</p> : null}
    </form>
  );
}

export function StockManager({ products }: StockManagerProps) {
  return (
    <section className="form-panel">
      <h2>{ru.admin.stock.available}</h2>
      <p>{ru.admin.stock.help}</p>
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
