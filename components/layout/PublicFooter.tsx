import Link from "next/link";
import { ru } from "@/lib/i18n/ru";
import {
  DeliveryIcon,
  PaymentIcon,
  QualityIcon,
  SupportIcon
} from "@/components/layout/PublicIcons";

export function PublicServiceStrip() {
  return (
    <section className="public-service-strip" aria-label={ru.home.benefitsLabel}>
      <div>
        <DeliveryIcon className="public-service-icon" />
        <strong>{ru.footer.deliveryTitle}</strong>
        <small>{ru.footer.deliveryText}</small>
      </div>
      <div>
        <PaymentIcon className="public-service-icon" />
        <strong>{ru.footer.paymentTitle}</strong>
        <small>{ru.footer.paymentText}</small>
      </div>
      <div>
        <QualityIcon className="public-service-icon" />
        <strong>{ru.footer.qualityTitle}</strong>
        <small>{ru.footer.qualityText}</small>
      </div>
      <div>
        <SupportIcon className="public-service-icon" />
        <strong>{ru.footer.supportTitle}</strong>
        <small>{ru.footer.supportText}</small>
      </div>
    </section>
  );
}

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-brand">
        <Link className="brand" href="/">
          <span className="brand-mark">Indira</span>
          <span className="brand-home">Home</span>
          <span className="brand-tagline">{ru.brand.tagline}</span>
        </Link>
        <p>{ru.footer.brandText}</p>
        <div className="public-socials" aria-label={ru.footer.contacts}>
          <a href="https://wa.me/79889064106" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>

      <div>
        <h2>{ru.footer.catalogTitle}</h2>
        <Link href="/category/posuda">{ru.home.collections.posuda.title}</Link>
        <Link href="/category/kuhnya">{ru.home.collections.kuhnya.title}</Link>
        <Link href="/category/bytovaya-tehnika">{ru.home.collections.tehnika.title}</Link>
        <Link href="/category/dekor">{ru.home.collections.dekor.title}</Link>
        <Link href="/search?new=1">{ru.common.new}</Link>
      </div>

      <div>
        <h2>{ru.footer.buyersTitle}</h2>
        <Link href="/about">{ru.footer.deliveryAndPayment}</Link>
        <Link href="/privacy">{ru.footer.privacy}</Link>
        <a href="https://wa.me/79889064106" target="_blank" rel="noreferrer">{ru.footer.faq}</a>
      </div>

      <div>
        <h2>{ru.footer.aboutTitle}</h2>
        <Link href="/about">{ru.footer.aboutCompany}</Link>
        <a href="https://wa.me/79889064106" target="_blank" rel="noreferrer">{ru.common.contacts}</a>
      </div>

      <form className="public-newsletter" action="/search">
        <h2>{ru.common.search}</h2>
        <p>{ru.search.intro}</p>
        <label className="sr-only" htmlFor="footer-search">{ru.layout.searchLabel}</label>
        <div>
          <input id="footer-search" name="q" placeholder={ru.catalog.searchPlaceholder} type="search" />
          <button type="submit" aria-label={ru.common.search}>→</button>
        </div>
      </form>
    </footer>
  );
}
