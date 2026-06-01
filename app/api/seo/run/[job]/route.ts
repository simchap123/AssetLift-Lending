import { NextRequest } from 'next/server';
import { SEO_JOB_NAMES, type SeoJobName } from '@/lib/seo/types';
import { runSeoJob } from '@/lib/seo/run';

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

function parseJob(job: string): SeoJobName | null {
  return SEO_JOB_NAMES.includes(job as SeoJobName) ? (job as SeoJobName) : null;
}

async function handleRequest(
  request: NextRequest,
  context: { params: Promise<{ job: string }> },
) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;
  const job = parseJob(params.job);
  if (!job) {
    return Response.json({ error: 'Unknown SEO job.' }, { status: 404 });
  }

  const dryRun = isCronRequest(request)
    ? false
    : request.nextUrl.searchParams.get('dryRun') !== 'false';

  try {
    const result = await runSeoJob(job, { dryRun });
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown SEO automation error';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ job: string }> },
) {
  return handleRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ job: string }> },
) {
  return handleRequest(request, context);
}
