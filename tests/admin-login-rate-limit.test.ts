import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import {
  clearAdminLoginRateLimit,
  getAdminLoginRateLimitState,
  recordFailedAdminLogin,
  resetAdminLoginRateLimitsForTests
} from "@/lib/adminLoginRateLimit";

describe("admin login rate limit", () => {
  beforeEach(() => {
    resetAdminLoginRateLimitsForTests();
  });

  it("limits an identifier after repeated failed login attempts", () => {
    const now = 1_000_000;

    for (let attempt = 1; attempt < 5; attempt += 1) {
      const state = recordFailedAdminLogin("Admin", now + attempt);
      assert.equal(state.isLimited, false);
    }

    const state = recordFailedAdminLogin(" admin ", now + 5);

    assert.equal(state.isLimited, true);
    assert.equal(state.retryAfterSeconds, 600);
  });

  it("expires the temporary lock after the lock window", () => {
    const now = 1_000_000;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      recordFailedAdminLogin("admin", now + attempt);
    }

    assert.equal(getAdminLoginRateLimitState("admin", now + 5).isLimited, true);
    assert.equal(getAdminLoginRateLimitState("admin", now + 10 * 60 * 1000 + 5).isLimited, false);
  });

  it("clears failures after a successful login", () => {
    const now = 1_000_000;

    recordFailedAdminLogin("admin", now);
    recordFailedAdminLogin("admin", now + 1);
    clearAdminLoginRateLimit("admin");

    assert.equal(getAdminLoginRateLimitState("admin", now + 2).isLimited, false);

    for (let attempt = 1; attempt < 5; attempt += 1) {
      assert.equal(recordFailedAdminLogin("admin", now + attempt).isLimited, false);
    }
  });
});
