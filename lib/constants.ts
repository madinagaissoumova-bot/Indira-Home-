export const PRODUCT_STATUS = {
  draft: "DRAFT",
  published: "PUBLISHED",
  hidden: "HIDDEN"
} as const;

export const VISIBILITY_STATUS = {
  visible: "VISIBLE",
  hidden: "HIDDEN"
} as const;

export const PAYMENT_METHOD = {
  cashOnDelivery: "CASH_ON_DELIVERY",
  transferAfterConfirmation: "TRANSFER_AFTER_CONFIRMATION"
} as const;

export const ORDER_STATUS = {
  new: "NEW",
  toConfirm: "TO_CONFIRM",
  confirmed: "CONFIRMED",
  preparing: "PREPARING",
  delivered: "DELIVERED",
  cancelled: "CANCELLED"
} as const;
