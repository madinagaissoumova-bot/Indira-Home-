"use client";

import type { FormEvent } from "react";
import { useActionState } from "react";
import { ORDER_STATUS } from "@/lib/constants";
import type { AdminActionState } from "../actions";
import { updateOrderAction } from "../actions";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";
import type { AdminOrderEditorOrder } from "@/types";

type OrderEditorProps = {
  order: AdminOrderEditorOrder;
};

function initialState(): AdminActionState {
  return {};
}

function normalizePhoneForLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) return `7${digits.slice(1)}`;
  return digits;
}

function confirmCancellation(event: FormEvent<HTMLFormElement>) {
  const formData = new FormData(event.currentTarget);
  if (formData.get("status") === ORDER_STATUS.cancelled && !window.confirm(ru.admin.orders.confirmCancel)) {
    event.preventDefault();
  }
}

export function OrderEditor({ order }: OrderEditorProps) {
  const [state, action, isPending] = useActionState(updateOrderAction, initialState());
  const paymentLabel =
    ru.admin.common.paymentLabels[
      order.paymentMethod as keyof typeof ru.admin.common.paymentLabels
    ] ?? order.paymentMethod;
  const contactPhone = normalizePhoneForLink(order.customerPhone);
  const contactHref = contactPhone ? `tel:+${contactPhone}` : undefined;
  const whatsappHref = contactPhone ? `https://wa.me/${contactPhone}` : undefined;

  return (
    <div className="checkout-layout">
      <section className="form-panel">
        <h2>{ru.admin.orders.customerInfo}</h2>
        <div className="summary-line">
          <span>{ru.admin.common.customer}</span>
          <strong>{order.customerName}</strong>
        </div>
        <div className="summary-line">
          <span>{ru.admin.common.phone}</span>
          <strong>{order.customerPhone}</strong>
        </div>
        {contactHref || whatsappHref ? (
          <div className="admin-contact-actions">
            {contactHref ? (
              <a className="button secondary" href={contactHref}>
                {ru.admin.orders.callCustomer}
              </a>
            ) : null}
            {whatsappHref ? (
              <a className="button secondary whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer">
                {ru.admin.orders.whatsappCustomer}
              </a>
            ) : null}
          </div>
        ) : null}
        <div className="summary-line">
          <span>{ru.admin.common.address}</span>
          <strong>{order.deliveryAddressOrZone}</strong>
        </div>
        <div className="summary-line">
          <span>{ru.admin.common.payment}</span>
          <strong>{paymentLabel}</strong>
        </div>
      </section>

      <section className="cart-summary">
        <h2>{ru.admin.orders.orderedProducts}</h2>
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
          <span>{ru.admin.common.total}</span>
          <strong>{formatRub(order.totalRub)}</strong>
        </div>
      </section>

      <form action={action} className="form-panel" onSubmit={confirmCancellation}>
        <h2>{ru.admin.orders.editOrder}</h2>
        {state.error ? <p className="form-error">{state.error}</p> : null}
        {state.success ? <p>{state.success}</p> : null}
        <input name="orderId" type="hidden" value={order.id} />
        <div className="field">
          <label htmlFor={`status-${order.id}`}>{ru.admin.common.status}</label>
          <select className="input" defaultValue={order.status} id={`status-${order.id}`} name="status">
            <option value={ORDER_STATUS.new}>{ru.admin.common.statusLabels.NEW}</option>
            <option value={ORDER_STATUS.toConfirm}>{ru.admin.common.statusLabels.TO_CONFIRM}</option>
            <option value={ORDER_STATUS.confirmed}>{ru.admin.common.statusLabels.CONFIRMED}</option>
            <option value={ORDER_STATUS.preparing}>{ru.admin.common.statusLabels.PREPARING}</option>
            <option value={ORDER_STATUS.delivered}>{ru.admin.common.statusLabels.DELIVERED}</option>
            <option value={ORDER_STATUS.cancelled}>{ru.admin.common.statusLabels.CANCELLED}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={`adminNote-${order.id}`}>{ru.admin.common.note}</label>
          <textarea
            className="input textarea"
            defaultValue={order.adminNote ?? ""}
            id={`adminNote-${order.id}`}
            name="adminNote"
          />
        </div>
        <button className="button" disabled={isPending} type="submit">
          {ru.admin.common.save}
        </button>
      </form>
    </div>
  );
}
