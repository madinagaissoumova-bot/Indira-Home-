import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { ru } from "@/lib/i18n/ru";

const homeCollections = [
  {
    title: ru.home.collections.posuda.title,
    text: ru.home.collections.posuda.text,
    href: "/category/posuda",
    image: "/uploads/brand/home-sketch-posuda.png",
    className: "is-posuda"
  },
  {
    title: ru.home.collections.kuhnya.title,
    text: ru.home.collections.kuhnya.text,
    href: "/category/kuhnya",
    image: "/uploads/brand/home-strict-kuhnya.png",
    className: "is-kuhnya"
  },
  {
    title: ru.home.collections.tehnika.title,
    text: ru.home.collections.tehnika.text,
    href: "/category/bytovaya-tehnika",
    image: "/uploads/brand/home-strict-tehnika-smeg-logo.png",
    className: "is-tehnika"
  },
  {
    title: ru.home.collections.dekor.title,
    text: ru.home.collections.dekor.text,
    href: "/category/dekor",
    image: "/uploads/brand/home-sketch-dekor.png",
    className: "is-dekor"
  }
];

export default async function HomePage() {
  return (
    <main className="page home-page">
      <section className="hero-home-editorial">
        <div className="home-hero-media" aria-hidden="true">
          <Image
            alt=""
            className="home-hero-photo"
            fill
            priority
            sizes="100vw"
            src="/uploads/brand/home-sketch-hero.png"
          />
        </div>
        <div className="hero-copy">
          <h1>
            {ru.home.heroTitle.split("\n").map((line, index, lines) => (
              <Fragment key={line}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </h1>
          <p>{ru.home.description}</p>
          <div className="hero-actions">
            <Link className="button" href="/category/posuda">
              {ru.home.openCollection}
            </Link>
          </div>
        </div>
      </section>

      <section className="home-collection-stack" aria-label={ru.home.collectionsLabel}>
        {homeCollections.map((collection) => (
          <Link
            className={`home-collection-panel ${collection.className}`}
            href={collection.href}
            key={collection.href}
          >
            <div className="home-collection-copy">
              <h2>{collection.title}</h2>
              <p>{collection.text}</p>
              <span aria-hidden="true">→</span>
            </div>
            <Image
              alt=""
              className="home-collection-image"
              fill
              sizes="100vw"
              src={collection.image}
            />
          </Link>
        ))}
      </section>

      <section className="home-benefit-strip" aria-label={ru.home.benefitsLabel}>
        <div>
          <span aria-hidden="true">♢</span>
          <p>{ru.home.benefits.qualityTitle}</p>
          <small>{ru.home.benefits.qualityText}</small>
        </div>
        <div>
          <span aria-hidden="true">▱</span>
          <p>{ru.home.benefits.deliveryTitle}</p>
          <small>{ru.home.benefits.deliveryText}</small>
        </div>
        <div>
          <span aria-hidden="true">□</span>
          <p>{ru.home.benefits.paymentTitle}</p>
          <small>{ru.home.benefits.paymentText}</small>
        </div>
        <div>
          <span aria-hidden="true">○</span>
          <p>{ru.home.benefits.supportTitle}</p>
          <small>{ru.home.benefits.supportText}</small>
        </div>
      </section>
    </main>
  );
}
