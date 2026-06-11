// HMAC-signed portal session tokens. Uses Web Crypto so it runs in both
// the Node runtime (API routes) and the middleware runtime.

export const PORTAL_SESSION_COOKIE = 'portal_auth';
export const PORTAL_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
  let binary = '';
  for (const byte of sig) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function createSessionToken(secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + PORTAL_SESSION_MAX_AGE;
  const payload = String(exp);
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined
): Promise<boolean> {
  if (!token || !secret) return false;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = await sign(payload, secret);
  if (signature.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < signature.length; i++) {
    diff |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (diff !== 0) return false;
  const exp = Number.parseInt(payload, 10);
  return Number.isFinite(exp) && exp * 1000 > Date.now();
}
