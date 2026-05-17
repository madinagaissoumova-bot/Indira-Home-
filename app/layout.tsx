import type { Metadata } from "next";
import Link from "next/link";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { CartNavLink } from "@/components/CartNavLink";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indira Home",
  description: "Каталог товаров для дома Indira Home"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await prisma.category.findMany({
    where: { status: VISIBILITY_STATUS.visible },
    orderBy: { displayOrder: "asc" },
    include: {
      subcategories: {
        where: { status: VISIBILITY_STATUS.visible },
        orderBy: { displayOrder: "asc" }
      }
    }
  });

  return (
    <html lang="ru">
      <body>
        <header className="site-header">
          <div className="site-header-top">
            <Link className="brand" href="/">
              <span className="brand-mark">Indira</span>
              <span className="brand-home">Home</span>
              <span className="brand-tagline">посуда и декор для дома</span>
            </Link>
            <form className="header-search" action="/search">
              <label className="sr-only" htmlFor="header-search">
                Поиск товара
              </label>
              <input
                id="header-search"
                name="q"
                placeholder="Поиск по товарам"
                type="search"
              />
            </form>
            <nav className="site-nav" aria-label="Основные страницы">
              <Link href="/">Главная</Link>
              <CartNavLink />
              <Link href="/checkout">Заказ</Link>
            </nav>
          </div>

          <details className="category-menu">
            <summary className="category-menu-summary" aria-label="Категории">
              <span className="category-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="category-menu-label">Категории</span>
            </summary>
            <div className="category-menu-panel">
              {categories.map((category) => (
                <div className="category-menu-group" key={category.id}>
                  <Link className="category-menu-link" href={`/category/${category.slug}`}>
                    {category.name}
                  </Link>
                  <div className="category-menu-subcategories">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        className="category-menu-subcategory"
                        href={`/subcategory/${subcategory.slug}`}
                        key={subcategory.id}
                      >
                        <span aria-hidden="true">→</span>
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </header>
        {children}
      </body>
    </html>
  );
}
