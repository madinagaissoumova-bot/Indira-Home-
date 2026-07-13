import Link from "next/link";
import { ru } from "@/lib/i18n/ru";

export default function NotFound() {
  return (
    <main className="page">
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.notFound.eyebrow}</span>
        <h1>{ru.notFound.title}</h1>
        <p>{ru.notFound.text}</p>
      </section>
      <Link className="button" href="/">
        {ru.common.backToCatalog}
      </Link>
    </main>
  );
}
