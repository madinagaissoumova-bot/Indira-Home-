import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { createOrder } from "@/app/checkout/actions";
import { PAYMENT_METHOD, PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";

const suffix = Date.now().toString(36);
const categorySlug = `qa-cat-${suffix}`;
const subcategorySlug = `qa-sub-${suffix}`;
const productSlug = `qa-product-${suffix}`;
let createdOrderNumber: string | undefined;

function orderForm(productId: string, expectedTotalRub: number) {
  const formData = new FormData();

  formData.set("cart", JSON.stringify([{ productId, quantity: 1 }]));
  formData.set("expectedTotalRub", String(expectedTotalRub));
  formData.set("customerFirstName", "Амина");
  formData.set("customerLastName", "Исаева");
  formData.set("customerPhone", "+7 988 906-41-06");
  formData.set("deliveryAddressOrZone", "Грозный, ул. Ленина, дом 1");
  formData.set("paymentMethod", PAYMENT_METHOD.cashOnDelivery);

  return formData;
}

async function createPublishedProduct() {
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

describe("checkout integration", () => {
  after(async () => {
    if (createdOrderNumber) {
      await prisma.order.deleteMany({ where: { orderNumber: createdOrderNumber } });
    }

    await prisma.product.deleteMany({ where: { slug: productSlug } });
    await prisma.subcategory.deleteMany({ where: { slug: subcategorySlug } });
    await prisma.category.deleteMany({ where: { slug: categorySlug } });
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
});
