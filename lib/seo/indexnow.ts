import { SEO_BASE_URL } from './config';

export async function submitIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || urls.length === 0) {
    return { submitted: false, reason: 'Missing key or URLs.' };
  }

  const payload = {
    host: new URL(SEO_BASE_URL).host,
    key,
    keyLocation: `${SEO_BASE_URL}/${key}.txt`,
    urlList: urls,
  };

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  return {
    submitted: response.ok,
    status: response.status,
  };
}
