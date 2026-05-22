const SLUG_PATTERN = /^(?!-)(?!.*--)[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(value: string) {
  return SLUG_PATTERN.test(value);
}

export function hasLength(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
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
