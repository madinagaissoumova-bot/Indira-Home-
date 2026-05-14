import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indira Home",
  description: "Каталог товаров для дома Indira Home"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            Indira Home
          </Link>
          <nav className="site-nav" aria-label="Главная навигация">
            <Link href="/">Каталог</Link>
            <Link href="/cart">Корзина</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
