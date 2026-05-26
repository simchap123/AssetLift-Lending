import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { CITIES } from '@/lib/data/cities';
import { COMPARISONS } from '@/lib/data/comparisons';
import { STATES } from '@/lib/data/states';
import { SEO_CORE_PAGE_TARGETS } from './config';
import type { SeoAuditFinding, SeoAuditReport } from './types';

function hasFaqDepth() {
  const faqHeavyPosts = BLOG_POSTS.filter((post) => post.faqs.length >= 3).length;
  return faqHeavyPosts / Math.max(1, BLOG_POSTS.length);
}

export function buildAuditReport(date: Date): SeoAuditReport {
  const findings: SeoAuditFinding[] = [];
  const blogCount = BLOG_POSTS.length;

  if (blogCount < 60) {
    findings.push({
      severity: 'high',
      issue: 'Blog depth is still thin for a competitive lending market.',
      evidence: `Current blog count is ${blogCount} posts across all categories.`,
      fix: 'Keep compounding education, comparison, and market-intent coverage with scheduled publishing.',
    });
  }

  if (CITIES.length < 40) {
    findings.push({
      severity: 'medium',
      issue: 'City coverage is limited relative to the market opportunity.',
      evidence: `Current city page count is ${CITIES.length}.`,
      fix: 'Expand city-level coverage only when each page can stay meaningfully unique.',
    });
  }

  if (hasFaqDepth() < 0.8) {
    findings.push({
      severity: 'medium',
      issue: 'Not enough posts include strong FAQ support for long-tail capture.',
      evidence: `Only ${Math.round(hasFaqDepth() * 100)}% of posts have 3 or more FAQs.`,
      fix: 'Require at least 3 FAQs for all newly generated SEO content.',
    });
  }

  findings.push({
    severity: 'low',
    issue: 'Cron timings are UTC-based and will shift by one hour when Eastern Time moves off DST.',
    evidence: 'Vercel cron schedules are defined in UTC rather than America/New_York.',
    fix: 'Review cron timing at the next DST boundary or move scheduling to an ET-aware worker.',
  });

  const score = Math.max(55, 100 - findings.reduce((total, finding) => {
    if (finding.severity === 'high') return total + 15;
    if (finding.severity === 'medium') return total + 8;
    return total + 3;
  }, 0));

  return {
    generatedAt: date.toISOString(),
    score,
    summary:
      score >= 80
        ? 'SEO foundation is healthy. The next gains come from compounding content, internal links, and distribution.'
        : 'SEO foundation is workable, but coverage depth and content breadth still need to scale.',
    findings,
    totals: {
      blogPosts: blogCount,
      comparisons: COMPARISONS.length,
      states: STATES.length,
      cities: CITIES.length,
      corePages: SEO_CORE_PAGE_TARGETS.length,
    },
  };
}
