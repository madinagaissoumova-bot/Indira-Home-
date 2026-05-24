export const ru = {
  brand: {
    name: "Indira Home",
    tagline: "посуда и декор для дома",
    metadataDescription: "Каталог товаров для дома Indira Home"
  },
  common: {
    home: "Главная",
    catalog: "Каталог",
    cart: "Корзина",
    checkout: "Заказ",
    search: "Поиск",
    categories: "Категории",
    backToCatalog: "Вернуться в каталог",
    unavailableProduct: "Товар недоступен",
    quantity: "Количество",
    total: "Итого",
    viewProduct: "Смотреть",
    addToCart: "В корзину",
    addToCartLong: "Добавить в корзину",
    unavailable: "Недоступно",
    added: "Добавлено",
    new: "Новинка",
    soldOut: "Нет в наличии",
    whatsappShop: "WhatsApp магазина: +7 988 906-41-06",
    pageNavigation: "Навигация по странице"
  },
  layout: {
    searchLabel: "Поиск товара",
    searchPlaceholder: "Поиск по товарам",
    mainNav: "Основные страницы",
    privacy: "Конфиденциальность"
  },
  home: {
    eyebrow: "Новая коллекция",
    description:
      "Спокойная сервировка, теплые фактуры и предметы для дома, которые выглядят красиво каждый день.",
    viewCatalog: "Смотреть каталог",
    openCollection: "Открыть коллекцию",
    benefitsLabel: "Преимущества",
    delivery: "Доставка по Чеченской Республике",
    paymentAfterConfirmation: "Оплата после подтверждения",
    collectionsLabel: "Коллекции"
  },
  catalog: {
    collection: "Коллекция",
    collectionSummary: "Информация о коллекции",
    defaultCategoryDescription: "Подборка товаров для красивого и уютного дома.",
    subcategories: "Подкатегории",
    filtersAndSorting: "Сортировка и фильтры",
    productCount: (count: number) => `${count} товаров`,
    filters: "Фильтры",
    defaultSort: "По умолчанию",
    inSection: "в разделе",
    noCategoryProducts: "Пока нет товаров в этой категории.",
    noSubcategoryProducts: "В этой подкатегории пока нет товаров.",
    categoryDescriptions: {
      posuda: "Сервировка, чашки, блюда и наборы для спокойного семейного стола.",
      kuhnya: "Теплые и практичные предметы для кухни, ежедневного ухода и готовки.",
      "bytovaya-tehnika": "Аккуратная техника для дома без лишнего визуального шума.",
      dekor: "Детали, которые добавляют дому мягкость, фактуру и завершенность."
    } as Record<string, string>
  },
  search: {
    title: "Поиск товаров",
    resultsTitle: (query: string) => `Результаты: ${query}`,
    resultsCount: (count: number) => `${count} товаров найдено`,
    intro: "Введите название, бренд или описание товара в поисковой строке.",
    noResults: "По этому запросу пока ничего не найдено.",
    hint: "Поиск поможет быстро найти сервизы, посуду, аксессуары для кухни и декор.",
    backHome: "Вернуться на главную"
  },
  product: {
    photos: "Фотографии товара",
    fallbackSpecLabel: "Деталь",
    noAccountOrder: "Заказ без аккаунта",
    confirmationByPhone: "Подтверждение по телефону или WhatsApp",
    deliveryChechnya: "Доставка по Чеченской Республике",
    whatsappButton: "Написать в WhatsApp",
    whatsappText: (productName: string) =>
      `Здравствуйте! Хочу уточнить наличие товара: ${productName}`,
    relatedTitle: "Похожие товары",
    viewSection: "Смотреть раздел",
    characteristics: "Характеристики"
  },
  cart: {
    title: "Ваша корзина",
    eyebrow: "Корзина",
    intro: "Проверьте товары и количество перед оформлением заказа.",
    empty: "Ваша корзина пуста.",
    backToCart: "Вернуться в корзину",
    unavailableLine: "Недоступно для заказа",
    quantityChanged: "Количество изменилось. Можно заказать меньше, чем было выбрано.",
    removeUnavailable: "Удалите этот товар, чтобы продолжить оформление заказа.",
    fix: "Исправить",
    remove: "Удалить",
    orderAmount: "Сумма заказа",
    invalid: "Некоторые товары нужно удалить или исправить перед оформлением.",
    noOnlinePayment: "Оплата онлайн не требуется. Магазин свяжется с вами для подтверждения.",
    maxReached: "Больше добавить нельзя",
    fixCart: "Исправить корзину",
    checkout: "Оформить заказ",
    clear: "Очистить корзину",
    navLabel: (count: number) => `Корзина, товаров: ${count}`
  },
  checkout: {
    breadcrumb: "Оформление заказа",
    eyebrow: "Оформление заказа",
    title: "Данные для доставки",
    intro: "Заполните контакты. Мы подтвердим заказ по телефону или WhatsApp.",
    contactTitle: "Контактные данные",
    name: "Имя",
    phone: "Телефон или WhatsApp",
    phonePlaceholder: "+7 ...",
    address: "Адрес или зона доставки",
    addressPlaceholder: "Доставка только по Чеченской Республике",
    paymentMethod: "Способ оплаты",
    cashOnDelivery: "Оплата при получении",
    transferAfterConfirmation: "Перевод после подтверждения",
    reminder:
      "Онлайн-оплаты нет. Магазин свяжется с вами по телефону или WhatsApp для подтверждения заказа.",
    submit: "Отправить заказ",
    submitting: "Отправка...",
    summary: "Ваш заказ",
    unavailableSuffix: " - недоступно",
    invalidCart: "Корзину нужно исправить перед отправкой заказа.",
    errors: {
      emptyCart: "Ваша корзина пуста или содержит товары, которые нужно исправить.",
      missingName: "Пожалуйста, укажите имя.",
      invalidPhone: "Пожалуйста, укажите корректный номер телефона или WhatsApp.",
      missingAddress: "Пожалуйста, укажите адрес или зону доставки в Чеченской Республике.",
      outsideZone: "Доставка пока доступна только по Чеченской Республике.",
      missingPayment: "Пожалуйста, выберите способ оплаты.",
      insufficientStock: "Запрошенное количество больше недоступно. Пожалуйста, обновите корзину.",
      unavailableProduct: "Один из товаров больше недоступен для заказа.",
      general: "Не удалось отправить заказ. Попробуйте еще раз."
    }
  },
  confirmation: {
    breadcrumb: "Подтверждение",
    eyebrow: "Заказ отправлен",
    title: "Спасибо за заказ",
    message:
      "Ваш заказ отправлен. Магазин свяжется с вами по телефону или WhatsApp, чтобы подтвердить детали.",
    orderNumber: (order: string) => `Номер заказа: ${order}`,
    noRecentOrder: "Нет недавнего заказа для подтверждения."
  },
  notFound: {
    eyebrow: "404",
    title: "Страница не найдена",
    text: "Товар или раздел недоступен."
  },
  privacy: {
    eyebrow: "Конфиденциальность",
    title: "Как мы используем данные",
    intro:
      "Indira Home собирает только данные, которые нужны для обработки заказа и связи с клиенткой.",
    collectedTitle: "Какие данные собираются",
    collected:
      "Имя, телефон или WhatsApp, адрес или зона доставки, выбранные товары и способ оплаты.",
    usageTitle: "Для чего используются данные",
    usage:
      "Данные используются только для подтверждения заказа, доставки и связи по телефону или WhatsApp.",
    protectionTitle: "Где видны данные",
    protection:
      "Данные заказа видны только в защищенной админ-панели. Они не показываются на публичных страницах сайта.",
    contact:
      "Если нужно изменить или отменить заказ, свяжитесь с магазином по WhatsApp: +7 988 906-41-06."
  },
  admin: {
    login: {
      eyebrow: "Espace admin",
      title: "Вход в админку",
      text: "Введите данные администратора, чтобы управлять каталогом и заказами.",
      username: "Логин",
      password: "Пароль",
      submit: "Войти",
      invalid: "Неверный логин или пароль.",
      missing: "Введите логин и пароль.",
      notConfigured: "Админ-доступ не настроен. Проверьте переменные окружения."
    },
    dashboard: {
      eyebrow: "Espace admin",
      title: "Панель управления",
      text: "Центральный экран для заказов, товаров, склада и категорий.",
      logout: "Выйти",
      newOrders: "Новые заказы",
      activeOrders: "Заказы в работе",
      publishedProducts: "Опубликованные товары",
      visibleProducts: "Видны клиенткам",
      soldOutProducts: "Товары без наличия",
      hiddenProducts: "Скрытые товары",
      recentOrders: "Последние заказы",
      noOrders: "Пока нет заказов.",
      stockAlerts: "Товары без наличия",
      stockQuantity: (quantity: number) => `${quantity} шт.`,
      noStockAlerts: "Нет опубликованных товаров без наличия.",
      sections: {
        products: "Товары",
        productsText: "Создание, публикация, скрытие, редактирование и удаление товаров.",
        categories: "Категории",
        categoriesText: "Управление категориями и подкатегориями каталога.",
        stock: "Склад",
        stockText: "Просмотр и корректировка количества товаров.",
        orders: "Заказы",
        ordersText: "Заказы, статусы, контакты клиентов и заметки."
      }
    },
    common: {
      backDashboard: "Вернуться в панель",
      status: "Статус",
      price: "Цена",
      stock: "Склад",
      category: "Категория",
      customer: "Клиент",
      phone: "Телефон",
      address: "Адрес / зона",
      payment: "Оплата",
      total: "Итого",
      note: "Заметка",
      createdAt: "Дата",
      save: "Сохранить",
      update: "Обновить",
      statusLabels: {
        NEW: "Новый",
        TO_CONFIRM: "Нужно подтвердить",
        CONFIRMED: "Подтвержден",
        PREPARING: "Готовится",
        DELIVERED: "Доставлен",
        CANCELLED: "Отменен"
      },
      paymentLabels: {
        CASH_ON_DELIVERY: "Оплата при получении",
        TRANSFER_AFTER_CONFIRMATION: "Перевод после подтверждения"
      },
      productStatusLabels: {
        DRAFT: "Черновик",
        PUBLISHED: "Опубликован",
        HIDDEN: "Скрыт"
      }
    },
    products: {
      title: "Товары",
      text: "Создание, редактирование, публикация, скрытие и удаление товаров доступны прямо здесь.",
      empty: "Товаров пока нет.",
      open: "Открыть товар"
    },
    categories: {
      title: "Категории",
      text: "Создание, редактирование, скрытие и удаление категорий и подкатегорий.",
      empty: "Категорий пока нет."
    },
    stock: {
      title: "Склад",
      text: "Точные остатки видны только администратору, и их можно корректировать здесь.",
      empty: "Нет товаров для отображения.",
      available: "Доступный остаток",
      lowStock: "Низкий остаток",
      outOfStock: "Нет в наличии"
    },
    orders: {
      title: "Заказы",
      text: "Просмотр заказов, изменение статуса и внутренние заметки.",
      empty: "Заказов пока нет.",
      open: "Открыть заказ",
      customerInfo: "Данные клиентки",
      orderedProducts: "Товары в заказе",
      editOrder: "Изменить заказ",
      items: "Товары в заказе",
      noNote: "Нет внутренней заметки."
    }
  }
} as const;
