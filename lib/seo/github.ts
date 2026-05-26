import { Buffer } from 'node:buffer';

interface GithubFile {
  sha?: string;
  content: string | null;
}

function getGithubConfig() {
  const token = process.env.SEO_GITHUB_TOKEN;
  const repo = process.env.SEO_GITHUB_REPO;
  const branch = process.env.SEO_GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    return null;
  }

  return { token, repo, branch };
}

async function githubRequest(path: string, init: RequestInit = {}) {
  const config = getGithubConfig();
  if (!config) {
    throw new Error('Missing SEO_GITHUB_TOKEN or SEO_GITHUB_REPO.');
  }

  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });

  return { response, config };
}

export async function fetchRepoFile(filePath: string): Promise<GithubFile> {
  const config = getGithubConfig();
  if (!config) {
    throw new Error('Missing SEO_GITHUB_TOKEN or SEO_GITHUB_REPO.');
  }

  const { response } = await githubRequest(
    `/repos/${config.repo}/contents/${encodeURIComponent(filePath).replace(/%2F/g, '/')}` +
      `?ref=${encodeURIComponent(config.branch)}`,
  );

  if (response.status === 404) {
    return { content: null };
  }

  if (!response.ok) {
    throw new Error(`GitHub fetch failed for ${filePath}: ${response.status}`);
  }

  const json = (await response.json()) as { content: string; sha: string };
  const decoded = Buffer.from(json.content.replace(/\n/g, ''), 'base64').toString('utf8');
  return { sha: json.sha, content: decoded };
}

export async function writeRepoFile(filePath: string, content: string, message: string, sha?: string) {
  const config = getGithubConfig();
  if (!config) {
    throw new Error('Missing SEO_GITHUB_TOKEN or SEO_GITHUB_REPO.');
  }

  const { response } = await githubRequest(
    `/repos/${config.repo}/contents/${encodeURIComponent(filePath).replace(/%2F/g, '/')}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message,
        branch: config.branch,
        content: Buffer.from(content, 'utf8').toString('base64'),
        ...(sha ? { sha } : {}),
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub write failed for ${filePath}: ${response.status} ${body}`);
  }
}
