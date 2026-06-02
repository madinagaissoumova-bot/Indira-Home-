"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ru } from "@/lib/i18n/ru";
import { logoutAdmin } from "./actions";

const links = [
  { href: "/admin", label: ru.admin.dashboard.title },
  { href: "/admin/orders", label: ru.admin.dashboard.sections.orders },
  { href: "/admin/products", label: ru.admin.dashboard.sections.products },
  { href: "/admin/stock", label: ru.admin.dashboard.sections.stock },
  { href: "/admin/categories", label: ru.admin.dashboard.sections.categories }
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label={ru.admin.dashboard.title}>
      {links.map((link) => {
        const isActive = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);

        return (
          <Link aria-current={isActive ? "page" : undefined} href={link.href} key={link.href}>
            {link.label}
          </Link>
        );
      })}
      <form action={logoutAdmin} className="admin-nav-logout">
        <button type="submit">{ru.admin.dashboard.logout}</button>
      </form>
    </nav>
  );
}
