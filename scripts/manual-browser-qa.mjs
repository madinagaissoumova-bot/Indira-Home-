import fs from "node:fs/promises";
import path from "node:path";
import { createHmac } from "node:crypto";
import { chromium } from "playwright";
import { PrismaClient } from "@prisma/client";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:3000";
const screenshotDir = process.env.QA_SCREENSHOT_DIR || "/private/tmp/indira-browser-qa";
const prisma = new PrismaClient();

function getBaseUrl() {
  return new URL(baseUrl);
}

function loadEnvFile() {
  return fs
    .readFile(".env", "utf8")
    .then((content) => {
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
        const index = trimmed.indexOf("=");
        const key = trimmed.slice(0, index).trim();
        let value = trimmed.slice(index + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        process.env[key] ||= value;
      }
    })
    .catch(() => {});
}

function sign(value, secret) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function createAdminCookieValue() {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_SESSION_SECRET) {
    throw new Error("Admin env vars are missing");
  }
  const payload = Buffer.from(
    JSON.stringify({
      username: process.env.ADMIN_USERNAME,
      exp: Date.now() + 1000 * 60 * 60
    })
  ).toString("base64url");

  return `${payload}.${sign(payload, process.env.ADMIN_SESSION_SECRET)}`;
}

async function checkLayout(page, label) {
  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const width = window.innerWidth;
    const offenders = Array.from(document.querySelectorAll("body *"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      })
      .filter((item) => item.width > 0 && (item.right > width + 2 || item.left < -2))
      .slice(0, 8);

    return {
      viewportWidth: width,
      documentScrollWidth: doc.scrollWidth,
      hasHorizontalOverflow: doc.scrollWidth > width + 2,
      offenders
    };
  });

  return { label, ...result };
}

async function screenshot(page, name) {
  const filePath = path.join(screenshotDir, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}

async function visit(page, route, name) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  const title = await page.title();
  const layout = await checkLayout(page, name);
  const shot = await screenshot(page, name);
  return { name, route, title, layout, screenshot: shot };
}

async function getSeedTargets() {
  const product = await prisma.product.findFirst({
    where: {
      status: "PUBLISHED",
      stockQuantity: { gt: 0 },
      category: { status: "VISIBLE" },
      subcategory: { status: "VISIBLE" }
    },
    orderBy: { displayOrder: "asc" },
    include: { category: true, subcategory: true }
  });

  const order = await prisma.order.findFirst({
    orderBy: { createdAt: "desc" }
  });

  if (!product) throw new Error("No public orderable product found");

  return { product, order };
}

async function run() {
  await loadEnvFile();
  await fs.mkdir(screenshotDir, { recursive: true });

  const { product, order } = await getSeedTargets();
  const browser = await chromium.launch({ headless: true });
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobile.newPage();

  const checks = [];
  checks.push(await visit(mobilePage, "/", "mobile-home"));
  checks.push(await visit(mobilePage, `/category/${product.category.slug}`, "mobile-category"));
  checks.push(await visit(mobilePage, `/subcategory/${product.subcategory.slug}`, "mobile-subcategory"));
  checks.push(await visit(mobilePage, `/search?q=${encodeURIComponent(product.name.slice(0, 6))}`, "mobile-search"));
  checks.push(await visit(mobilePage, `/product/${product.slug}`, "mobile-product"));

  const addButton = mobilePage
    .getByRole("button", { name: /добавить|в корзину|корзин/i })
    .first();
  if (await addButton.count()) {
    await addButton.click();
    await mobilePage.waitForTimeout(350);
  }

  checks.push(await visit(mobilePage, "/cart", "mobile-cart"));
  checks.push(await visit(mobilePage, "/checkout", "mobile-checkout"));
  checks.push(await visit(mobilePage, "/checkout/confirmation", "mobile-confirmation"));
  checks.push(await visit(mobilePage, "/privacy", "mobile-privacy"));

  const confirmationText = await mobilePage.locator("body").innerText();
  const publicContactValues = new Set(["+7 988 906-41-06", "79889064106"]);
  const orderPersonalData = order
    ? [order.customerName, order.deliveryAddressOrZone, order.customerPhone]
        .filter(Boolean)
        .filter((value) => !publicContactValues.has(value))
    : [];
  const confirmationLeaks = {
    checkedAgainstOrderData: Boolean(orderPersonalData.length),
    leakedOrderPersonalData: orderPersonalData.filter((value) => confirmationText.includes(value))
  };

  const admin = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  await admin.addCookies([
    {
      name: "indira_admin_session",
      value: createAdminCookieValue(),
      domain: getBaseUrl().hostname,
      path: "/admin",
      httpOnly: true,
      sameSite: "Lax",
      secure: getBaseUrl().protocol === "https:",
      expires: Math.floor(Date.now() / 1000) + 60 * 60
    }
  ]);
  const adminPage = await admin.newPage();

  const adminChecks = [];
  adminChecks.push(await visit(adminPage, "/admin", "admin-dashboard"));
  adminChecks.push(await visit(adminPage, "/admin/products", "admin-products"));
  adminChecks.push(await visit(adminPage, `/admin/products/${product.id}`, "admin-product-detail"));
  adminChecks.push(await visit(adminPage, "/admin/categories", "admin-categories"));
  adminChecks.push(await visit(adminPage, "/admin/stock", "admin-stock"));
  adminChecks.push(await visit(adminPage, "/admin/orders", "admin-orders"));
  if (order) {
    adminChecks.push(await visit(adminPage, `/admin/orders/${order.id}`, "admin-order-detail"));
  }

  const blocked = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const blockedPage = await blocked.newPage();
  await blockedPage.goto(`${baseUrl}/admin`, { waitUntil: "networkidle" });
  const protectionUrl = blockedPage.url();
  await screenshot(blockedPage, "admin-protection-redirect");

  await browser.close();
  await prisma.$disconnect();

  const allChecks = [...checks, ...adminChecks];
  const failedLayouts = allChecks.filter((check) => check.layout.hasHorizontalOverflow);

  const report = {
    baseUrl,
    screenshotDir,
    product: {
      id: product.id,
      slug: product.slug,
      category: product.category.slug,
      subcategory: product.subcategory.slug
    },
    order: order ? { id: order.id, orderNumber: order.orderNumber } : null,
    mobileChecks: checks,
    adminChecks,
    protection: {
      expectedLoginRedirect: protectionUrl.includes("/admin/login"),
      finalUrl: protectionUrl
    },
    confirmationLeaks,
    failedLayouts
  };

  console.log(JSON.stringify(report, null, 2));

  if (failedLayouts.length > 0) {
    process.exitCode = 1;
  }
  if (!report.protection.expectedLoginRedirect) {
    process.exitCode = 1;
  }
  if (confirmationLeaks.leakedOrderPersonalData.length > 0) {
    process.exitCode = 1;
  }
}

run().catch(async (error) => {
  await prisma.$disconnect();
  console.error(error);
  process.exit(1);
});
