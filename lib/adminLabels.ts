import { ru } from "@/lib/i18n/ru";

export function getAdminOrderStatusLabel(status: string) {
  return ru.admin.common.statusLabels[status as keyof typeof ru.admin.common.statusLabels] ?? status;
}

export function getAdminProductStatusLabel(status: string) {
  return (
    ru.admin.common.productStatusLabels[status as keyof typeof ru.admin.common.productStatusLabels] ?? status
  );
}

