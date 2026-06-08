import { ORDER_STATUS } from "@/lib/constants";

export function shouldRestoreStockOnOrderStatusChange(previousStatus: string, nextStatus: string) {
  return previousStatus !== ORDER_STATUS.cancelled && nextStatus === ORDER_STATUS.cancelled;
}
