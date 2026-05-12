import Link from "next/link";

export default function CartPage() {
  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Корзина</span>
        <h1>Ваша корзина</h1>
        <p>Корзина будет подключена после каталога и карточки товара.</p>
      </section>
      <div className="empty-state">
        <p>Ваша корзина пуста.</p>
        <Link className="button" href="/">
          Вернуться в каталог
        </Link>
      </div>
    </main>
  );
}
