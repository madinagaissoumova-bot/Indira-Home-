import Link from "next/link";
import { ru } from "@/lib/i18n/ru";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function AboutPage() {
  return (
    <main className="page collection-page">
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.about.eyebrow}</span>
        <h1>{ru.about.title}</h1>
        <p>{ru.about.intro}</p>
      </section>

      <section className="form-panel privacy-panel">
        <h2>{ru.about.missionTitle}</h2>
        <p>{ru.about.mission}</p>

        <h2>{ru.about.serviceTitle}</h2>
        <p>{ru.about.service}</p>

        <h2>{ru.about.deliveryTitle}</h2>
        <p>{ru.about.delivery}</p>

        <p>{ru.about.contact}</p>
        <Link className="button secondary" href="/">
          {ru.about.cta}
        </Link>
      </section>
      <PublicFooter />
    </main>
  );
}
