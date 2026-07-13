import { ru } from "@/lib/i18n/ru";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ConfirmationClient } from "./ConfirmationClient";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function ConfirmationPage() {
  return (
    <main className="page collection-page">
      <Breadcrumbs
        items={[
          { label: ru.common.catalog, href: "/" },
          { label: ru.common.cart, href: "/cart" },
          { label: ru.confirmation.breadcrumb }
        ]}
      />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.confirmation.eyebrow}</span>
        <h1>{ru.confirmation.title}</h1>
        <p>{ru.confirmation.message}</p>
      </section>

      <ConfirmationClient />
      <PublicFooter />
    </main>
  );
}
