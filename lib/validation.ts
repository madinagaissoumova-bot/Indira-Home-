import { ORDER_STATUS, PAYMENT_METHOD, PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";

const SLUG_PATTERN = /^(?!-)(?!.*--)[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RUSSIAN_PHONE_PATTERN = /^(7|8)[0-9]{6,19}$/;

export function parseInteger(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

export function isNonNegativeInteger(value: number | null): value is number {
  return value != null && Number.isInteger(value) && value >= 0;
}

export function isPositiveInteger(value: number | null): value is number {
  return value != null && Number.isInteger(value) && value > 0;
}

export function parseAllowedValue<T extends string>(value: string, allowed: readonly T[]) {
  return allowed.includes(value as T) ? (value as T) : null;
}

export function parseProductStatus(value: string) {
  return parseAllowedValue(value, Object.values(PRODUCT_STATUS));
}

export function parseVisibilityStatus(value: string) {
  return parseAllowedValue(value, Object.values(VISIBILITY_STATUS));
}

export function parsePaymentMethod(value: string) {
  return parseAllowedValue(value, Object.values(PAYMENT_METHOD));
}

export function parseOrderStatus(value: string) {
  return parseAllowedValue(value, Object.values(ORDER_STATUS));
}

export function isValidSlug(value: string) {
  return SLUG_PATTERN.test(value);
}

export function hasLength(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}

export function normalizePhoneDigits(value: string) {
  return value.replace(/[\s()+-]/g, "");
}

export function isValidRussianContactPhone(value: string) {
  return RUSSIAN_PHONE_PATTERN.test(normalizePhoneDigits(value));
}

export function isClearlyOutsideChechnya(address: string) {
  const value = address.toLowerCase();
  const chechnyaSignals = ["чеч", "гроз", "аргун", "шали", "гудермес", "урус", "chechen"];
  const outsideSignals = ["москва", "санкт", "петербург", "дагестан", "ингуш", "ставроп", "краснодар"];

  return outsideSignals.some((signal) => value.includes(signal)) &&
    !chechnyaSignals.some((signal) => value.includes(signal));
}

export function isValidProductImageUrl(value: string) {
  if (value.startsWith("/uploads/") && !value.includes("..")) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function createSlugFallback(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}
