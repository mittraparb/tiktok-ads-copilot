import "server-only";

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const KEY_BYTE_LENGTH = 32;
const IV_BYTE_LENGTH = 12;
const AUTH_TAG_BYTE_LENGTH = 16;

export type TokenEncryptionConfigResult =
  | { ok: true; key: Buffer }
  | { ok: false; issues: string[] };

export function getTokenEncryptionConfig(): TokenEncryptionConfigResult {
  const rawKey = process.env.TOKEN_ENCRYPTION_KEY?.trim();

  if (!rawKey) {
    return {
      ok: false,
      issues: ["TOKEN_ENCRYPTION_KEY is missing."],
    };
  }

  const key = parseEncryptionKey(rawKey);

  if (!key) {
    return {
      ok: false,
      issues: [
        "TOKEN_ENCRYPTION_KEY must decode to 32 bytes. Use base64:<32-byte-base64>, hex:<64-hex-chars>, or a raw 32-character secret.",
      ],
    };
  }

  return { ok: true, key };
}

export function encryptSecret(plaintext: string, key: Buffer) {
  const iv = randomBytes(IV_BYTE_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_BYTE_LENGTH,
  });
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    "v1",
    iv.toString("base64url"),
    authTag.toString("base64url"),
    ciphertext.toString("base64url"),
  ].join(":");
}

export function decryptSecret(encryptedValue: string, key: Buffer) {
  const [version, ivValue, authTagValue, ciphertextValue] =
    encryptedValue.split(":");

  if (
    version !== "v1" ||
    !ivValue ||
    !authTagValue ||
    !ciphertextValue
  ) {
    throw new Error("Unsupported encrypted token format.");
  }

  const iv = Buffer.from(ivValue, "base64url");
  const authTag = Buffer.from(authTagValue, "base64url");
  const ciphertext = Buffer.from(ciphertextValue, "base64url");

  const decipher = createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_BYTE_LENGTH,
  });
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString("utf8");
}

function parseEncryptionKey(rawKey: string) {
  const prefixedKey = parsePrefixedKey(rawKey);

  if (prefixedKey) {
    return prefixedKey.length === KEY_BYTE_LENGTH ? prefixedKey : undefined;
  }

  if (/^[a-f0-9]{64}$/i.test(rawKey)) {
    return Buffer.from(rawKey, "hex");
  }

  const base64Key = tryDecodeBase64(rawKey);

  if (base64Key?.length === KEY_BYTE_LENGTH) {
    return base64Key;
  }

  const rawBytes = Buffer.from(rawKey, "utf8");

  return rawBytes.length === KEY_BYTE_LENGTH ? rawBytes : undefined;
}

function parsePrefixedKey(rawKey: string) {
  if (rawKey.startsWith("base64:")) {
    return tryDecodeBase64(rawKey.slice("base64:".length));
  }

  if (rawKey.startsWith("hex:")) {
    const hexValue = rawKey.slice("hex:".length);

    if (!/^[a-f0-9]+$/i.test(hexValue)) {
      return undefined;
    }

    return Buffer.from(hexValue, "hex");
  }

  return undefined;
}

function tryDecodeBase64(value: string) {
  try {
    return Buffer.from(value, "base64url");
  } catch {
    return undefined;
  }
}
