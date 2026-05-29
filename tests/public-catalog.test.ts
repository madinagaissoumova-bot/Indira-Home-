import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { isCommandableProduct, isPublicProduct, publicProductWhere } from "@/lib/publicCatalog";

const visibleCategory = { status: VISIBILITY_STATUS.visible };
const hiddenCategory = { status: VISIBILITY_STATUS.hidden };

describe("public catalog rules", () => {
  it("uses the canonical Prisma filter for public products", () => {
    assert.deepEqual(publicProductWhere, {
      status: PRODUCT_STATUS.published,
      priceRub: { gt: 0 },
      images: { some: {} },
      category: { status: VISIBILITY_STATUS.visible },
      subcategory: { status: VISIBILITY_STATUS.visible }
    });
  });

  it("keeps drafts, hidden products and hidden taxonomy out of the public catalog", () => {
    assert.equal(
      isPublicProduct({
        status: PRODUCT_STATUS.published,
        category: visibleCategory,
        subcategory: visibleCategory
      }),
      true
    );

    assert.equal(
      isPublicProduct({
        status: PRODUCT_STATUS.draft,
        category: visibleCategory,
        subcategory: visibleCategory
      }),
      false
    );

    assert.equal(
      isPublicProduct({
        status: PRODUCT_STATUS.published,
        category: hiddenCategory,
        subcategory: visibleCategory
      }),
      false
    );
  });

  it("allows ordering only when the public product has stock and a valid price", () => {
    const product = {
      status: PRODUCT_STATUS.published,
      category: visibleCategory,
      subcategory: visibleCategory,
      stockQuantity: 1,
      priceRub: 1200
    };

    assert.equal(isCommandableProduct(product), true);
    assert.equal(isCommandableProduct({ ...product, stockQuantity: 0 }), false);
    assert.equal(isCommandableProduct({ ...product, priceRub: 0 }), false);
  });
});
