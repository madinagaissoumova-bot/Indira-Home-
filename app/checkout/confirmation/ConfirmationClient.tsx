"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";

const CONFIRMATION_KEY = "indira-home-last-order-confirmation";
const WHATSAPP_CONFIRMATION_HREF = `https://wa.me/79889064106?text=${encodeURIComponent(
  ru.confirmation.whatsappText
)}`;

type ConfirmationData = {
  orderNumber: string;
  totalRub?: number;
};

function readConfirmation(): ConfirmationData | null {
  try {
    const raw = window.sessionStorage.getItem(CONFIRMATION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.orderNumber !== "string") return null;

    return {
      orderNumber: parsed.orderNumber,
      totalRub: typeof parsed.totalRub === "number" ? parsed.totalRub : undefined
    };
  } catch {
    return null;
  }
}

export function ConfirmationClient() {
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null);

  useEffect(() => {
    setConfirmation(readConfirmation());
  }, []);

  return (
    <div className={`confirmation-panel${confirmation ? " has-order" : ""}`}>
      {confirmation ? (
        <>
          <div className="confirmation-reference">
            <span>{ru.confirmation.orderNumber(confirmation.orderNumber)}</span>
            {confirmation.totalRub != null ? <strong>{formatRub(confirmation.totalRub)}</strong> : null}
          </div>
          <p>{ru.confirmation.message}</p>
          <p>{ru.common.whatsappShop}</p>
          <a className="button secondary whatsapp-button" href={WHATSAPP_CONFIRMATION_HREF} target="_blank" rel="noreferrer">
            {ru.product.whatsappButton}
          </a>
        </>
      ) : (
        <p>{ru.confirmation.noRecentOrder}</p>
      )}
      <Link className="button" href="/">
        {ru.common.backToCatalog}
      </Link>
    </div>
  );
}
