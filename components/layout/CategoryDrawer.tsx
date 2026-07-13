"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CartNavLink } from "@/components/cart/CartNavLink";
import { FavoritesNavLink } from "@/components/favorites/FavoritesNavLink";
import { PhoneIcon } from "@/components/layout/PublicIcons";
import { ru } from "@/lib/i18n/ru";

type DrawerSubcategory = {
  id: string;
  name: string;
  slug: string;
};

type DrawerCategory = {
  id: string;
  name: string;
  slug: string;
  subcategories: DrawerSubcategory[];
};

type CategoryDrawerProps = {
  categories: DrawerCategory[];
};

export function CategoryDrawer({ categories }: CategoryDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.classList.add("has-category-drawer");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("has-category-drawer");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function closeDrawer() {
    setIsOpen(false);
  }

  return (
    <div className="category-drawer-root">
      <button
        aria-controls={titleId}
        aria-expanded={isOpen}
        aria-label={ru.common.categories}
        className="category-menu-summary"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span className="category-menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="category-menu-label">{ru.common.catalog}</span>
      </button>

      {isOpen ? (
        <div className="category-drawer-layer">
          <button className="category-drawer-backdrop" onClick={closeDrawer} type="button" aria-label={ru.common.closeMenu} />
          <aside className="category-drawer" aria-labelledby={titleId} aria-modal="true" role="dialog">
            <div className="category-drawer-head">
              <Link className="brand" href="/" onClick={closeDrawer}>
                <span className="brand-mark">Indira</span>
                <span className="brand-home">Home</span>
                <span className="brand-tagline">{ru.brand.tagline}</span>
              </Link>
              <button className="category-drawer-close" onClick={closeDrawer} type="button" aria-label={ru.common.closeMenu}>
                ×
              </button>
            </div>

            <nav className="category-drawer-nav" aria-label={ru.common.categories}>
              <details className="category-drawer-group" open>
                <summary id={titleId}>
                  <span aria-hidden="true">▣</span>
                  {ru.common.catalog}
                </summary>
                <div className="category-drawer-categories">
                  {categories.map((category) => (
                    <div className="category-drawer-category" key={category.id}>
                      <Link href={`/category/${category.slug}`} onClick={closeDrawer}>
                        {category.name}
                      </Link>
                      {category.subcategories.length > 0 ? (
                        <div>
                          {category.subcategories.slice(0, 4).map((subcategory) => (
                            <Link href={`/subcategory/${subcategory.slug}`} key={subcategory.id} onClick={closeDrawer}>
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </details>

              <Link href="/search?new=1" onClick={closeDrawer}>
                <span aria-hidden="true">☆</span>
                {ru.common.new}
              </Link>
              <Link href="/search?sort=price-asc" onClick={closeDrawer}>
                <span aria-hidden="true">◇</span>
                {ru.common.sale}
              </Link>
              <Link href="/search?sort=new-first" onClick={closeDrawer}>
                <span aria-hidden="true">♢</span>
                {ru.common.bestsellers}
              </Link>
            </nav>

            <nav className="category-drawer-secondary" aria-label={ru.layout.mainNav}>
              <Link href="/about" onClick={closeDrawer}>
                <span aria-hidden="true">ⓘ</span>
                {ru.layout.about}
              </Link>
              <a href="https://wa.me/79889064106" target="_blank" rel="noreferrer" onClick={closeDrawer}>
                <span aria-hidden="true"><PhoneIcon /></span>
                {ru.common.contacts}
              </a>
              <FavoritesNavLink onNavigate={closeDrawer} />
              <CartNavLink />
            </nav>

            <div className="category-drawer-contact">
              <a href="https://wa.me/79889064106" target="_blank" rel="noreferrer" onClick={closeDrawer}>
                <PhoneIcon />
                {ru.common.contactUs}
              </a>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
