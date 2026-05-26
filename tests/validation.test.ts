import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hasLength,
  isClearlyOutsideChechnya,
  isValidProductImageUrl,
  isValidRussianContactPhone,
  isValidSlug,
  normalizePhoneDigits
} from "@/lib/validation";

describe("validation helpers", () => {
  it("accepts only V1-safe slugs", () => {
    assert.equal(isValidSlug("serviz-white-39"), true);
    assert.equal(isValidSlug("serviz--white"), false);
    assert.equal(isValidSlug("-serviz"), false);
    assert.equal(isValidSlug("serviz-"), false);
    assert.equal(isValidSlug("Сервиз"), false);
  });

  it("accepts http, https and local upload product images", () => {
    assert.equal(isValidProductImageUrl("https://example.com/image.png"), true);
    assert.equal(isValidProductImageUrl("http://example.com/image.png"), true);
    assert.equal(isValidProductImageUrl("/uploads/products/image.png"), true);
    assert.equal(isValidProductImageUrl("/uploads/../secret.txt"), false);
    assert.equal(isValidProductImageUrl("javascript:alert(1)"), false);
  });

  it("checks trimmed text length boundaries passed by callers", () => {
    assert.equal(hasLength("ab", 2, 4), true);
    assert.equal(hasLength("a", 2, 4), false);
    assert.equal(hasLength("abcde", 2, 4), false);
  });

  it("normalizes and validates Russian customer phones", () => {
    assert.equal(normalizePhoneDigits("+7 988 906-41-06"), "79889064106");
    assert.equal(isValidRussianContactPhone("+7 988 906-41-06"), true);
    assert.equal(isValidRussianContactPhone("8 (988) 906-41-06"), true);
    assert.equal(isValidRussianContactPhone("9889064106"), false);
    assert.equal(isValidRussianContactPhone("+33 1 23 45 67 89"), false);
  });

  it("blocks only clearly outside Chechen delivery zones", () => {
    assert.equal(isClearlyOutsideChechnya("Грозный, ул. Ленина, дом 1"), false);
    assert.equal(isClearlyOutsideChechnya("Чеченская Республика, Шали"), false);
    assert.equal(isClearlyOutsideChechnya("Москва, ул. Тверская"), true);
    assert.equal(isClearlyOutsideChechnya("Грозный, доставка из Москвы обсуждается"), false);
  });
});
