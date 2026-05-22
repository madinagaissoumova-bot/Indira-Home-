export type AdminCategoryOption = {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
    categoryId: string;
  }[];
};

export type AdminProductEditorProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceRub: number;
  stockQuantity: number;
  status: string;
  isNew: boolean;
  brand: string | null;
  characteristics: string | null;
  displayOrder: number;
  categoryId: string;
  subcategoryId: string;
  images: { url: string; alt: string }[];
};

export type AdminCategoryManagerItem = {
  id: string;
  name: string;
  slug: string;
  status: string;
  displayOrder: number;
  products: { id: string }[];
  subcategories: {
    id: string;
    name: string;
    slug: string;
    status: string;
    displayOrder: number;
    products: { id: string }[];
  }[];
};

export type AdminStockProductItem = {
  id: string;
  name: string;
  slug: string;
  stockQuantity: number;
  status: string;
  category: { name: string };
  subcategory: { name: string };
};

export type AdminOrderItem = {
  id: string;
  productNameSnapshot: string;
  quantity: number;
  subtotalRub: number;
};

export type AdminOrderEditorOrder = {
  id: string;
  orderNumber: string;
  status: string;
  totalRub: number;
  customerName: string;
  customerPhone: string;
  deliveryAddressOrZone: string;
  paymentMethod: string;
  adminNote: string | null;
  items: AdminOrderItem[];
};
