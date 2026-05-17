import Link from "next/link";

const adminSections = [
  {
    title: "Товары",
    text: "Создание, публикация, скрытие и редактирование товаров.",
    href: "/admin/products"
  },
  {
    title: "Категории",
    text: "Управление категориями и подкатегориями каталога.",
    href: "/admin/categories"
  },
  {
    title: "Склад",
    text: "Просмотр и корректировка количества товаров.",
    href: "/admin/stock"
  },
  {
    title: "Заказы",
    text: "Новые заказы, статусы, контакты клиентов и заметки.",
    href: "/admin/orders"
  }
];

export default function AdminPage() {
  return (
    <main className="page">
      <section className="hero hero-compact">
        <span className="eyebrow">Espace admin</span>
        <h1>Панель управления</h1>
        <p>
          Первая структура админки. Следующий шаг: подключить авторизацию и
          реальные действия управления.
        </p>
      </section>

      <div className="admin-grid">
        {adminSections.map((section) => (
          <Link className="admin-panel" href={section.href} key={section.href}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
