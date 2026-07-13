import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";

export type FallbackCategory = {
  id: string;
  name: string;
  slug: string;
  status: string;
  displayOrder: number;
  subcategories: FallbackSubcategory[];
};

export type FallbackSubcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  status: string;
  displayOrder: number;
  category?: FallbackCategory;
};

export type FallbackProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceRub: number;
  categoryId: string;
  subcategoryId: string;
  stockQuantity: number;
  status: string;
  isNew: boolean;
  brand: string | null;
  characteristics: string | null;
  displayOrder: number;
  category: Pick<FallbackCategory, "id" | "name" | "slug" | "status" | "displayOrder">;
  subcategory: Pick<FallbackSubcategory, "id" | "categoryId" | "name" | "slug" | "status" | "displayOrder">;
  images: { id: string; url: string; alt: string; displayOrder: number }[];
};

const categorySeed = [
  {
    id: "fallback-posuda",
    name: "Посуда",
    slug: "posuda",
    subcategories: [
      ["Сервизы", "servizy"],
      ["Салатники", "salatniki"],
      ["Блюда", "blyuda"],
      ["Стаканы", "stakany"],
      ["Чашки", "chashki"]
    ]
  },
  {
    id: "fallback-kuhnya",
    name: "Кухня",
    slug: "kuhnya",
    subcategories: [
      ["Кастрюли", "kastryuli"],
      ["Сковороды", "skovorody"],
      ["Мантоварки", "mantovarki"],
      ["Кухонные аксессуары", "kuhonnye-aksessuary"]
    ]
  },
  {
    id: "fallback-bytovaya-tehnika",
    name: "Бытовая техника",
    slug: "bytovaya-tehnika",
    subcategories: [
      ["Чайники", "chainiki"],
      ["Блендеры", "blendery"],
      ["Пылесосы", "pylesosy"],
      ["Отпариватели", "otparivateli"]
    ]
  },
  {
    id: "fallback-dekor",
    name: "Декор",
    slug: "dekor",
    subcategories: [
      ["Вазы", "vazy"],
      ["Декор стола", "dekor-stola"]
    ]
  }
];

export const fallbackCategories: FallbackCategory[] = categorySeed.map((category, categoryIndex) => {
  const savedCategory: FallbackCategory = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    status: VISIBILITY_STATUS.visible,
    displayOrder: categoryIndex,
    subcategories: []
  };

  savedCategory.subcategories = category.subcategories.map(([name, slug], subcategoryIndex) => ({
    id: `fallback-${slug}`,
    categoryId: savedCategory.id,
    name,
    slug,
    status: VISIBILITY_STATUS.visible,
    displayOrder: subcategoryIndex,
    category: savedCategory
  }));

  return savedCategory;
});

function categoryRef(slug: string) {
  const category = fallbackCategories.find((item) => item.slug === slug);
  if (!category) throw new Error(`Missing fallback category: ${slug}`);

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    status: category.status,
    displayOrder: category.displayOrder
  };
}

function subcategoryRef(slug: string) {
  const subcategory = fallbackCategories.flatMap((category) => category.subcategories).find((item) => item.slug === slug);
  if (!subcategory) throw new Error(`Missing fallback subcategory: ${slug}`);

  return {
    id: subcategory.id,
    categoryId: subcategory.categoryId,
    name: subcategory.name,
    slug: subcategory.slug,
    status: subcategory.status,
    displayOrder: subcategory.displayOrder
  };
}

function product(input: {
  slug: string;
  name: string;
  description: string;
  priceRub: number;
  stockQuantity: number;
  isNew?: boolean;
  brand?: string | null;
  characteristics?: string | null;
  imageUrl: string;
  imageAlt: string;
  categorySlug: string;
  subcategorySlug: string;
}): FallbackProduct {
  const category = categoryRef(input.categorySlug);
  const subcategory = subcategoryRef(input.subcategorySlug);

  return {
    id: `fallback-${input.slug}`,
    name: input.name,
    slug: input.slug,
    description: input.description,
    priceRub: input.priceRub,
    categoryId: category.id,
    subcategoryId: subcategory.id,
    stockQuantity: input.stockQuantity,
    status: PRODUCT_STATUS.published,
    isNew: input.isNew ?? true,
    brand: input.brand ?? null,
    characteristics: input.characteristics ?? null,
    displayOrder: 0,
    category,
    subcategory,
    images: [
      {
        id: `fallback-image-${input.slug}`,
        url: input.imageUrl,
        alt: input.imageAlt,
        displayOrder: 0
      }
    ]
  };
}

export const fallbackProducts: FallbackProduct[] = [
  product({
    slug: "stolovyi-serviz-pink-floral-32",
    name: "Столовый сервиз 32пр 6перс с розовым цветочным декором",
    description: "Элегантный столовый сервиз на 6 персон в белом цвете с нежным розовым цветочным декором.",
    priceRub: 10000,
    stockQuantity: 10,
    imageUrl: "/uploads/products/stolovyi-serviz-pink-floral-32-premium.png",
    imageAlt: "Столовый сервиз 32пр 6перс с розовым цветочным декором",
    categorySlug: "posuda",
    subcategorySlug: "servizy"
  }),
  product({
    slug: "stolovyi-serviz-blue-floral-40",
    name: "Столовый сервиз с голубым цветочным декором, 40 предметов",
    description: "Столовый сервиз на 40 предметов в белом цвете с нежным голубым цветочным декором.",
    priceRub: 13000,
    stockQuantity: 10,
    imageUrl: "/uploads/products/stolovyi-serviz-blue-floral-40-premium.png",
    imageAlt: "Столовый сервиз с голубым цветочным декором, 40 предметов",
    categorySlug: "posuda",
    subcategorySlug: "servizy"
  }),
  product({
    slug: "stolovyi-serviz-32pr-white-relief",
    name: "Столовый сервиз на 6 персон, 32 предмета",
    description: "Элегантный столовый сервиз на 6 персон в классическом белом цвете с нежным рельефным декором.",
    priceRub: 9500,
    stockQuantity: 10,
    imageUrl: "/uploads/products/stolovyi-serviz-32pr-white-relief-premium.png",
    imageAlt: "Столовый сервиз на 6 персон, 32 предмета",
    categorySlug: "posuda",
    subcategorySlug: "servizy"
  }),
  product({
    slug: "stolovyi-serviz-white-lui-laren-39",
    name: "Столовый сервиз WHITE Lui Laren",
    description: "Столовый сервиз WHITE от бренда Lui Laren на 6 персон. Элегантный белый набор из 39 предметов.",
    priceRub: 11500,
    stockQuantity: 1,
    brand: "Lui Laren",
    characteristics: "Коллекция: WHITE\nКоличество персон: 6\nВсего предметов: 39",
    imageUrl: "/uploads/products/stolovyi-serviz-white-lui-laren-39-premium.png",
    imageAlt: "Столовый сервиз WHITE Lui Laren",
    categorySlug: "posuda",
    subcategorySlug: "servizy"
  }),
  product({
    slug: "chaynyi-nabor-smeg",
    name: "Чайный набор Smeg",
    description: "Чайный набор Smeg для красивой подачи чая.",
    priceRub: 4500,
    stockQuantity: 1,
    brand: "Smeg",
    imageUrl: "/uploads/products/chaynyi-nabor-smeg-premium.png",
    imageAlt: "Чайный набор Smeg",
    categorySlug: "posuda",
    subcategorySlug: "servizy"
  }),
  product({
    slug: "nabor-posudy-belyi-serviz",
    name: "Белый набор посуды",
    description: "Красивый белый набор посуды для полной сервировки стола.",
    priceRub: 9300,
    stockQuantity: 1,
    imageUrl: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
    imageAlt: "Белый набор посуды",
    categorySlug: "posuda",
    subcategorySlug: "servizy"
  }),
  product({
    slug: "test-serviz-epuise",
    name: "Тестовый сервиз без остатка",
    description: "Тестовый опубликованный товар без остатка.",
    priceRub: 1200,
    stockQuantity: 0,
    isNew: false,
    brand: "Indira Home",
    imageUrl: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
    imageAlt: "Тестовый сервиз без остатка",
    categorySlug: "posuda",
    subcategorySlug: "servizy"
  })
];

export function isDatabaseUnavailable(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    ("code" in error || "message" in error) &&
    (String("code" in error ? error.code : "").includes("P1001") ||
      String("message" in error ? error.message : "").includes("Can't reach database server"))
  );
}

export function getFallbackCategory(slug: string) {
  const category = fallbackCategories.find((item) => item.slug === slug);
  if (!category) return null;

  return {
    ...category,
    products: fallbackProducts.filter((product) => product.category.slug === slug)
  };
}

export function getFallbackSubcategory(slug: string) {
  const subcategory = fallbackCategories.flatMap((category) => category.subcategories).find((item) => item.slug === slug);
  if (!subcategory) return null;

  return {
    ...subcategory,
    category: fallbackCategories.find((category) => category.id === subcategory.categoryId)!,
    products: fallbackProducts.filter((product) => product.subcategory.slug === slug)
  };
}

export function getFallbackProduct(slug: string) {
  return fallbackProducts.find((product) => product.slug === slug) ?? null;
}

export function getFallbackRelatedProducts(product: FallbackProduct, take = 4) {
  return fallbackProducts
    .filter((item) => item.id !== product.id && item.subcategory.slug === product.subcategory.slug)
    .slice(0, take);
}

export function searchFallbackProducts(query: string) {
  const normalizedQuery = query.toLocaleLowerCase("ru");

  return fallbackProducts.filter((product) =>
    [product.name, product.description, product.brand, product.category.name, product.subcategory.name]
      .filter(Boolean)
      .some((value) => value!.toLocaleLowerCase("ru").includes(normalizedQuery))
  );
}
