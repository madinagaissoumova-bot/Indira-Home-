"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ORDER_STATUS, PRODUCT_STATUS, STOCK_ADJUSTMENT_MODE, VISIBILITY_STATUS } from "@/lib/constants";
import { shouldRestoreStockOnOrderStatusChange } from "@/lib/adminOrders";
import { computeAdjustedStockQuantity, type StockAdjustmentMode } from "@/lib/adminStock";
import { prisma } from "@/lib/db";
import {
  createSlugFromText,
  createSlugFallback,
  hasLength,
  isNonNegativeInteger,
  isPositiveInteger,
  isValidProductImageUrl,
  isValidSlug,
  parseAllowedValue,
  parseInteger,
  parseOrderStatus,
  parseProductStatus,
  parseVisibilityStatus
} from "@/lib/validation";
import {
  clearAdminSession,
  createAdminSession,
  getMissingAdminAuthEnvVars,
  isAdminAuthConfigured,
  requireAdminSession,
  verifyAdminCredentials
} from "@/lib/adminAuth";
import {
  clearAdminLoginRateLimit,
  getAdminLoginRateLimitState,
  recordFailedAdminLogin
} from "@/lib/adminLoginRateLimit";
import { ru } from "@/lib/i18n/ru";
import type { FormActionState } from "@/types";

export type AdminActionState = FormActionState;

const SYSTEM_DRAFT_CATEGORY_SLUG = "system-drafts";

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function booleanValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function optionalTextIsTooLong(value: string | null, max: number) {
  return Boolean(value && value.length > max);
}

function revalidatePublicSurface(product?: { slug: string; categorySlug: string; subcategorySlug: string }) {
  revalidatePath("/");
  revalidatePath("/search");
  if (product) {
    revalidatePath(`/product/${product.slug}`);
    revalidatePath(`/category/${product.categorySlug}`);
    revalidatePath(`/subcategory/${product.subcategorySlug}`);
  }
}

function revalidateAdminSurface() {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/stock");
  revalidatePath("/admin/orders");
}

async function getCategoryAndSubcategory(categoryId: string, subcategoryId: string) {
  const [category, subcategory] = await Promise.all([
    prisma.category.findUnique({ where: { id: categoryId } }),
    prisma.subcategory.findUnique({ where: { id: subcategoryId } })
  ]);

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
  if (!subcategory) {
    throw new Error("SUBCATEGORY_NOT_FOUND");
  }
  if (subcategory.categoryId !== category.id) {
    throw new Error("CATEGORY_MISMATCH");
  }

  return { category, subcategory };
}

async function getDraftCategoryAndSubcategory() {
  const category = await prisma.category.upsert({
    where: { slug: SYSTEM_DRAFT_CATEGORY_SLUG },
    update: { status: VISIBILITY_STATUS.hidden },
    create: {
      name: "Черновики",
      slug: SYSTEM_DRAFT_CATEGORY_SLUG,
      status: VISIBILITY_STATUS.hidden,
      displayOrder: 9999
    }
  });

  const subcategory = await prisma.subcategory.upsert({
    where: { slug: SYSTEM_DRAFT_CATEGORY_SLUG },
    update: {
      categoryId: category.id,
      status: VISIBILITY_STATUS.hidden
    },
    create: {
      categoryId: category.id,
      name: "Черновики",
      slug: SYSTEM_DRAFT_CATEGORY_SLUG,
      status: VISIBILITY_STATUS.hidden,
      displayOrder: 9999
    }
  });

  return { category, subcategory };
}

export async function loginAdmin(_previousState: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const username = text(formData.get("username"));
  const password = String(formData.get("password") ?? "");

  if (!isAdminAuthConfigured()) {
    const missingEnvVars = getMissingAdminAuthEnvVars();
    return {
      error: `${ru.admin.login.notConfigured} Не найдены: ${missingEnvVars.join(", ")}.`
    };
  }
  if (!username || !password) {
    return { error: ru.admin.login.missing };
  }

  const rateLimit = getAdminLoginRateLimitState(username);
  if (rateLimit.isLimited) {
    return { error: ru.admin.login.invalid };
  }

  const isValid = await verifyAdminCredentials(username, password);
  if (!isValid) {
    recordFailedAdminLogin(username);
    return { error: ru.admin.login.invalid };
  }

  clearAdminLoginRateLimit(username);
  await createAdminSession(username);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveProductAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const productId = text(formData.get("productId")) || null;
  const rawName = text(formData.get("name"));
  const rawSlug = text(formData.get("slug"));
  const rawDescription = text(formData.get("description"));
  const brand = text(formData.get("brand")) || null;
  const characteristics = text(formData.get("characteristics")) || null;
  const imageUrl = text(formData.get("imageUrl")) || null;
  const imageAlt = text(formData.get("imageAlt")) || rawName || "Indira Home";
  const removeImage = booleanValue(formData.get("removeImage"));
  const categoryId = text(formData.get("categoryId"));
  const subcategoryId = text(formData.get("subcategoryId"));
  const status = parseProductStatus(text(formData.get("status")));
  const priceRub = parseInteger(formData.get("priceRub"));
  const stockQuantity = parseInteger(formData.get("stockQuantity"));
  const displayOrder = parseInteger(formData.get("displayOrder")) ?? 0;
  const isNew = booleanValue(formData.get("isNew"));

  if (!status) {
    return { error: "Некорректный статус товара." };
  }
  const requiresPublicFields = status === PRODUCT_STATUS.published;
  const canBeIncomplete = status === PRODUCT_STATUS.draft || status === PRODUCT_STATUS.hidden;
  if (priceRub != null && !isNonNegativeInteger(priceRub)) {
    return { error: "Цена должна быть положительным числом или нулем." };
  }
  if (stockQuantity != null && !isNonNegativeInteger(stockQuantity)) {
    return { error: "Остаток должен быть целым числом не меньше нуля." };
  }
  if (requiresPublicFields && stockQuantity == null) {
    return { error: "Перед публикацией нужно указать остаток." };
  }
  if (displayOrder < 0) {
    return { error: "Порядок отображения должен быть не меньше нуля." };
  }
  if (rawSlug && !isValidSlug(rawSlug)) {
    return { error: "Slug должен содержать только латинские строчные буквы, цифры и дефисы." };
  }
  if (rawName && !hasLength(rawName, 2, 120)) {
    return { error: "Название товара должно содержать от 2 до 120 символов." };
  }
  if (rawDescription && !hasLength(rawDescription, 10, 2000)) {
    return { error: "Описание должно содержать от 10 до 2000 символов." };
  }
  if (optionalTextIsTooLong(brand, 80)) {
    return { error: "Бренд не должен быть длиннее 80 символов." };
  }
  if (imageUrl && !isValidProductImageUrl(imageUrl)) {
    return { error: "Изображение должно быть корректной ссылкой http, https или /uploads/." };
  }

  const name = rawName || (canBeIncomplete ? "Черновик без названия" : "");
  const slug = rawSlug || (canBeIncomplete ? createSlugFallback("draft-product") : "");
  const description = rawDescription || (canBeIncomplete ? "Черновик в подготовке." : "");
  const normalizedPriceRub = priceRub ?? 0;
  const normalizedStockQuantity = stockQuantity ?? 0;

  if (requiresPublicFields) {
    if (!categoryId || !subcategoryId) {
      return { error: "Перед публикацией нужно выбрать категорию и подкатегорию." };
    }
    if (!hasLength(name, 2, 120) || !hasLength(description, 10, 2000) || !slug) {
      return { error: "Заполните обязательные данные перед публикацией товара." };
    }
    if (!isPositiveInteger(normalizedPriceRub)) {
      return { error: "Цена должна быть целым числом больше нуля." };
    }
  }

  try {
    const categorySelection = categoryId && subcategoryId
      ? await getCategoryAndSubcategory(categoryId, subcategoryId)
      : await getDraftCategoryAndSubcategory();
    if (
      requiresPublicFields &&
      (categorySelection.category.status !== VISIBILITY_STATUS.visible ||
        categorySelection.subcategory.status !== VISIBILITY_STATUS.visible)
    ) {
      return { error: "Категория и подкатегория должны быть видимыми перед публикацией." };
    }
    const existing = productId
      ? await prisma.product.findUnique({
          where: { id: productId },
          include: { images: true, category: true, subcategory: true }
        })
      : null;

    if (productId && !existing) {
      return { error: "Товар для изменения не найден." };
    }

    const hasValidImageAfterUpdate = imageUrl
      ? isValidProductImageUrl(imageUrl)
      : removeImage
        ? false
        : existing?.images.some((image) => isValidProductImageUrl(image.url)) ?? false;
    if (status === PRODUCT_STATUS.published && !hasValidImageAfterUpdate) {
      return { error: "У опубликованного товара должно быть хотя бы одно изображение." };
    }

    const finalProduct = await prisma.$transaction(async (tx) => {
      const product = productId
        ? await tx.product.update({
            where: { id: productId },
            data: {
              name,
              slug,
              description,
              priceRub: normalizedPriceRub,
              categoryId: categorySelection.category.id,
              subcategoryId: categorySelection.subcategory.id,
              stockQuantity: normalizedStockQuantity,
              status,
              isNew,
              brand,
              characteristics,
              displayOrder
            }
          })
        : await tx.product.create({
            data: {
              name,
              slug,
              description,
              priceRub: normalizedPriceRub,
              categoryId: categorySelection.category.id,
              subcategoryId: categorySelection.subcategory.id,
              stockQuantity: normalizedStockQuantity,
              status,
              isNew,
              brand,
              characteristics,
              displayOrder
            }
          });

      if (imageUrl || removeImage) {
        await tx.productImage.deleteMany({ where: { productId: product.id } });
      }

      if (imageUrl) {
        await tx.productImage.create({
          data: {
            productId: product.id,
            url: imageUrl,
            alt: imageAlt,
            displayOrder: 0
          }
        });
      }

      return tx.product.findUniqueOrThrow({
        where: { id: product.id },
        include: {
          category: true,
          subcategory: true
        }
      });
    });

    if (existing) {
      revalidatePath(`/product/${existing.slug}`);
      revalidatePath(`/category/${existing.category.slug}`);
      revalidatePath(`/subcategory/${existing.subcategory.slug}`);
      revalidatePath(`/admin/products/${existing.id}`);
    }
    revalidatePublicSurface({
      slug: finalProduct.slug,
      categorySlug: finalProduct.category.slug,
      subcategorySlug: finalProduct.subcategory.slug
    });
    revalidatePath(`/admin/products/${finalProduct.id}`);
    revalidateAdminSurface();

    return {
      success: productId ? "Товар обновлен." : "Товар создан."
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        return { error: "Выбранная категория не найдена." };
      }
      if (error.message === "SUBCATEGORY_NOT_FOUND") {
        return { error: "Выбранная подкатегория не найдена." };
      }
      if (error.message === "CATEGORY_MISMATCH") {
        return { error: "Подкатегория не относится к выбранной категории." };
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return { error: "Этот slug уже используется." };
      }
    }

    return { error: "Не удалось сохранить товар." };
  }
}

export async function deleteProductAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const productId = text(formData.get("productId"));
  if (!productId) {
    return { error: "Товар не указан." };
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true, subcategory: true }
  });
  if (!product) {
    return { error: "Товар не найден." };
  }

  const orderedCount = await prisma.orderItem.count({
    where: { productId }
  });
  if (orderedCount > 0) {
    return { error: "Этот товар нельзя удалить, потому что он есть в заказе." };
  }

  await prisma.product.delete({ where: { id: productId } });
  revalidatePath(`/admin/products/${productId}`);
  revalidatePublicSurface({
    slug: product.slug,
    categorySlug: product.category.slug,
    subcategorySlug: product.subcategory.slug
  });
  revalidateAdminSurface();

  return { success: "Товар удален." };
}

export async function saveCategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const categoryId = text(formData.get("categoryId")) || null;
  const name = text(formData.get("name"));
  const status = parseVisibilityStatus(text(formData.get("status")));
  const displayOrder = parseInteger(formData.get("displayOrder")) ?? 0;
  const slug = createSlugFromText(name, "category");

  if (!name) {
    return { error: "Название категории обязательно." };
  }
  if (!hasLength(name, 2, 80)) {
    return { error: "Название категории должно содержать от 2 до 80 символов." };
  }
  if (!status) {
    return { error: "Некорректный статус видимости." };
  }
  if (displayOrder < 0) {
    return { error: "Порядок отображения должен быть не меньше нуля." };
  }

  try {
    const existing = categoryId
      ? await prisma.category.findUnique({
          where: { id: categoryId },
          include: {
            subcategories: true
          }
        })
      : null;

    if (categoryId && !existing) {
      return { error: "Категория для изменения не найдена." };
    }

    const previousSlug = existing?.slug;
    const saved = categoryId
      ? await prisma.category.update({
          where: { id: categoryId },
          data: { name, slug, status, displayOrder }
        })
      : await prisma.category.create({
          data: { name, slug, status, displayOrder }
        });

    if (existing) {
      if (previousSlug && previousSlug !== saved.slug) {
        revalidatePath(`/category/${previousSlug}`);
      }
      revalidatePath(`/category/${existing.slug}`);
      for (const subcategory of existing.subcategories) {
        revalidatePath(`/subcategory/${subcategory.slug}`);
      }
      revalidatePublicSurface({
        slug: saved.slug,
        categorySlug: saved.slug,
        subcategorySlug: existing.subcategories[0]?.slug ?? saved.slug
      });
    } else {
      revalidatePublicSurface({
        slug: saved.slug,
        categorySlug: saved.slug,
        subcategorySlug: saved.slug
      });
    }
    revalidateAdminSurface();

    return { success: categoryId ? "Категория обновлена." : "Категория создана." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Этот slug уже используется." };
    }
    return { error: "Не удалось сохранить категорию." };
  }
}

export async function deleteCategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const categoryId = text(formData.get("categoryId"));
  if (!categoryId) {
    return { error: "Категория не указана." };
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      subcategories: {
        include: {
          products: { select: { id: true } }
        }
      },
      products: { select: { id: true } }
    }
  });

  if (!category) {
    return { error: "Категория не найдена." };
  }

  const hasProducts = category.products.length > 0;
  const hasSubcategoryProducts = category.subcategories.some((subcategory) => subcategory.products.length > 0);
  if (hasProducts || hasSubcategoryProducts) {
    return { error: "Категорию нельзя удалить, пока в ней есть товары." };
  }

  await prisma.$transaction(async (tx) => {
    await tx.subcategory.deleteMany({ where: { categoryId } });
    await tx.category.delete({ where: { id: categoryId } });
  });

  revalidatePath(`/category/${category.slug}`);
  for (const subcategory of category.subcategories) {
    revalidatePath(`/subcategory/${subcategory.slug}`);
  }
  revalidatePublicSurface({
    slug: category.slug,
    categorySlug: category.slug,
    subcategorySlug: category.subcategories[0]?.slug ?? category.slug
  });
  revalidateAdminSurface();

  return { success: "Категория удалена." };
}

export async function saveSubcategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const subcategoryId = text(formData.get("subcategoryId")) || null;
  const categoryId = text(formData.get("categoryId"));
  const name = text(formData.get("name"));
  const status = parseVisibilityStatus(text(formData.get("status")));
  const displayOrder = parseInteger(formData.get("displayOrder")) ?? 0;
  const slug = createSlugFromText(name, "subcategory");

  if (!categoryId || !name) {
    return { error: "Родительская категория и название обязательны." };
  }
  if (!hasLength(name, 2, 80)) {
    return { error: "Название подкатегории должно содержать от 2 до 80 символов." };
  }
  if (!status) {
    return { error: "Некорректный статус видимости." };
  }
  if (displayOrder < 0) {
    return { error: "Порядок отображения должен быть не меньше нуля." };
  }

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return { error: "Родительская категория не найдена." };
  }

  const existing = subcategoryId
    ? await prisma.subcategory.findUnique({
        where: { id: subcategoryId },
        include: { category: true }
      })
    : null;
  if (subcategoryId && !existing) {
    return { error: "Подкатегория для изменения не найдена." };
  }

  try {
    const previousSlug = existing?.slug;
    const saved = existing
      ? await prisma.subcategory.update({
          where: { id: subcategoryId as string },
          data: { categoryId, name, slug, status, displayOrder }
        })
      : await prisma.subcategory.create({
          data: { categoryId, name, slug, status, displayOrder }
        });

    if (existing) {
      if (previousSlug && previousSlug !== saved.slug) {
        revalidatePath(`/subcategory/${previousSlug}`);
      }
      revalidatePath(`/subcategory/${existing.slug}`);
      revalidatePath(`/category/${existing.category.slug}`);
    }
    revalidatePublicSurface({
      slug: saved.slug,
      categorySlug: category.slug,
      subcategorySlug: saved.slug
    });
    revalidateAdminSurface();

    return { success: existing ? "Подкатегория обновлена." : "Подкатегория создана." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Этот slug уже используется." };
    }
    return { error: "Не удалось сохранить подкатегорию." };
  }
}

export async function deleteSubcategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const subcategoryId = text(formData.get("subcategoryId"));
  if (!subcategoryId) {
    return { error: "Подкатегория не указана." };
  }

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: subcategoryId },
    include: {
      category: true,
      products: { select: { id: true } }
    }
  });
  if (!subcategory) {
    return { error: "Подкатегория не найдена." };
  }
  if (subcategory.products.length > 0) {
    return { error: "Подкатегорию нельзя удалить, пока в ней есть товары." };
  }

  await prisma.subcategory.delete({ where: { id: subcategoryId } });
  revalidatePath(`/subcategory/${subcategory.slug}`);
  revalidatePublicSurface({
    slug: subcategory.slug,
    categorySlug: subcategory.category.slug,
    subcategorySlug: subcategory.slug
  });
  revalidateAdminSurface();

  return { success: "Подкатегория удалена." };
}

export async function adjustStockAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const productId = text(formData.get("productId"));
  const stockQuantity = parseInteger(formData.get("stockQuantity"));
  const mode = parseAllowedValue(text(formData.get("mode")), Object.values(STOCK_ADJUSTMENT_MODE));
  if (!productId) {
    return { error: "Товар не указан." };
  }
  if (!isNonNegativeInteger(stockQuantity)) {
    return { error: "Количество должно быть целым числом не ниже нуля." };
  }
  if (!mode) {
    return { error: "Неверный тип изменения склада." };
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
      subcategory: true
    }
  });
  if (!product) {
    return { error: "Товар не найден." };
  }

  const nextStockQuantity = computeAdjustedStockQuantity(
    product.stockQuantity,
    mode as StockAdjustmentMode,
    stockQuantity
  );
  if (nextStockQuantity < 0) {
    return { error: "Количество для списания больше текущего остатка." };
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      stockQuantity: nextStockQuantity
    }
  });

  revalidatePath(`/admin/products/${productId}`);
  revalidatePublicSurface({
    slug: product.slug,
    categorySlug: product.category.slug,
    subcategorySlug: product.subcategory.slug
  });
  revalidateAdminSurface();

  if (mode === STOCK_ADJUSTMENT_MODE.add) {
    return { success: "Остаток увеличен." };
  }
  if (mode === STOCK_ADJUSTMENT_MODE.remove) {
    return { success: "Остаток уменьшен." };
  }
  return { success: "Остаток исправлен." };
}

export async function updateOrderAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const orderId = text(formData.get("orderId"));
  const intent = text(formData.get("intent"));
  const requestedStatus = parseOrderStatus(text(formData.get("status")));
  const status = intent === "cancelOrder" ? ORDER_STATUS.cancelled : requestedStatus;
  const adminNote = text(formData.get("adminNote")) || null;

  if (!orderId) {
    return { error: "Заказ не указан." };
  }
  if (!status) {
    return { error: "Некорректный статус заказа." };
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        select: {
          productId: true,
          quantity: true
        }
      }
    }
  });
  if (!order) {
    return { error: "Заказ не найден." };
  }

  const shouldRestoreStock = shouldRestoreStockOnOrderStatusChange(order.status, status);

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: {
        status,
        adminNote
      }
    });

    if (shouldRestoreStock) {
      for (const item of order.items) {
        if (!item.productId) continue;
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              increment: item.quantity
            }
          }
        });
      }
    }
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidateAdminSurface();

  return { success: "Заказ обновлен." };
}
