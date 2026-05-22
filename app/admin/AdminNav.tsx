import Link from "next/link";
import { ru } from "@/lib/i18n/ru";

const links = [
  { href: "/admin", label: ru.admin.dashboard.title },
  { href: "/admin/orders", label: ru.admin.dashboard.sections.orders },
  { href: "/admin/products", label: ru.admin.dashboard.sections.products },
  { href: "/admin/stock", label: ru.admin.dashboard.sections.stock },
  { href: "/admin/categories", label: ru.admin.dashboard.sections.categories }
];

export function AdminNav() {
  return (
    <nav className="admin-nav" aria-label={ru.admin.dashboard.title}>
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
