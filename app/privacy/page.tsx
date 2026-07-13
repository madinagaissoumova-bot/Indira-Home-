import Link from "next/link";
import { ru } from "@/lib/i18n/ru";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function PrivacyPage() {
  return (
    <main className="page collection-page">
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.privacy.eyebrow}</span>
        <h1>{ru.privacy.title}</h1>
        <p>{ru.privacy.intro}</p>
      </section>

      <section className="form-panel privacy-panel">
        <h2>{ru.privacy.collectedTitle}</h2>
        <p>{ru.privacy.collected}</p>

        <h2>{ru.privacy.usageTitle}</h2>
        <p>{ru.privacy.usage}</p>

        <h2>{ru.privacy.protectionTitle}</h2>
        <p>{ru.privacy.protection}</p>

        <p>{ru.privacy.contact}</p>
        <Link className="button secondary" href="/">
          {ru.common.backToCatalog}
        </Link>
      </section>
      <PublicFooter />
    </main>
  );
}
