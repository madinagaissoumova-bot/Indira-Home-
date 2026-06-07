import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { createOrder } from "@/app/checkout/actions";
import { PAYMENT_METHOD, PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";

const suffix = Date.now().toString(36);
let productIndex = 0;
let createdOrderNumber: string | undefined;
let createdIdempotentOrderNumber: string | undefined;
const createdProductSlugs: string[] = [];
const createdSubcategorySlugs: string[] = [];
const createdCategorySlugs: string[] = [];
const hasPostgresDatabase =
  process.env.DATABASE_URL?.startsWith("postgresql://") || process.env.DATABASE_URL?.startsWith("postgres://");
const shouldRunDbIntegration = hasPostgresDatabase && process.env.RUN_DB_INTEGRATION === "1";

function orderForm(productId: string, expectedTotalRub: number, checkoutAttemptId = `checkout-attempt-${suffix}`) {
  const formData = new FormData();

  formData.set("cart", JSON.stringify([{ productId, quantity: 1 }]));
  formData.set("expectedTotalRub", String(expectedTotalRub));
  formData.set("customerFirstName", "Амина");
  formData.set("customerLastName", "Исаева");
  formData.set("customerPhone", "+7 988 906-41-06");
  formData.set("deliveryAddressOrZone", "Грозный, ул. Ленина, дом 1");
  formData.set("paymentMethod", PAYMENT_METHOD.cashOnDelivery);
  formData.set("checkoutAttemptId", checkoutAttemptId);

  return formData;
}

async function createPublishedProduct() {
  productIndex += 1;
  const categorySlug = `qa-cat-${suffix}-${productIndex}`;
  const subcategorySlug = `qa-sub-${suffix}-${productIndex}`;
  const productSlug = `qa-product-${suffix}-${productIndex}`;
  createdCategorySlugs.push(categorySlug);
  createdSubcategorySlugs.push(subcategorySlug);
  createdProductSlugs.push(productSlug);

  const category = await prisma.category.create({
    data: {
      name: "QA Category",
      slug: categorySlug,
      status: VISIBILITY_STATUS.visible
    }
  });
  const subcategory = await prisma.subcategory.create({
    data: {
      name: "QA Subcategory",
      slug: subcategorySlug,
      categoryId: category.id,
      status: VISIBILITY_STATUS.visible
    }
  });

  return prisma.product.create({
    data: {
      name: "QA Товар",
      slug: productSlug,
      description: "Тестовый товар для проверки заказа",
      priceRub: 1000,
      stockQuantity: 2,
      status: PRODUCT_STATUS.published,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      images: {
        create: {
          url: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
          alt: "QA Товар",
          displayOrder: 0
        }
      }
    }
  });
}

describe("checkout integration", { skip: !shouldRunDbIntegration }, () => {
  after(async () => {
    if (createdOrderNumber) {
      await prisma.order.deleteMany({ where: { orderNumber: createdOrderNumber } });
    }
    if (createdIdempotentOrderNumber) {
      await prisma.order.deleteMany({ where: { orderNumber: createdIdempotentOrderNumber } });
    }

    await prisma.product.deleteMany({ where: { slug: { in: createdProductSlugs } } });
    await prisma.subcategory.deleteMany({ where: { slug: { in: createdSubcategorySlugs } } });
    await prisma.category.deleteMany({ where: { slug: { in: createdCategorySlugs } } });
    await prisma.$disconnect();
  });

  it("requires review on changed total, then creates order and decrements stock", async () => {
    const product = await createPublishedProduct();

    const review = await createOrder({}, orderForm(product.id, 900));
    assert.equal(review.orderNumber, undefined);
    assert.equal(review.review?.totalRub, 1000);

    const created = await createOrder({}, orderForm(product.id, 1000));
    assert.ok(created.orderNumber);
    assert.equal(created.totalRub, 1000);
    createdOrderNumber = created.orderNumber;

    const reloadedProduct = await prisma.product.findUniqueOrThrow({
      where: { id: product.id }
    });
    assert.equal(reloadedProduct.stockQuantity, 1);
  });

  it("returns the existing order for the same checkout attempt without decrementing stock twice", async () => {
    const product = await createPublishedProduct();
    const attemptId = `checkout-attempt-repeat-${suffix}`;

    const first = await createOrder({}, orderForm(product.id, 1000, attemptId));
    assert.ok(first.orderNumber);
    assert.equal(first.totalRub, 1000);
    createdIdempotentOrderNumber = first.orderNumber;

    const second = await createOrder({}, orderForm(product.id, 1000, attemptId));
    assert.equal(second.orderNumber, first.orderNumber);
    assert.equal(second.totalRub, first.totalRub);

    const orderCount = await prisma.order.count({
      where: { checkoutAttemptId: attemptId }
    });
    assert.equal(orderCount, 1);

    const reloadedProduct = await prisma.product.findUniqueOrThrow({
      where: { id: product.id }
    });
    assert.equal(reloadedProduct.stockQuantity, 1);
  });
});
