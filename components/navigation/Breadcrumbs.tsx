import Link from "next/link";
import { ru } from "@/lib/i18n/ru";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label={ru.common.pageNavigation} className="breadcrumbs">
      {items.map((item, index) => (
        <span className="breadcrumbs-item" key={`${item.label}-${index}`}>
          {item.href ? (
            <Link className="breadcrumbs-link" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumbs-current">{item.label}</span>
          )}
          {index < items.length - 1 ? <span className="breadcrumbs-separator">/</span> : null}
        </span>
      ))}
    </nav>
  );
}
