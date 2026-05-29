import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ORDER_STATUS, PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import {
  getAdminOrderStatusLabel,
  getAdminProductStatusLabel,
  getAdminVisibilityStatusLabel
} from "@/lib/adminLabels";

describe("admin labels", () => {
  it("renders order statuses as Russian admin labels", () => {
    assert.equal(getAdminOrderStatusLabel(ORDER_STATUS.new), "Новый");
    assert.equal(getAdminOrderStatusLabel(ORDER_STATUS.toConfirm), "Нужно подтвердить");
    assert.equal(getAdminOrderStatusLabel(ORDER_STATUS.delivered), "Доставлен");
  });

  it("renders product statuses as Russian admin labels", () => {
    assert.equal(getAdminProductStatusLabel(PRODUCT_STATUS.draft), "Черновик");
    assert.equal(getAdminProductStatusLabel(PRODUCT_STATUS.published), "Опубликован");
    assert.equal(getAdminProductStatusLabel(PRODUCT_STATUS.hidden), "Скрыт");
  });

  it("renders taxonomy visibility statuses as Russian admin labels", () => {
    assert.equal(getAdminVisibilityStatusLabel(VISIBILITY_STATUS.visible), "Видимый");
    assert.equal(getAdminVisibilityStatusLabel(VISIBILITY_STATUS.hidden), "Скрытый");
  });

  it("keeps unknown values visible for diagnostics", () => {
    assert.equal(getAdminOrderStatusLabel("UNKNOWN"), "UNKNOWN");
    assert.equal(getAdminProductStatusLabel("UNKNOWN"), "UNKNOWN");
    assert.equal(getAdminVisibilityStatusLabel("UNKNOWN"), "UNKNOWN");
  });
});
