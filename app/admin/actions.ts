"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ORDER_STATUS, PRODUCT_STATUS, STOCK_ADJUSTMENT_MODE, VISIBILITY_STATUS } from "@/lib/constants";
import { computeAdjustedStockQuantity, type StockAdjustmentMode } from "@/lib/adminStock";
import { prisma } from "@/lib/db";
import { createSlugFallback, hasLength, isValidProductImageUrl, isValidSlug } from "@/lib/validation";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthConfigured,
  requireAdminSession,
  verifyAdminCredentials
} from "@/lib/adminAuth";
import { ru } from "@/lib/i18n/ru";
import type { FormActionState } from "@/types";

export type AdminActionState = FormActionState;

const PRODUCT_STATUSES = Object.values(PRODUCT_STATUS);
const VISIBILITY_STATUSES = Object.values(VISIBILITY_STATUS);
const ORDER_STATUSES = Object.values(ORDER_STATUS);
const SYSTEM_DRAFT_CATEGORY_SLUG = "system-drafts";

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function booleanValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function integerValue(value: FormDataEntryValue | null) {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function parseAllowed(value: string, allowed: readonly string[]) {
  return allowed.includes(value) ? value : null;
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
    return { error: ru.admin.login.notConfigured };
  }
  if (!username || !password) {
    return { error: ru.admin.login.missing };
  }

  const isValid = await verifyAdminCredentials(username, password);
  if (!isValid) {
    return { error: ru.admin.login.invalid };
  }

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
  const categoryId = text(formData.get("categoryId"));
  const subcategoryId = text(formData.get("subcategoryId"));
  const status = parseAllowed(text(formData.get("status")), PRODUCT_STATUSES);
  const priceRub = integerValue(formData.get("priceRub"));
  const stockQuantity = integerValue(formData.get("stockQuantity"));
  const displayOrder = integerValue(formData.get("displayOrder")) ?? 0;
  const isNew = booleanValue(formData.get("isNew"));

  if (!status) {
    return { error: "Le statut du produit est invalide." };
  }
  const requiresPublicFields = status === PRODUCT_STATUS.published;
  const canBeIncomplete = status === PRODUCT_STATUS.draft || status === PRODUCT_STATUS.hidden;
  if (priceRub != null && priceRub < 0) {
    return { error: "Le prix doit etre positif ou nul pour un brouillon ou produit masque." };
  }
  if (stockQuantity != null && stockQuantity < 0) {
    return { error: "Le stock doit etre un entier positif ou nul." };
  }
  if (requiresPublicFields && stockQuantity == null) {
    return { error: "Le stock doit etre renseigne avant publication." };
  }
  if (displayOrder < 0) {
    return { error: "L'ordre d'affichage doit etre positif ou nul." };
  }
  if (rawSlug && !isValidSlug(rawSlug)) {
    return { error: "Le slug doit contenir seulement des lettres latines minuscules, chiffres et tirets." };
  }
  if (rawName && !hasLength(rawName, 2, 120)) {
    return { error: "Le nom du produit doit contenir entre 2 et 120 caracteres." };
  }
  if (rawDescription && !hasLength(rawDescription, 10, 2000)) {
    return { error: "La description doit contenir entre 10 et 2000 caracteres." };
  }
  if (optionalTextIsTooLong(brand, 80)) {
    return { error: "La marque ne doit pas depasser 80 caracteres." };
  }
  if (imageUrl && !isValidProductImageUrl(imageUrl)) {
    return { error: "L'image doit etre une URL valide en http, https ou /uploads/." };
  }

  const name = rawName || (canBeIncomplete ? "Brouillon sans nom" : "");
  const slug = rawSlug || (canBeIncomplete ? createSlugFallback("draft-product") : "");
  const description = rawDescription || (canBeIncomplete ? "Brouillon en preparation." : "");
  const normalizedPriceRub = priceRub ?? 0;
  const normalizedStockQuantity = stockQuantity ?? 0;

  if (requiresPublicFields) {
    if (!categoryId || !subcategoryId) {
      return { error: "La categorie et la sous-categorie sont obligatoires avant publication." };
    }
    if (!hasLength(name, 2, 120) || !hasLength(description, 10, 2000) || !slug) {
      return { error: "Completez les informations obligatoires avant de publier le produit." };
    }
    if (normalizedPriceRub <= 0) {
      return { error: "Le prix doit etre un entier strictement positif." };
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
      return { error: "La categorie et la sous-categorie doivent etre visibles avant publication." };
    }
    const existing = productId
      ? await prisma.product.findUnique({
          where: { id: productId },
          include: { images: true, category: true, subcategory: true }
        })
      : null;

    if (productId && !existing) {
      return { error: "Le produit a modifier est introuvable." };
    }

    const hasValidImageAfterUpdate = imageUrl
      ? isValidProductImageUrl(imageUrl)
      : existing?.images.some((image) => isValidProductImageUrl(image.url)) ?? false;
    if (status === PRODUCT_STATUS.published && !hasValidImageAfterUpdate) {
      return { error: "Un produit publie doit avoir au moins une image." };
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

      if (imageUrl) {
        await tx.productImage.deleteMany({ where: { productId: product.id } });
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
      success: productId ? "Le produit a ete mis a jour." : "Le produit a ete cree."
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        return { error: "La categorie choisie est introuvable." };
      }
      if (error.message === "SUBCATEGORY_NOT_FOUND") {
        return { error: "La sous-categorie choisie est introuvable." };
      }
      if (error.message === "CATEGORY_MISMATCH") {
        return { error: "La sous-categorie n'appartient pas a cette categorie." };
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return { error: "Ce slug est deja utilise." };
      }
    }

    return { error: "Impossible d'enregistrer le produit." };
  }
}

export async function deleteProductAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const productId = text(formData.get("productId"));
  if (!productId) {
    return { error: "Produit manquant." };
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
    return { error: "Ce produit ne peut pas etre supprime car il apparait dans une commande." };
  }

  await prisma.product.delete({ where: { id: productId } });
  revalidatePath(`/admin/products/${productId}`);
  revalidatePublicSurface({
    slug: product.slug,
    categorySlug: product.category.slug,
    subcategorySlug: product.subcategory.slug
  });
  revalidateAdminSurface();

  return { success: "Le produit a ete supprime." };
}

export async function saveCategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const categoryId = text(formData.get("categoryId")) || null;
  const name = text(formData.get("name"));
  const slug = text(formData.get("slug"));
  const status = parseAllowed(text(formData.get("status")), VISIBILITY_STATUSES);
  const displayOrder = integerValue(formData.get("displayOrder")) ?? 0;

  if (!name || !slug) {
    return { error: "Le nom et le slug sont obligatoires." };
  }
  if (!hasLength(name, 2, 80)) {
    return { error: "Le nom de categorie doit contenir entre 2 et 80 caracteres." };
  }
  if (!isValidSlug(slug)) {
    return { error: "Le slug doit contenir seulement des lettres latines minuscules, chiffres et tirets." };
  }
  if (!status) {
    return { error: "Le statut de visibilite est invalide." };
  }
  if (displayOrder < 0) {
    return { error: "L'ordre d'affichage doit etre positif ou nul." };
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
      return { error: "La categorie a modifier est introuvable." };
    }

    const saved = categoryId
      ? await prisma.category.update({
          where: { id: categoryId },
          data: { name, slug, status, displayOrder }
        })
      : await prisma.category.create({
          data: { name, slug, status, displayOrder }
        });

    if (existing) {
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

    return { success: categoryId ? "La categorie a ete mise a jour." : "La categorie a ete creee." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Ce slug est deja utilise." };
    }
    return { error: "Impossible d'enregistrer la categorie." };
  }
}

export async function deleteCategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const categoryId = text(formData.get("categoryId"));
  if (!categoryId) {
    return { error: "Categorie manquante." };
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
    return { error: "La categorie est introuvable." };
  }

  const hasProducts = category.products.length > 0;
  const hasSubcategoryProducts = category.subcategories.some((subcategory) => subcategory.products.length > 0);
  if (hasProducts || hasSubcategoryProducts) {
    return { error: "La categorie ne peut pas etre supprimee tant qu'elle contient des produits." };
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

  return { success: "La categorie a ete supprimee." };
}

export async function saveSubcategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const subcategoryId = text(formData.get("subcategoryId")) || null;
  const categoryId = text(formData.get("categoryId"));
  const name = text(formData.get("name"));
  const slug = text(formData.get("slug"));
  const status = parseAllowed(text(formData.get("status")), VISIBILITY_STATUSES);
  const displayOrder = integerValue(formData.get("displayOrder")) ?? 0;

  if (!categoryId || !name || !slug) {
    return { error: "La categorie parente, le nom et le slug sont obligatoires." };
  }
  if (!hasLength(name, 2, 80)) {
    return { error: "Le nom de sous-categorie doit contenir entre 2 et 80 caracteres." };
  }
  if (!isValidSlug(slug)) {
    return { error: "Le slug doit contenir seulement des lettres latines minuscules, chiffres et tirets." };
  }
  if (!status) {
    return { error: "Le statut de visibilite est invalide." };
  }
  if (displayOrder < 0) {
    return { error: "L'ordre d'affichage doit etre positif ou nul." };
  }

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return { error: "La categorie parente est introuvable." };
  }

  const existing = subcategoryId
    ? await prisma.subcategory.findUnique({
        where: { id: subcategoryId },
        include: { category: true }
      })
    : null;
  if (subcategoryId && !existing) {
    return { error: "La sous-categorie a modifier est introuvable." };
  }

  try {
    const saved = existing
      ? await prisma.subcategory.update({
          where: { id: subcategoryId as string },
          data: { categoryId, name, slug, status, displayOrder }
        })
      : await prisma.subcategory.create({
          data: { categoryId, name, slug, status, displayOrder }
        });

    if (existing) {
      revalidatePath(`/subcategory/${existing.slug}`);
      revalidatePath(`/category/${existing.category.slug}`);
    }
    revalidatePublicSurface({
      slug: saved.slug,
      categorySlug: category.slug,
      subcategorySlug: saved.slug
    });
    revalidateAdminSurface();

    return { success: existing ? "La sous-categorie a ete mise a jour." : "La sous-categorie a ete creee." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Ce slug est deja utilise." };
    }
    return { error: "Impossible d'enregistrer la sous-categorie." };
  }
}

export async function deleteSubcategoryAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const subcategoryId = text(formData.get("subcategoryId"));
  if (!subcategoryId) {
    return { error: "Sous-categorie manquante." };
  }

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: subcategoryId },
    include: {
      category: true,
      products: { select: { id: true } }
    }
  });
  if (!subcategory) {
    return { error: "La sous-categorie est introuvable." };
  }
  if (subcategory.products.length > 0) {
    return { error: "La sous-categorie ne peut pas etre supprimee tant qu'elle contient des produits." };
  }

  await prisma.subcategory.delete({ where: { id: subcategoryId } });
  revalidatePath(`/subcategory/${subcategory.slug}`);
  revalidatePublicSurface({
    slug: subcategory.slug,
    categorySlug: subcategory.category.slug,
    subcategorySlug: subcategory.slug
  });
  revalidateAdminSurface();

  return { success: "La sous-categorie a ete supprimee." };
}

export async function adjustStockAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdminSession();

  const productId = text(formData.get("productId"));
  const stockQuantity = integerValue(formData.get("stockQuantity"));
  const mode = parseAllowed(text(formData.get("mode")), Object.values(STOCK_ADJUSTMENT_MODE));
  if (!productId) {
    return { error: "Товар не указан." };
  }
  if (stockQuantity == null || stockQuantity < 0) {
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
    return { error: "Le produit est introuvable." };
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
  const status = parseAllowed(text(formData.get("status")), ORDER_STATUSES);
  const adminNote = text(formData.get("adminNote")) || null;

  if (!orderId) {
    return { error: "Commande manquante." };
  }
  if (!status) {
    return { error: "Le statut de commande est invalide." };
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return { error: "La commande est introuvable." };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      adminNote
    }
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidateAdminSurface();

  return { success: "La commande a ete mise a jour." };
}
