"use client";

import { useActionState } from "react";
import { ORDER_STATUS } from "@/lib/constants";
import type { AdminActionState } from "../actions";
import { updateOrderAction } from "../actions";
import { formatRub } from "@/lib/format";

type OrderItem = {
  id: string;
  productNameSnapshot: string;
  quantity: number;
  subtotalRub: number;
};

type OrderEditorOrder = {
  id: string;
  orderNumber: string;
  status: string;
  totalRub: number;
  customerName: string;
  customerPhone: string;
  deliveryAddressOrZone: string;
  paymentMethod: string;
  adminNote: string | null;
  items: OrderItem[];
};

type OrderEditorProps = {
  order: OrderEditorOrder;
};

function initialState(): AdminActionState {
  return {};
}

export function OrderEditor({ order }: OrderEditorProps) {
  const [state, action, isPending] = useActionState(updateOrderAction, initialState());

  return (
    <div className="checkout-layout">
      <section className="form-panel">
        <h2>Informations client</h2>
        <div className="summary-line">
          <span>Nom</span>
          <strong>{order.customerName}</strong>
        </div>
        <div className="summary-line">
          <span>Telephone</span>
          <strong>{order.customerPhone}</strong>
        </div>
        <div className="summary-line">
          <span>Adresse / zone</span>
          <strong>{order.deliveryAddressOrZone}</strong>
        </div>
        <div className="summary-line">
          <span>Paiement</span>
          <strong>{order.paymentMethod}</strong>
        </div>
      </section>

      <section className="cart-summary">
        <h2>Produits commandes</h2>
        <div className="checkout-items">
          {order.items.map((item) => (
            <div className="summary-line" key={item.id}>
              <span>
                {item.productNameSnapshot} x {item.quantity}
              </span>
              <strong>{formatRub(item.subtotalRub)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-line">
          <span>Total</span>
          <strong>{formatRub(order.totalRub)}</strong>
        </div>
      </section>

      <form action={action} className="form-panel">
        <h2>Modifier la commande</h2>
        {state.error ? <p className="form-error">{state.error}</p> : null}
        {state.success ? <p>{state.success}</p> : null}
        <input name="orderId" type="hidden" value={order.id} />
        <div className="field">
          <label htmlFor={`status-${order.id}`}>Statut</label>
          <select className="input" defaultValue={order.status} id={`status-${order.id}`} name="status">
            <option value={ORDER_STATUS.new}>New</option>
            <option value={ORDER_STATUS.toConfirm}>A confirmer</option>
            <option value={ORDER_STATUS.confirmed}>Confirmee</option>
            <option value={ORDER_STATUS.preparing}>Preparation</option>
            <option value={ORDER_STATUS.delivered}>Livree</option>
            <option value={ORDER_STATUS.cancelled}>Annulee</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={`adminNote-${order.id}`}>Note interne</label>
          <textarea
            className="input textarea"
            defaultValue={order.adminNote ?? ""}
            id={`adminNote-${order.id}`}
            name="adminNote"
          />
        </div>
        <button className="button" disabled={isPending} type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
