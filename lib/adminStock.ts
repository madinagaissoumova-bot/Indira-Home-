import { STOCK_ADJUSTMENT_MODE } from "@/lib/constants";

export type StockAdjustmentMode = (typeof STOCK_ADJUSTMENT_MODE)[keyof typeof STOCK_ADJUSTMENT_MODE];

export function computeAdjustedStockQuantity(currentStock: number, mode: StockAdjustmentMode, amount: number) {
  if (mode === STOCK_ADJUSTMENT_MODE.add) {
    return currentStock + amount;
  }
  if (mode === STOCK_ADJUSTMENT_MODE.remove) {
    return currentStock - amount;
  }
  return amount;
}

