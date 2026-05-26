import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { STOCK_ADJUSTMENT_MODE } from "@/lib/constants";
import { computeAdjustedStockQuantity } from "@/lib/adminStock";

describe("computeAdjustedStockQuantity", () => {
  it("adds, removes and replaces stock with explicit modes", () => {
    assert.equal(computeAdjustedStockQuantity(10, STOCK_ADJUSTMENT_MODE.add, 5), 15);
    assert.equal(computeAdjustedStockQuantity(10, STOCK_ADJUSTMENT_MODE.remove, 3), 7);
    assert.equal(computeAdjustedStockQuantity(10, STOCK_ADJUSTMENT_MODE.set, 4), 4);
  });
});

