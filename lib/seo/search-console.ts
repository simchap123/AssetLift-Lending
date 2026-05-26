import { createSign } from 'node:crypto';

interface SearchConsoleResult {
  connected: boolean;
  submitted: boolean;
  property: string | null;
  sitemap: string | null;
  message: string;
  status?: number;
}

function getConfig() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const property = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;
  const sitemap = process.env.GOOGLE_SEARCH_CONSOLE_SITEMAP_URL || 'https://www.assetliftlending.com/sitemap.xml';

  if (!clientEmail || !privateKey || !property) {
    return null;
  }

  return { clientEmail, privateKey, property, sitemap };
}

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

async function getAccessToken() {
  const config = getConfig();
  if (!config) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, or GOOGLE_SEARCH_CONSOLE_SITE_URL.',
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: config.clientEmail,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(payload),
  )}`;

  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(config.privateKey, 'base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google OAuth token request failed: ${response.status} ${text}`);
  }

  const json = (await response.json()) as { access_token: string };
  return { accessToken: json.access_token, config };
}

export async function submitSitemapToSearchConsole(): Promise<SearchConsoleResult> {
  const config = getConfig();
  if (!config) {
    return {
      connected: false,
      submitted: false,
      property: null,
      sitemap: null,
      message:
        'Missing Google Search Console service account configuration. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, and GOOGLE_SEARCH_CONSOLE_SITE_URL.',
    };
  }

  try {
    const { accessToken } = await getAccessToken();
    const property = encodeURIComponent(config.property);
    const sitemap = encodeURIComponent(config.sitemap);

    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${property}/sitemaps/${sitemap}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        connected: true,
        submitted: false,
        property: config.property,
        sitemap: config.sitemap,
        message: `Search Console sitemap submission failed: ${response.status} ${text}`,
        status: response.status,
      };
    }

    return {
      connected: true,
      submitted: true,
      property: config.property,
      sitemap: config.sitemap,
      message: 'Sitemap submitted to Google Search Console successfully.',
      status: response.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Search Console error';
    return {
      connected: true,
      submitted: false,
      property: config.property,
      sitemap: config.sitemap,
      message,
    };
  }
}
