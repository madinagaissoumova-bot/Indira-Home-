import { PrismaClient } from "@prisma/client";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "../lib/constants";

const prisma = new PrismaClient();

const productImages = [
  {
    slug: "nabor-posudy-belyi-serviz",
    url: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
    alt: "Белый набор посуды"
  },
  {
    slug: "chaynyi-nabor-smeg",
    url: "/uploads/products/chaynyi-nabor-smeg-premium.png",
    alt: "Чайный набор Smeg"
  },
  {
    slug: "stolovyi-serviz-white-lui-laren-39",
    url: "/uploads/products/stolovyi-serviz-white-lui-laren-39-premium.png",
    alt: "Столовый сервиз WHITE Lui Laren"
  },
  {
    slug: "nabor-kastryul-304-english-design",
    url: "/uploads/products/nabor-kastryul-304-english-design-premium.png",
    alt: "Набор кастрюль English Design 304"
  },
  {
    slug: "hlebnitsa-lefard-steklo-derevo",
    url: "/uploads/products/hlebnitsa-lefard-steklo-derevo-premium.png",
    alt: "Хлебница Lefard со стеклянной крышкой"
  },
  {
    slug: "syrnitsa-lefard-steklo-derevo-20-sm",
    url: "/uploads/products/syrnitsa-lefard-steklo-derevo-20-sm-premium.png",
    alt: "Сырница Lefard 20 см"
  },
  {
    slug: "maslenka-lefard-steklo-derevo",
    url: "/uploads/products/maslenka-lefard-steklo-derevo-premium.png",
    alt: "Масленка Lefard со стеклянной крышкой"
  },
  {
    slug: "hlebnitsa-keramika-steklo-26-sm",
    url: "/uploads/products/hlebnitsa-keramika-steklo-26-sm-premium.png",
    alt: "Хлебница керамика/стекло 26 см"
  }
];

const categories = [
  {
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
    name: "Бытовая техника",
    slug: "bytovaya-tehnika",
    subcategories: [
      ["Чайники", "chainiki"],
      ["Блендеры", "blendery"],
      ["Пылесосы", "pylesosy"]
    ]
  },
  {
    name: "Декор",
    slug: "dekor",
    subcategories: [
      ["Вазы", "vazy"],
      ["Декор стола", "dekor-stola"]
    ]
  }
];

async function main() {
  for (const [index, category] of categories.entries()) {
    const savedCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        status: VISIBILITY_STATUS.visible,
        displayOrder: index
      }
    });

    for (const [subIndex, [name, slug]] of category.subcategories.entries()) {
      await prisma.subcategory.upsert({
        where: { slug },
        update: {},
        create: {
          name,
          slug,
          categoryId: savedCategory.id,
          status: VISIBILITY_STATUS.visible,
          displayOrder: subIndex
        }
      });
    }
  }

  const category = await prisma.category.findUniqueOrThrow({
    where: { slug: "posuda" }
  });
  const subcategory = await prisma.subcategory.findUniqueOrThrow({
    where: { slug: "servizy" }
  });

  await prisma.product.upsert({
    where: { slug: "nabor-posudy-belyi-serviz" },
    update: {
      name: "Белый набор посуды",
      description:
        "Красивый белый набор посуды для полной сервировки стола. В комплект входят тарелки, суповые пиалы, чашки с блюдцами, розетки, овальные блюда, чайник и сахарница.",
      priceRub: 9300,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      characteristics:
        "Тарелка 26 см: 6 штук\nТарелка 21 см: 6 штук\nСуповая пиала: 6 штук\nЧашка с блюдцем: 6 штук\nРозетка: 6 штук\nОвальное блюдо 30 см: 2 штуки\nЧайник: 1 штука\nСахарница: 1 штука"
    },
    create: {
      name: "Белый набор посуды",
      slug: "nabor-posudy-belyi-serviz",
      description:
        "Красивый белый набор посуды для полной сервировки стола. В комплект входят тарелки, суповые пиалы, чашки с блюдцами, розетки, овальные блюда, чайник и сахарница.",
      priceRub: 9300,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      characteristics:
        "Тарелка 26 см: 6 штук\nТарелка 21 см: 6 штук\nСуповая пиала: 6 штук\nЧашка с блюдцем: 6 штук\nРозетка: 6 штук\nОвальное блюдо 30 см: 2 штуки\nЧайник: 1 штука\nСахарница: 1 штука",
      images: {
        create: {
          url: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
          alt: "Белый набор посуды",
          displayOrder: 0
        }
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "chaynyi-nabor-smeg" },
    update: {
      name: "Чайный набор Smeg",
      description:
        "Чайный набор Smeg для красивой подачи чая. В комплект входят чашки с блюдцами и чайник, выполненные в нежном светлом оттенке.",
      priceRub: 4500,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Smeg",
      characteristics: "Объем кружек: 250 мл\nОбъем чайника: 1 л"
    },
    create: {
      name: "Чайный набор Smeg",
      slug: "chaynyi-nabor-smeg",
      description:
        "Чайный набор Smeg для красивой подачи чая. В комплект входят чашки с блюдцами и чайник, выполненные в нежном светлом оттенке.",
      priceRub: 4500,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Smeg",
      characteristics: "Объем кружек: 250 мл\nОбъем чайника: 1 л",
      images: {
        create: {
          url: "/uploads/products/chaynyi-nabor-smeg-premium.png",
          alt: "Чайный набор Smeg",
          displayOrder: 0
        }
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "stolovyi-serviz-white-lui-laren-39" },
    update: {
      name: "Столовый сервиз WHITE Lui Laren",
      description:
        "Столовый сервиз WHITE от бренда Lui Laren на 6 персон. Элегантный белый набор из 39 предметов для полной сервировки праздничного или семейного стола.",
      priceRub: 11500,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lui Laren",
      characteristics:
        "Коллекция: WHITE\nКоличество персон: 6\nВсего предметов: 39\nПодтарельники: 6 штук\nЗакусочные тарелки: 6 штук\nЕвро суповые тарелки: 6 штук\nПиалы: 6 штук\nКружки: 6 штук\nБлюдца: 6 штук\nОвальные блюда: 2 штуки\nСалатник: 1 штука"
    },
    create: {
      name: "Столовый сервиз WHITE Lui Laren",
      slug: "stolovyi-serviz-white-lui-laren-39",
      description:
        "Столовый сервиз WHITE от бренда Lui Laren на 6 персон. Элегантный белый набор из 39 предметов для полной сервировки праздничного или семейного стола.",
      priceRub: 11500,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lui Laren",
      characteristics:
        "Коллекция: WHITE\nКоличество персон: 6\nВсего предметов: 39\nПодтарельники: 6 штук\nЗакусочные тарелки: 6 штук\nЕвро суповые тарелки: 6 штук\nПиалы: 6 штук\nКружки: 6 штук\nБлюдца: 6 штук\nОвальные блюда: 2 штуки\nСалатник: 1 штука",
      images: {
        create: {
          url: "/uploads/products/stolovyi-serviz-white-lui-laren-39-premium.png",
          alt: "Столовый сервиз WHITE Lui Laren",
          displayOrder: 0
        }
      }
    }
  });

  const kitchenCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "kuhnya" }
  });
  const potsSubcategory = await prisma.subcategory.findUniqueOrThrow({
    where: { slug: "kastryuli" }
  });
  const kitchenAccessoriesSubcategory = await prisma.subcategory.findUniqueOrThrow({
    where: { slug: "kuhonnye-aksessuary" }
  });

  await prisma.product.upsert({
    where: { slug: "nabor-kastryul-304-english-design" },
    update: {
      name: "Набор кастрюль English Design 304",
      description:
        "Изысканный набор кастрюль в утонченном английском дизайне из высококачественной нержавеющей стали 304. В набор входят 3 кастрюли объемом 1.8 л, 3.5 л и 5.3 л, а также сковорода.",
      priceRub: 17000,
      categoryId: kitchenCategory.id,
      subcategoryId: potsSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true
    },
    create: {
      name: "Набор кастрюль English Design 304",
      slug: "nabor-kastryul-304-english-design",
      description:
        "Изысканный набор кастрюль в утонченном английском дизайне из высококачественной нержавеющей стали 304. В набор входят 3 кастрюли объемом 1.8 л, 3.5 л и 5.3 л, а также сковорода.",
      priceRub: 17000,
      categoryId: kitchenCategory.id,
      subcategoryId: potsSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      characteristics: "Материал: нержавеющая сталь 304\nОбъемы: 1.8 л, 3.5 л, 5.3 л\nКомплектация: 3 кастрюли и сковорода",
      images: {
        create: {
          url: "/uploads/products/nabor-kastryul-304-english-design-premium.png",
          alt: "Набор кастрюль English Design 304",
          displayOrder: 0
        }
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "hlebnitsa-lefard-steklo-derevo" },
    update: {
      name: "Хлебница Lefard со стеклянной крышкой",
      description:
        "Шикарная хлебница Lefard с прозрачной стеклянной крышкой и нижней частью из дерева. Подходит для красивой подачи хлеба, выпечки и сладостей на стол.",
      priceRub: 2500,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lefard",
      characteristics: "Крышка: стекло\nОснование: дерево"
    },
    create: {
      name: "Хлебница Lefard со стеклянной крышкой",
      slug: "hlebnitsa-lefard-steklo-derevo",
      description:
        "Шикарная хлебница Lefard с прозрачной стеклянной крышкой и нижней частью из дерева. Подходит для красивой подачи хлеба, выпечки и сладостей на стол.",
      priceRub: 2500,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lefard",
      characteristics: "Крышка: стекло\nОснование: дерево",
      images: {
        create: {
          url: "/uploads/products/hlebnitsa-lefard-steklo-derevo-premium.png",
          alt: "Хлебница Lefard со стеклянной крышкой",
          displayOrder: 0
        }
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "syrnitsa-lefard-steklo-derevo-20-sm" },
    update: {
      name: "Сырница Lefard 20 см",
      description:
        "Шикарная сырница Lefard с прозрачной стеклянной крышкой и нижней частью из дерева. Диаметр 20 см, подходит для сыра, закусок и красивой подачи на стол.",
      priceRub: 1250,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lefard",
      characteristics: "Размер: 20 см\nКрышка: стекло\nОснование: дерево"
    },
    create: {
      name: "Сырница Lefard 20 см",
      slug: "syrnitsa-lefard-steklo-derevo-20-sm",
      description:
        "Шикарная сырница Lefard с прозрачной стеклянной крышкой и нижней частью из дерева. Диаметр 20 см, подходит для сыра, закусок и красивой подачи на стол.",
      priceRub: 1250,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lefard",
      characteristics: "Размер: 20 см\nКрышка: стекло\nОснование: дерево",
      images: {
        create: {
          url: "/uploads/products/syrnitsa-lefard-steklo-derevo-20-sm-premium.png",
          alt: "Сырница Lefard 20 см",
          displayOrder: 0
        }
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "maslenka-lefard-steklo-derevo" },
    update: {
      name: "Масленка Lefard со стеклянной крышкой",
      description:
        "Шикарная масленка Lefard с прозрачной стеклянной крышкой и нижней частью из дерева. Аккуратный аксессуар для красивой подачи масла на стол.",
      priceRub: 800,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lefard",
      characteristics: "Крышка: стекло\nОснование: дерево"
    },
    create: {
      name: "Масленка Lefard со стеклянной крышкой",
      slug: "maslenka-lefard-steklo-derevo",
      description:
        "Шикарная масленка Lefard с прозрачной стеклянной крышкой и нижней частью из дерева. Аккуратный аксессуар для красивой подачи масла на стол.",
      priceRub: 800,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      brand: "Lefard",
      characteristics: "Крышка: стекло\nОснование: дерево",
      images: {
        create: {
          url: "/uploads/products/maslenka-lefard-steklo-derevo-premium.png",
          alt: "Масленка Lefard со стеклянной крышкой",
          displayOrder: 0
        }
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "hlebnitsa-keramika-steklo-26-sm" },
    update: {
      name: "Хлебница керамика/стекло 26 см",
      description:
        "Хлебница с керамическим основанием и прозрачной стеклянной крышкой. Размер 26 см, подходит для красивой подачи хлеба, выпечки и десертов.",
      priceRub: 2000,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      characteristics: "Размер: 26 см\nОснование: керамика\nКрышка: стекло"
    },
    create: {
      name: "Хлебница керамика/стекло 26 см",
      slug: "hlebnitsa-keramika-steklo-26-sm",
      description:
        "Хлебница с керамическим основанием и прозрачной стеклянной крышкой. Размер 26 см, подходит для красивой подачи хлеба, выпечки и десертов.",
      priceRub: 2000,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 1,
      status: PRODUCT_STATUS.published,
      isNew: true,
      characteristics: "Размер: 26 см\nОснование: керамика\nКрышка: стекло",
      images: {
        create: {
          url: "/uploads/products/hlebnitsa-keramika-steklo-26-sm-premium.png",
          alt: "Хлебница керамика/стекло 26 см",
          displayOrder: 0
        }
      }
    }
  });

  for (const productImage of productImages) {
    const product = await prisma.product.findUnique({
      where: { slug: productImage.slug },
      select: { id: true }
    });

    if (!product) continue;

    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: productImage.url,
        alt: productImage.alt,
        displayOrder: 0
      }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
