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
  },
  {
    slug: "stolovyi-serviz-32pr-white-relief",
    url: "/uploads/products/stolovyi-serviz-32pr-white-relief-premium.png",
    alt: "Столовый сервиз на 6 персон, 32 предмета"
  },
  {
    slug: "nabor-kastryul-bayer-black-5",
    url: "/uploads/products/nabor-kastryul-bayer-black-5-premium.png",
    alt: "Набор кастрюль BAYER, 5 предметов"
  },
  {
    slug: "otparivatel-proliss-wizard-aid",
    url: "/uploads/products/otparivatel-proliss-wizard-aid-premium.png",
    alt: "Отпариватель для одежды PROLISS Series Wizard Aid"
  },
  {
    slug: "stolovyi-serviz-blue-floral-40",
    url: "/uploads/products/stolovyi-serviz-blue-floral-40-premium.png",
    alt: "Столовый сервиз с голубым цветочным декором, 40 предметов"
  },
  {
    slug: "stolovyi-serviz-pink-floral-32",
    url: "/uploads/products/stolovyi-serviz-pink-floral-32-premium.png",
    alt: "Столовый сервиз 32пр 6перс с розовым цветочным декором"
  },
  {
    slug: "pogruzhnoy-blender-uakeen-s-nasadkami",
    url: "/uploads/products/pogruzhnoy-blender-uakeen-premium.png",
    alt: "Погружной блендер UAKEEN с насадками"
  },
  {
    slug: "nabor-kastryul-uakeen-beige-5",
    url: "/uploads/products/nabor-kastryul-uakeen-beige-5-premium.png",
    alt: "Набор кастрюль UAKEEN бежевый, 5 предметов"
  },
  {
    slug: "nabor-kastryul-uakeen-black-5",
    url: "/uploads/products/nabor-kastryul-uakeen-black-5-premium.png",
    alt: "Набор кастрюль UAKEEN черный, 5 предметов"
  },
  {
    slug: "emkosti-lefard-med-sahar-250",
    url: "/uploads/products/emkosti-lefard-med-sahar-250-premium.png",
    alt: "Набор емкостей Lefard для меда и сахара, 250 мл"
  },
  {
    slug: "test-serviz-epuise",
    url: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
    alt: "Тестовый сервиз без остатка"
  },
  {
    slug: "test-skrytyi-tovar",
    url: "/uploads/products/chaynyi-nabor-smeg-premium.png",
    alt: "Тестовый скрытый товар"
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
      ["Пылесосы", "pylesosy"],
      ["Отпариватели", "otparivateli"]
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

  await prisma.product.upsert({
    where: { slug: "test-serviz-epuise" },
    update: {
      name: "Тестовый сервиз без остатка",
      description:
        "Тестовый опубликованный товар без остатка. Он нужен для проверки, что товар остается видимым для клиентки, но не доступен для заказа.",
      priceRub: 1200,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 0,
      status: PRODUCT_STATUS.published,
      isNew: false,
      brand: "Indira Home",
      characteristics: "Назначение: проверка состояния без остатка"
    },
    create: {
      name: "Тестовый сервиз без остатка",
      slug: "test-serviz-epuise",
      description:
        "Тестовый опубликованный товар без остатка. Он нужен для проверки, что товар остается видимым для клиентки, но не доступен для заказа.",
      priceRub: 1200,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 0,
      status: PRODUCT_STATUS.published,
      isNew: false,
      brand: "Indira Home",
      characteristics: "Назначение: проверка состояния без остатка",
      images: {
        create: {
          url: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
          alt: "Тестовый сервиз без остатка",
          displayOrder: 0
        }
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "test-skrytyi-tovar" },
    update: {
      name: "Тестовый скрытый товар",
      description:
        "Тестовый скрытый товар для проверки, что товары со статусом HIDDEN не появляются в клиентском каталоге.",
      priceRub: 1500,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 2,
      status: PRODUCT_STATUS.hidden,
      isNew: false,
      brand: "Indira Home",
      characteristics: "Назначение: проверка скрытого статуса"
    },
    create: {
      name: "Тестовый скрытый товар",
      slug: "test-skrytyi-tovar",
      description:
        "Тестовый скрытый товар для проверки, что товары со статусом HIDDEN не появляются в клиентском каталоге.",
      priceRub: 1500,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 2,
      status: PRODUCT_STATUS.hidden,
      isNew: false,
      brand: "Indira Home",
      characteristics: "Назначение: проверка скрытого статуса",
      images: {
        create: {
          url: "/uploads/products/chaynyi-nabor-smeg-premium.png",
          alt: "Тестовый скрытый товар",
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
  const applianceCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "bytovaya-tehnika" }
  });
  const blendersSubcategory = await prisma.subcategory.findUniqueOrThrow({
    where: { slug: "blendery" }
  });
  const steamersSubcategory = await prisma.subcategory.findUniqueOrThrow({
    where: { slug: "otparivateli" }
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

  const newProducts = [
    {
      name: "Столовый сервиз на 6 персон, 32 предмета",
      slug: "stolovyi-serviz-32pr-white-relief",
      description:
        "Элегантный столовый сервиз на 6 персон в классическом белом цвете с нежным рельефным декором. Подходит для ежедневной сервировки и праздничного стола. В набор входят обеденные и десертные тарелки, суповые чаши, кружки с блюдцами и два овальных блюда.",
      priceRub: 9500,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 10,
      brand: null,
      characteristics:
        "Обеденные тарелки: 6 шт.\nДесертные тарелки: 6 шт.\nСуповые чаши: 6 шт.\nКружки 250 мл: 6 шт.\nБлюдца: 6 шт.\nОвальное блюдо: 2 шт.\nВсего предметов: 32\nКоличество персон: 6"
    },
    {
      name: "Набор кастрюль BAYER, 5 предметов",
      slug: "nabor-kastryul-bayer-black-5",
      description:
        "Набор кастрюль BAYER в черном цвете с крышками. Практичный комплект из 5 предметов для ежедневного приготовления блюд, выполненный в сдержанном современном дизайне.",
      priceRub: 5500,
      categoryId: kitchenCategory.id,
      subcategoryId: potsSubcategory.id,
      stockQuantity: 10,
      brand: "BAYER",
      characteristics:
        "Всего предметов: 5\nЦвет: черный\nКомплектация: кастрюли с крышками\nБренд: BAYER\nНазначение: ежедневная готовка"
    },
    {
      name: "Отпариватель для одежды PROLISS Series Wizard Aid",
      slug: "otparivatel-proliss-wizard-aid",
      description:
        "Многофункциональный отпариватель для одежды PROLISS Series Wizard Aid мощностью 3000 Вт. Подходит для ухода за одеждой дома, помогает быстро освежить вещи, разгладить складки и привести ткани в аккуратный вид без гладильной доски.",
      priceRub: 6000,
      categoryId: applianceCategory.id,
      subcategoryId: steamersSubcategory.id,
      stockQuantity: 10,
      brand: "PROLISS",
      characteristics:
        "Мощность: 3000 Вт\nОбъем резервуара: 2.3 л\nФункции: отпаривание одежды\nРезервуар для воды: визуальный контроль уровня\nПредохранитель: термозащита\nКоличество режимов: 11\nГарантия: 12 месяцев"
    },
    {
      name: "Столовый сервиз с голубым цветочным декором, 40 предметов",
      slug: "stolovyi-serviz-blue-floral-40",
      description:
        "Столовый сервиз на 40 предметов в белом цвете с нежным голубым цветочным декором. Подходит для красивой сервировки семейного или праздничного стола. В набор входят тарелки, чашки, салатники и блюда для полноценной подачи.",
      priceRub: 13000,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 10,
      brand: null,
      characteristics:
        "Всего предметов: 40\nДекор: голубой цветочный узор\nЦвет: белый\nНазначение: сервировка стола"
    },
    {
      name: "Столовый сервиз 32пр 6перс с розовым цветочным декором",
      slug: "stolovyi-serviz-pink-floral-32",
      description:
        "Элегантный столовый сервиз на 6 персон в белом цвете с нежным розовым цветочным декором. Подходит для ежедневной сервировки и праздничного стола.",
      priceRub: 10000,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 10,
      brand: null,
      characteristics:
        "Обеденные тарелки: 6 шт.\nДесертные тарелки: 6 шт.\nСуповые чаши: 6 шт.\nКружки 250 мл: 6 шт.\nБлюдца: 6 шт.\nОвальное блюдо: 2 шт."
    },
    {
      name: "Погружной блендер UAKEEN с насадками",
      slug: "pogruzhnoy-blender-uakeen-s-nasadkami",
      description:
        "Многофункциональный погружной блендер UAKEEN с набором насадок для приготовления разных блюд. Подходит для измельчения, взбивания, смешивания и нарезки продуктов. В комплект входят чаша, венчики, измельчитель и дополнительные насадки для удобной работы на кухне.",
      priceRub: 5000,
      categoryId: applianceCategory.id,
      subcategoryId: blendersSubcategory.id,
      stockQuantity: 10,
      brand: "UAKEEN",
      characteristics:
        "Тип: погружной блендер\nКомплектация: блендер, чаша, венчики, измельчитель, насадки\nНазначение: измельчение, смешивание, взбивание, нарезка\nБренд: UAKEEN"
    },
    {
      name: "Набор кастрюль UAKEEN бежевый, 5 предметов",
      slug: "nabor-kastryul-uakeen-beige-5",
      description:
        "Бежевый набор кастрюль UAKEEN из литого алюминия с прочным покрытием. Кастрюли равномерно нагреваются, легко моются и подходят для ежедневного приготовления блюд. В комплект входят пять удобных объемов для разных задач на кухне.",
      priceRub: 6500,
      categoryId: kitchenCategory.id,
      subcategoryId: potsSubcategory.id,
      stockQuantity: 10,
      brand: "UAKEEN",
      characteristics:
        "Материал: литой алюминий\nПокрытие: прочное, легко моется\nОбъемы: 3 л, 5 л, 5 л, 8 л, 12 л\nВсего предметов: 5\nРавномерное нагревание\nЛегко моется"
    },
    {
      name: "Набор кастрюль UAKEEN черный, 5 предметов",
      slug: "nabor-kastryul-uakeen-black-5",
      description:
        "Черный набор кастрюль UAKEEN из литого алюминия с прочным покрытием. Кастрюли подходят для ежедневной готовки, равномерно нагреваются и легко моются. В комплект входят пять объемов, удобных для приготовления блюд на каждый день и на большую семью.",
      priceRub: 6500,
      categoryId: kitchenCategory.id,
      subcategoryId: potsSubcategory.id,
      stockQuantity: 10,
      brand: "UAKEEN",
      characteristics:
        "Материал: литой алюминий\nПокрытие: прочное\nОбъемы: 3 л, 5 л, 5 л, 8 л, 12 л\nВсего предметов: 5\nПодходят для всех плит\nЛегко моются"
    },
    {
      name: "Набор емкостей Lefard для меда и сахара, 250 мл",
      slug: "emkosti-lefard-med-sahar-250",
      description:
        "Набор стеклянных емкостей Lefard с деревянными крышками и ложечками. Подходит для красивой подачи меда и сахара на стол и удобного хранения на кухне.",
      priceRub: 800,
      categoryId: kitchenCategory.id,
      subcategoryId: kitchenAccessoriesSubcategory.id,
      stockQuantity: 10,
      brand: "Lefard",
      characteristics:
        "Объем: 250 мл\nКоличество емкостей: 2\nКрышки: дерево\nВ комплекте: ложечки\nНазначение: мед и сахар"
    }
  ];

  for (const product of newProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        priceRub: product.priceRub,
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
        stockQuantity: product.stockQuantity,
        status: PRODUCT_STATUS.published,
        isNew: true,
        brand: product.brand,
        characteristics: product.characteristics
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        priceRub: product.priceRub,
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
        stockQuantity: product.stockQuantity,
        status: PRODUCT_STATUS.published,
        isNew: true,
        brand: product.brand,
        characteristics: product.characteristics
      }
    });
  }

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
