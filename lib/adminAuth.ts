import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { compare } from "bcryptjs";

const ADMIN_COOKIE_NAME = "indira_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type AdminSessionPayload = {
  username: string;
  exp: number;
};

function getAdminConfig() {
  return {
    username: process.env.ADMIN_USERNAME,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
    sessionSecret: process.env.ADMIN_SESSION_SECRET
  };
}

export function getMissingAdminAuthEnvVars() {
  const config = getAdminConfig();
  const missing: string[] = [];

  if (!config.username) missing.push("ADMIN_USERNAME");
  if (!config.passwordHash) missing.push("ADMIN_PASSWORD_HASH");
  if (!config.sessionSecret) missing.push("ADMIN_SESSION_SECRET");

  return missing;
}

export function isAdminAuthConfigured() {
  return getMissingAdminAuthEnvVars().length === 0;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function encodeSession(payload: AdminSessionPayload, secret: string) {
  const value = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${value}.${sign(value, secret)}`;
}

function decodeSession(token: string, secret: string): AdminSessionPayload | null {
  const [value, signature] = token.split(".");
  if (!value || !signature) return null;

  const expected = sign(value, secret);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    if (!payload || typeof payload.username !== "string" || typeof payload.exp !== "number") {
      return null;
    }
    if (payload.exp <= Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();
  if (!config.username || !config.passwordHash || !config.sessionSecret) return false;
  if (username !== config.username) return false;

  return compare(password, config.passwordHash);
}

export async function createAdminSession(username: string) {
  const config = getAdminConfig();
  if (!config.sessionSecret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }

  const cookieStore = await cookies();
  const token = encodeSession(
    {
      username,
      exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
    },
    config.sessionSecret
  );

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

export async function getAdminSession() {
  const config = getAdminConfig();
  if (!config.sessionSecret) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;

  return decodeSession(token, config.sessionSecret);
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
