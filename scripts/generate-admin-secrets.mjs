import { randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import process from "node:process";

const require = createRequire(import.meta.url);
const { hash } = require("bcryptjs");

const MIN_PASSWORD_LENGTH = 12;
const BCRYPT_ROUNDS = 12;

function printHelp() {
  console.log(
    [
      "Generate Indira Home admin production values.",
      "",
      "Usage:",
      "  npm run admin:generate-secrets",
      "",
      "Optional environment variables:",
      "  ADMIN_USERNAME   Admin login to print, defaults to admin.",
      "  ADMIN_PASSWORD   Non-interactive password source.",
      "",
      "The script does not write files. Copy the output into Vercel Production variables."
    ].join("\n")
  );
}

function isHelpRequested() {
  return process.argv.includes("--help") || process.argv.includes("-h");
}

function promptHidden(label) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdout.isTTY || !process.stdin.setRawMode) {
      reject(new Error("Interactive password input requires a TTY. Use ADMIN_PASSWORD for automation."));
      return;
    }

    let value = "";
    const stdin = process.stdin;

    function cleanup() {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.off("data", onData);
    }

    function onData(buffer) {
      const text = buffer.toString("utf8");

      if (text === "\u0003") {
        cleanup();
        process.stdout.write("\n");
        reject(new Error("Cancelled."));
        return;
      }

      if (text === "\r" || text === "\n") {
        cleanup();
        process.stdout.write("\n");
        resolve(value);
        return;
      }

      if (text === "\u007f") {
        value = value.slice(0, -1);
        return;
      }

      if (/^[\x20-\x7E]+$/.test(text)) {
        value += text;
      }
    }

    process.stdout.write(label);
    stdin.resume();
    stdin.setEncoding("utf8");
    stdin.setRawMode(true);
    stdin.on("data", onData);
  });
}

async function readAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;

  const first = await promptHidden("Production admin password: ");
  const second = await promptHidden("Confirm production admin password: ");

  if (first !== second) {
    throw new Error("Passwords do not match.");
  }

  return first;
}

async function main() {
  if (isHelpRequested()) {
    printHelp();
    return;
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = await readAdminPassword();

  if (adminPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Admin password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  const passwordHash = await hash(adminPassword, BCRYPT_ROUNDS);
  const sessionSecret = randomBytes(48).toString("base64url");

  console.log(
    [
      "",
      "Copy these values into Vercel Production environment variables:",
      "",
      `ADMIN_USERNAME=${adminUsername}`,
      `ADMIN_PASSWORD_HASH=${passwordHash}`,
      `ADMIN_SESSION_SECRET=${sessionSecret}`,
      "",
      "Do not commit these values. Do not paste them into .env.example or docs."
    ].join("\n")
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
