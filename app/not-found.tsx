import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <section className="hero hero-compact">
        <span className="eyebrow">404</span>
        <h1>Страница не найдена</h1>
        <p>Товар или раздел недоступен.</p>
      </section>
      <Link className="button" href="/">
        Вернуться в каталог
      </Link>
    </main>
  );
}
