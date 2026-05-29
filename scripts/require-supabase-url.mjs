import { spawnSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL ?? "";
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
  shell: process.platform === "win32",
  stdio: "inherit"
});

process.exit(result.status ?? 1);
