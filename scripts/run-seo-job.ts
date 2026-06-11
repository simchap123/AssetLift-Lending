/**
 * CLI runner for SEO automation jobs, used by GitHub Actions.
 * Usage: npx tsx scripts/run-seo-job.ts <audit|programmatic|strategy|ideas|authority>
 *
 * Publishing requires SEO_GITHUB_TOKEN and SEO_GITHUB_REPO. In GitHub Actions
 * the built-in GITHUB_TOKEN is passed as SEO_GITHUB_TOKEN, so no personal
 * access token is needed. Set SEO_DRY_RUN=true to preview without committing.
 */
import { runSeoJob } from '../lib/seo/run';
import { runAuthorityJob } from '../lib/seo/authority';
import { SEO_JOB_NAMES, type SeoJobName } from '../lib/seo/types';

const job = process.argv[2];
const dryRun = process.env.SEO_DRY_RUN === 'true';

async function main() {
  if (job === 'authority') {
    const result = await runAuthorityJob({ dryRun });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (!SEO_JOB_NAMES.includes(job as SeoJobName)) {
    console.error(`Unknown job "${job}". Valid: ${[...SEO_JOB_NAMES, 'authority'].join(', ')}`);
    process.exit(1);
  }

  const result = await runSeoJob(job as SeoJobName, { dryRun });
  console.log(
    JSON.stringify(
      {
        job: result.job,
        dryRun: result.dryRun,
        published: result.published,
        candidate: result.candidate?.slug ?? null,
        changedUrls: result.changedUrls,
        notes: result.notes,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error('SEO job failed:', err);
  process.exit(1);
});
