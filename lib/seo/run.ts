import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { SEO_JOBS } from './config';
import { buildAuditReport } from './audit';
import {
  buildBacklog,
  buildIdeas,
  buildIdeasCandidate,
  buildProgrammaticCandidate,
  buildStrategyCandidate,
} from './content';
import { evaluateCandidate } from './guardrails';
import { publishSeoRun } from './publisher';
import type { SeoCandidate, SeoJobName, SeoRunResult } from './types';

function getChangedUrls(candidate: SeoCandidate | null) {
  if (!candidate) {
    return [];
  }

  return [`https://www.assetliftlending.com/blog/${candidate.slug}`, 'https://www.assetliftlending.com/blog'];
}

export async function runSeoJob(job: SeoJobName, options?: { dryRun?: boolean }): Promise<SeoRunResult> {
  const config = SEO_JOBS[job];
  const now = new Date();
  const dryRun = options?.dryRun ?? true;
  const existingSlugs = new Set(BLOG_POSTS.map((post) => post.slug));
  const backlog = buildBacklog();
  const ideas = buildIdeas();
  const audit = job === 'audit' ? buildAuditReport(now) : null;

  let candidate: SeoCandidate | null = null;
  if (job === 'programmatic') {
    candidate = buildProgrammaticCandidate(existingSlugs, now);
  } else if (job === 'strategy') {
    candidate = buildStrategyCandidate(existingSlugs, now);
  } else if (job === 'ideas') {
    candidate = buildIdeasCandidate(existingSlugs, now);
  }

  const guardrails = candidate ? evaluateCandidate(candidate, existingSlugs) : null;
  const published = Boolean(candidate && guardrails?.autoPublish);

  const result: SeoRunResult = {
    job,
    generatedAt: now.toISOString(),
    dryRun,
    candidate,
    guardrails,
    published,
    changedUrls: published ? getChangedUrls(candidate) : [],
    audit,
    backlog,
    ideas,
    notes: [
      `Job label: ${config.label}`,
      `Schedule slot: ${config.scheduleLabel}`,
      `Focus keywords: ${config.keywords.join(', ')}`,
      ...(guardrails?.warnings ?? []),
      ...(!guardrails?.autoPublish && guardrails?.errors ? guardrails.errors : []),
    ],
  };

  await publishSeoRun({
    result,
    candidate: published ? candidate : null,
    audit,
    backlog,
    ideas,
  });

  return result;
}
