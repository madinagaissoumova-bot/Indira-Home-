import { PrismaClient } from "@prisma/client";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "../lib/constants";

const prisma = new PrismaClient();

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
    where: { slug: "stolovyi-serviz-indira" },
    update: {},
    create: {
      name: "Столовый сервиз Indira",
      slug: "stolovyi-serviz-indira",
      description: "Набор посуды для семейного стола. Подходит для ежедневного использования и приема гостей.",
      priceRub: 6900,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      stockQuantity: 4,
      status: PRODUCT_STATUS.published,
      isNew: true,
      images: {
        create: {
          url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
          alt: "Столовый сервиз Indira",
          displayOrder: 0
        }
      }
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
