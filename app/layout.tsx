import type { Metadata } from "next";
import Link from "next/link";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/.i18n/ru";
import { CartNavLink } from "@/components/cart/CartNavLink";
import "./globals.css";

export const metadata: Metadata = {
  title: ru.brand.name,
  description: ru.brand.metadataDescription
};

export const dynamic = "force-dynamic";

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
              <span className="brand-tagline">{ru.brand.tagline}</span>
            </Link>
            <form className="header-search" action="/search">
              <label className="sr-only" htmlFor="header-search">
                {ru.layout.searchLabel}
              </label>
              <input
                id="header-search"
                name="q"
                placeholder={ru.layout.searchPlaceholder}
                type="search"
              />
            </form>
            <nav className="site-nav" aria-label={ru.layout.mainNav}>
              <Link href="/">{ru.common.home}</Link>
              <CartNavLink />
              <Link href="/privacy">{ru.layout.privacy}</Link>
            </nav>
          </div>

          <details className="category-menu">
            <summary className="category-menu-summary" aria-label={ru.common.categories}>
              <span className="category-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="category-menu-label">{ru.common.categories}</span>
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
