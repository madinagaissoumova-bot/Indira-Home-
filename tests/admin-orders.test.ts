import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { shouldRestoreStockOnOrderStatusChange } from "@/lib/adminOrders";
import { ORDER_STATUS } from "@/lib/constants";

describe("admin order stock restoration", () => {
  it("restores stock only when an order first becomes cancelled", () => {
    assert.equal(
      shouldRestoreStockOnOrderStatusChange(ORDER_STATUS.new, ORDER_STATUS.cancelled),
      true
    );
    assert.equal(
      shouldRestoreStockOnOrderStatusChange(ORDER_STATUS.preparing, ORDER_STATUS.cancelled),
      true
    );
    assert.equal(
      shouldRestoreStockOnOrderStatusChange(ORDER_STATUS.cancelled, ORDER_STATUS.cancelled),
      false
    );
    assert.equal(
      shouldRestoreStockOnOrderStatusChange(ORDER_STATUS.cancelled, ORDER_STATUS.confirmed),
      false
    );
    assert.equal(
      shouldRestoreStockOnOrderStatusChange(ORDER_STATUS.confirmed, ORDER_STATUS.delivered),
      false
    );
  });
});
