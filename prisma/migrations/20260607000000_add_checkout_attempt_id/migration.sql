-- Add checkout attempt id for idempotent order creation.
ALTER TABLE "Order" ADD COLUMN "checkoutAttemptId" TEXT;

CREATE UNIQUE INDEX "Order_checkoutAttemptId_key" ON "Order"("checkoutAttemptId");
