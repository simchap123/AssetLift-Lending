import { NextRequest } from 'next/server';
import { runAuthorityJob } from '@/lib/seo/authority';

export const runtime = 'nodejs';

function isAuthorized(request: NextRequest) {
  if (request.headers.get('x-vercel-cron')) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  const secret = process.env.SEO_AUTOMATION_SECRET;
  if (secret && authHeader === `Bearer ${secret}`) {
    return true;
  }

  return process.env.NODE_ENV !== 'production';
}

function isCronRequest(request: NextRequest) {
  return Boolean(request.headers.get('x-vercel-cron'));
}

async function handleRequest(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dryRun = isCronRequest(request)
    ? false
    : request.nextUrl.searchParams.get('dryRun') !== 'false';

  try {
    const result = await runAuthorityJob({ dryRun });
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown authority automation error';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}
