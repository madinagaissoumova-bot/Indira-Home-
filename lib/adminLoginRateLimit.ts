const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_RATE_LIMIT_LOCK_MS = 10 * 60 * 1000;
const LOGIN_RATE_LIMIT_MAX_FAILURES = 5;

type LoginAttemptRecord = {
  failedAttempts: number;
  firstFailedAt: number;
  lockedUntil: number | null;
};

type LoginRateLimitState = {
  isLimited: boolean;
  retryAfterSeconds: number;
};

const attempts = new Map<string, LoginAttemptRecord>();

function keyForIdentifier(identifier: string) {
  return identifier.trim().toLowerCase();
}

function getActiveRecord(identifier: string, now: number) {
  const key = keyForIdentifier(identifier);
  const record = attempts.get(key);

  if (!record) return { key, record: null };

  const lockExpired = record.lockedUntil != null && record.lockedUntil <= now;
  const windowExpired = now - record.firstFailedAt > LOGIN_RATE_LIMIT_WINDOW_MS;

  if (lockExpired || (record.lockedUntil == null && windowExpired)) {
    attempts.delete(key);
    return { key, record: null };
  }

  return { key, record };
}

export function getAdminLoginRateLimitState(identifier: string, now = Date.now()): LoginRateLimitState {
  const { record } = getActiveRecord(identifier, now);

  if (!record?.lockedUntil || record.lockedUntil <= now) {
    return { isLimited: false, retryAfterSeconds: 0 };
  }

  return {
    isLimited: true,
    retryAfterSeconds: Math.ceil((record.lockedUntil - now) / 1000)
  };
}

export function recordFailedAdminLogin(identifier: string, now = Date.now()) {
  const { key, record } = getActiveRecord(identifier, now);
  const nextRecord: LoginAttemptRecord = record ?? {
    failedAttempts: 0,
    firstFailedAt: now,
    lockedUntil: null
  };

  nextRecord.failedAttempts += 1;

  if (nextRecord.failedAttempts >= LOGIN_RATE_LIMIT_MAX_FAILURES) {
    nextRecord.lockedUntil = now + LOGIN_RATE_LIMIT_LOCK_MS;
  }

  attempts.set(key, nextRecord);

  return getAdminLoginRateLimitState(identifier, now);
}

export function clearAdminLoginRateLimit(identifier: string) {
  attempts.delete(keyForIdentifier(identifier));
}

export function resetAdminLoginRateLimitsForTests() {
  attempts.clear();
}
