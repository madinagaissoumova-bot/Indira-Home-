import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hasLength, isValidProductImageUrl, isValidSlug } from "@/lib/validation";

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
});
