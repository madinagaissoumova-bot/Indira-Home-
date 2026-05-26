"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatRub } from "@/lib/format";
import { ru } from "@/lib/i18n/ru";

const CONFIRMATION_KEY = "indira-home-last-order-confirmation";

type ConfirmationData = {
  orderNumber: string;
  totalRub?: number;
};

type ConfirmationClientProps = {
  initialOrderNumber?: string;
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

export function ConfirmationClient({ initialOrderNumber }: ConfirmationClientProps) {
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null);

  useEffect(() => {
    const savedConfirmation = readConfirmation();
    setConfirmation(savedConfirmation ?? (initialOrderNumber ? { orderNumber: initialOrderNumber } : null));
  }, [initialOrderNumber]);

  return (
    <div className="empty-state">
      {confirmation ? (
        <>
          <p>{ru.confirmation.orderNumber(confirmation.orderNumber)}</p>
          {confirmation.totalRub != null ? <p>{formatRub(confirmation.totalRub)}</p> : null}
        </>
      ) : (
        <p>{ru.confirmation.noRecentOrder}</p>
      )}
      {confirmation ? (
        <>
          <p>{ru.confirmation.delivery}</p>
          <p>{ru.confirmation.deliveryFee}</p>
          <p>{ru.confirmation.changeOrCancel}</p>
          <p>{ru.common.whatsappShop}</p>
        </>
      ) : null}
      <Link className="button" href="/">
        {ru.common.backToCatalog}
      </Link>
    </div>
  );
}
