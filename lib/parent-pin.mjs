// Client-side parental friction only. This cannot protect against someone with browser/devtools access.
const ITERATIONS = 180000;
const bytesToHex = bytes => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
const hexToBytes = hex => Uint8Array.from(hex.match(/../g) || [], value => parseInt(value, 16));

async function derive(pin, salt, iterations = ITERATIONS) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(pin), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: hexToBytes(salt), iterations }, key, 256
  );
  return bytesToHex(new Uint8Array(bits));
}

export async function createPinRecord(pin) {
  if (!/^\d{4}$/.test(pin)) throw new Error("PIN must contain four digits");
  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
  return { salt, hash: await derive(pin, salt), iterations: ITERATIONS };
}

export async function verifyPinRecord(pin, record) {
  if (!record || !/^\d{4}$/.test(pin) || !/^[0-9a-f]{32}$/.test(record.salt || "") ||
      !/^[0-9a-f]{64}$/.test(record.hash || "")) return false;
  const hash = await derive(pin, record.salt, record.iterations || ITERATIONS);
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ record.hash.charCodeAt(i);
  return diff === 0;
}

export function remainingPinLockMs(attempts, now = Date.now()) {
  return Math.max(0, Number(attempts?.lockedUntil || 0) - now);
}

export function recordFailedPin(attempts, now = Date.now()) {
  if (remainingPinLockMs(attempts, now)) return attempts;
  const count = (Number(attempts?.count) || 0) + 1;
  return count >= 5 ? { count: 0, lockedUntil: now + 60000 } : { count, lockedUntil: 0 };
}
