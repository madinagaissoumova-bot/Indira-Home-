"use client";

import type { FormEvent } from "react";
import { useActionState, useRef } from "react";
import Link from "next/link";
import { ORDER_STATUS } from "@/lib/constants";
import { getAdminOrderStatusLabel } from "@/lib/adminLabels";
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
  const statusSelectRef = useRef<HTMLSelectElement>(null);
  const paymentLabel =
    ru.admin.common.paymentLabels[
      order.paymentMethod as keyof typeof ru.admin.common.paymentLabels
    ] ?? order.paymentMethod;
  const contactPhone = normalizePhoneForLink(order.customerPhone);
  const contactHref = contactPhone ? `tel:+${contactPhone}` : undefined;
  const whatsappHref = contactPhone ? `https://wa.me/${contactPhone}` : undefined;
  const isCancelled = order.status === ORDER_STATUS.cancelled;

  function markOrderCancelled() {
    if (statusSelectRef.current) {
      statusSelectRef.current.value = ORDER_STATUS.cancelled;
    }
  }

  return (
    <div className="admin-order-detail">
      <section className="admin-order-header">
        <div>
          <span className="eyebrow">{ru.admin.orders.title}</span>
          <h1>{order.orderNumber}</h1>
        </div>
        <div className="admin-order-meta">
          <span className="admin-badge">{getAdminOrderStatusLabel(order.status)}</span>
          <strong>{formatRub(order.totalRub)}</strong>
          <Link className="button secondary admin-mini-button" href="/admin/orders">
            {ru.admin.orders.back}
          </Link>
        </div>
      </section>

      <section className="admin-dashboard-section">
        <div className="admin-section-heading">
          <h2>{ru.admin.orders.customerInfo}</h2>
        </div>
        <div className="admin-order-info">
          <div>
            <span>{ru.admin.common.customer}</span>
            <strong>{order.customerName}</strong>
          </div>
          <div>
            <span>{ru.admin.common.address}</span>
            <strong>{order.deliveryAddressOrZone}</strong>
          </div>
          <div>
            <span>{ru.admin.common.payment}</span>
            <strong>{paymentLabel}</strong>
          </div>
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
      </section>

      <section className="admin-dashboard-section">
        <div className="admin-section-heading">
          <h2>{ru.admin.orders.orderedProducts}</h2>
        </div>
        <div className="checkout-items">
          {order.items.map((item) => (
            <div className="admin-list-row admin-order-item-row" key={item.id}>
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

      <form action={action} className="admin-dashboard-section" onSubmit={confirmCancellation}>
        <div className="admin-section-heading">
          <h2>{ru.admin.orders.editOrder}</h2>
        </div>
        {state.error ? <p className="form-error">{state.error}</p> : null}
        {state.success ? <p>{state.success}</p> : null}
        <input name="orderId" type="hidden" value={order.id} />
        <div className="field">
          <label htmlFor={`status-${order.id}`}>{ru.admin.common.status}</label>
          <select
            className="input"
            defaultValue={order.status}
            id={`status-${order.id}`}
            name="status"
            ref={statusSelectRef}
          >
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
        <div className="admin-contact-actions">
          <button className="button" disabled={isPending} type="submit">
            {ru.admin.common.save}
          </button>
          <button
            className="button secondary"
            disabled={isPending || isCancelled}
            name="intent"
            onClick={markOrderCancelled}
            type="submit"
            value="cancelOrder"
          >
            {ru.admin.orders.cancelOrder}
          </button>
        </div>
      </form>
    </div>
  );
}
