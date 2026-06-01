import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

function readDatabaseUrlFromDotEnv() {
  try {
    const env = readFileSync(".env", "utf8");
    const line = env.split(/\n/).find((entry) => entry.startsWith("DATABASE_URL="));
    if (!line) return "";

    return line
      .slice(line.indexOf("=") + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
  } catch {
    return "";
  }
}

const databaseUrl = process.env.DATABASE_URL ?? readDatabaseUrlFromDotEnv();
const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error("Missing command to run after Supabase DATABASE_URL validation.");
  process.exit(1);
}

if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
  console.error(
    [
      "Refusing to run Prisma command.",
      "DATABASE_URL must be a PostgreSQL URL from Supabase.",
      "Current DATABASE_URL is missing or is not PostgreSQL."
    ].join("\n")
  );
  process.exit(1);
}

if (databaseUrl.includes("PASSWORD") || databaseUrl.includes("PROJECT_REF")) {
  console.error("Refusing to run Prisma command with placeholder DATABASE_URL.");
  process.exit(1);
}

const result = spawnSync(command, args, {
  env: {
    ...process.env,
    DATABASE_URL: databaseUrl
  },
  shell: process.platform === "win32",
  stdio: "inherit"
});

process.exit(result.status ?? 1);
