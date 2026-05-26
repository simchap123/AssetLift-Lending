import scheduledPosts from '@/lib/data/seo-scheduled-posts.json';
import { SEO_ARTIFACT_PATHS } from './config';
import { fetchRepoFile, writeRepoFile } from './github';
import { submitIndexNow } from './indexnow';
import type {
  PublishArtifact,
  PublishResult,
  SeoAuditReport,
  SeoBacklogItem,
  SeoCandidate,
  SeoIdeaItem,
  SeoRunResult,
} from './types';

function stringifyWithTrailingNewline(value: unknown) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function buildArtifacts(params: {
  result: SeoRunResult;
  candidate: SeoCandidate | null;
  audit: SeoAuditReport | null;
  backlog: SeoBacklogItem[];
  ideas: SeoIdeaItem[];
}): PublishArtifact[] {
  const artifacts: PublishArtifact[] = [];

  if (params.audit) {
    artifacts.push({
      path: SEO_ARTIFACT_PATHS.health,
      content: stringifyWithTrailingNewline(params.audit),
      message: `chore(seo): refresh audit health for ${params.result.job}`,
    });
  }

  if (params.backlog.length > 0) {
    artifacts.push({
      path: SEO_ARTIFACT_PATHS.backlog,
      content: stringifyWithTrailingNewline({
        generatedAt: params.result.generatedAt,
        items: params.backlog,
      }),
      message: 'chore(seo): refresh content backlog',
    });
  }

  if (params.ideas.length > 0) {
    artifacts.push({
      path: SEO_ARTIFACT_PATHS.ideas,
      content: stringifyWithTrailingNewline({
        generatedAt: params.result.generatedAt,
        items: params.ideas,
      }),
      message: 'chore(seo): refresh conversion ideas',
    });
  }

  artifacts.push({
    path: SEO_ARTIFACT_PATHS.lastRun,
    content: stringifyWithTrailingNewline({
      generatedAt: params.result.generatedAt,
      job: params.result.job,
      published: params.result.published,
      changedUrls: params.result.changedUrls,
      notes: params.result.notes,
    }),
    message: `chore(seo): record ${params.result.job} run`,
  });

  return artifacts;
}

export async function publishSeoRun(params: {
  result: SeoRunResult;
  candidate: SeoCandidate | null;
  audit: SeoAuditReport | null;
  backlog: SeoBacklogItem[];
  ideas: SeoIdeaItem[];
}): Promise<PublishResult> {
  if (params.result.dryRun || !process.env.SEO_GITHUB_TOKEN || !process.env.SEO_GITHUB_REPO) {
    return {
      mode: 'dry-run',
      committedPaths: [
        ...(params.candidate ? [SEO_ARTIFACT_PATHS.scheduledPosts] : []),
        ...buildArtifacts(params).map((artifact) => artifact.path),
      ],
    };
  }

  const committedPaths: string[] = [];

  if (params.candidate) {
    const currentFile = await fetchRepoFile(SEO_ARTIFACT_PATHS.scheduledPosts);
    const currentPosts = currentFile.content
      ? (JSON.parse(currentFile.content) as typeof scheduledPosts)
      : [];
    const nextPosts = [params.candidate, ...currentPosts];

    await writeRepoFile(
      SEO_ARTIFACT_PATHS.scheduledPosts,
      stringifyWithTrailingNewline(nextPosts),
      `feat(seo): publish ${params.candidate.slug}`,
      currentFile.sha,
    );
    committedPaths.push(SEO_ARTIFACT_PATHS.scheduledPosts);
  }

  for (const artifact of buildArtifacts(params)) {
    const current = await fetchRepoFile(artifact.path);
    await writeRepoFile(artifact.path, artifact.content, artifact.message, current.sha);
    committedPaths.push(artifact.path);
  }

  if (params.result.changedUrls.length > 0) {
    await submitIndexNow(params.result.changedUrls);
  }

  return {
    mode: 'github',
    committedPaths,
  };
}
