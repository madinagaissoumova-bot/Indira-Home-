"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ru } from "@/lib/i18n/ru";
import { logoutAdmin } from "./actions";

const adminNavItems = [
  { label: ru.admin.nav.dashboard, href: "/admin" },
  { label: ru.admin.nav.products, href: "/admin/products" },
  { label: ru.admin.nav.categories, href: "/admin/categories" },
  { label: ru.admin.nav.orders, href: "/admin/orders" },
  { label: ru.admin.nav.clients, disabled: true },
  { label: ru.admin.nav.stock, href: "/admin/stock" },
  { label: ru.admin.nav.settings, disabled: true }
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <nav className="admin-nav" aria-label={ru.admin.nav.label}>
      <div className="admin-nav-brand">
        <strong>{ru.brand.name}</strong>
        <span>{ru.admin.nav.panel}</span>
      </div>

      <div className="admin-nav-links">
        {adminNavItems.map((item) =>
          item.disabled || !item.href ? (
            <span aria-disabled="true" className="admin-nav-link is-disabled" key={item.label}>
              {item.label}
            </span>
          ) : (
            <Link
              aria-current={isActive(item.href) ? "page" : undefined}
              className="admin-nav-link"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          )
        )}
      </div>

      <form action={logoutAdmin} className="admin-nav-logout">
        <button type="submit">{ru.admin.dashboard.logout}</button>
      </form>
    </nav>
  );
}
