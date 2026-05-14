import Link from "next/link";

export default async function ConfirmationPage({
  searchParams
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Заказ отправлен</span>
        <h1>Спасибо за заказ</h1>
        <p>
          Ваш заказ отправлен. Магазин свяжется с вами по телефону или WhatsApp,
          чтобы подтвердить детали.
        </p>
      </section>

      <div className="empty-state">
        {order ? <p>Номер заказа: {order}</p> : null}
        <p>WhatsApp магазина: +7 988 906-41-06</p>
        <Link className="button" href="/">
          Вернуться в каталог
        </Link>
      </div>
    </main>
  );
}
