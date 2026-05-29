import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hasLength,
  isNonNegativeInteger,
  isPositiveInteger,
  isClearlyOutsideChechnya,
  isValidProductImageUrl,
  isValidRussianContactPhone,
  isValidSlug,
  normalizePhoneDigits,
  parseInteger,
  parseOrderStatus,
  parsePaymentMethod,
  parseProductStatus,
  parseVisibilityStatus
} from "@/lib/validation";
import { ORDER_STATUS, PAYMENT_METHOD, PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";

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

  it("parses only safe integer values", () => {
    assert.equal(parseInteger("12"), 12);
    assert.equal(parseInteger("0"), 0);
    assert.equal(parseInteger("12.5"), null);
    assert.equal(parseInteger("abc"), null);
    assert.equal(parseInteger(null), null);
  });

  it("validates positive and non-negative integer business rules", () => {
    assert.equal(isPositiveInteger(1), true);
    assert.equal(isPositiveInteger(0), false);
    assert.equal(isPositiveInteger(-1), false);
    assert.equal(isPositiveInteger(null), false);

    assert.equal(isNonNegativeInteger(0), true);
    assert.equal(isNonNegativeInteger(2), true);
    assert.equal(isNonNegativeInteger(-1), false);
    assert.equal(isNonNegativeInteger(null), false);
  });

  it("accepts only storage values defined in constants", () => {
    assert.equal(parseProductStatus(PRODUCT_STATUS.published), PRODUCT_STATUS.published);
    assert.equal(parseProductStatus("published"), null);

    assert.equal(parseVisibilityStatus(VISIBILITY_STATUS.visible), VISIBILITY_STATUS.visible);
    assert.equal(parseVisibilityStatus("VISIBLE "), null);

    assert.equal(parsePaymentMethod(PAYMENT_METHOD.cashOnDelivery), PAYMENT_METHOD.cashOnDelivery);
    assert.equal(parsePaymentMethod("CARD"), null);

    assert.equal(parseOrderStatus(ORDER_STATUS.confirmed), ORDER_STATUS.confirmed);
    assert.equal(parseOrderStatus("CONFIRMEE"), null);
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
