import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseCartInput, verifyCartForOrder } from "@/lib/serverCart";

function formValue(value: unknown) {
  return JSON.stringify(value);
}

function fakeDb(products: unknown[]) {
  return {
    product: {
      async findMany() {
        return products;
      }
    }
  };
}

describe("parseCartInput", () => {
  it("keeps only productId and safe positive quantities", () => {
    assert.deepEqual(
      parseCartInput(
        formValue([
          { productId: "p1", quantity: 2, ignored: "value" },
          { productId: "p1", quantity: 3 },
          { productId: "p2", quantity: 0 },
          { productId: "p3", quantity: 100 },
          { productId: "p4", quantity: 1.5 },
          { productId: 1, quantity: 1 }
        ])
      ),
      [{ productId: "p1", quantity: 5 }]
    );
  });

  it("drops duplicate quantities that would exceed the per-product cap", () => {
    assert.deepEqual(
      parseCartInput(
        formValue([
          { productId: "p1", quantity: 70 },
          { productId: "p1", quantity: 40 },
          { productId: "p2", quantity: 99 }
        ])
      ),
      [
        { productId: "p1", quantity: 70 },
        { productId: "p2", quantity: 99 }
      ]
    );
  });
});

describe("verifyCartForOrder", () => {
  const product = {
    id: "p1",
    name: "Товар",
    priceRub: 1200,
    stockQuantity: 3,
    images: [{ url: "/uploads/products/test.png" }]
  };

  it("calculates server totals from verified products", async () => {
    const result = await verifyCartForOrder(
      [{ productId: "p1", quantity: 2 }],
      fakeDb([product]) as never
    );

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.totalRub, 2400);
      assert.equal(result.items[0]?.subtotalRub, 2400);
    }
  });

  it("rejects insufficient stock without exposing stock count", async () => {
    const result = await verifyCartForOrder(
      [{ productId: "p1", quantity: 4 }],
      fakeDb([product]) as never
    );

    assert.deepEqual(result, { ok: false, reason: "INSUFFICIENT_STOCK" });
  });

  it("rejects unavailable or invalid products", async () => {
    assert.deepEqual(
      await verifyCartForOrder([{ productId: "missing", quantity: 1 }], fakeDb([]) as never),
      { ok: false, reason: "UNAVAILABLE_PRODUCT" }
    );

    assert.deepEqual(
      await verifyCartForOrder(
        [{ productId: "p1", quantity: 1 }],
        fakeDb([{ ...product, priceRub: 0 }]) as never
      ),
      { ok: false, reason: "INVALID_PRICE" }
    );
  });
});
