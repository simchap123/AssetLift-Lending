import type { BlogPost } from '@/lib/data/blog-posts';

export const SEO_JOB_NAMES = ['audit', 'programmatic', 'strategy', 'ideas'] as const;

export type SeoJobName = (typeof SEO_JOB_NAMES)[number];

export interface SeoJobConfig {
  slug: SeoJobName;
  label: string;
  scheduleLabel: string;
  keywords: string[];
}

export interface SeoCandidate extends BlogPost {
  sourceJob: SeoJobName;
  focusKeyword: string;
  publishReason: string;
}

export interface SeoGuardrailResult {
  autoPublish: boolean;
  score: number;
  errors: string[];
  warnings: string[];
}

export interface SeoBacklogItem {
  title: string;
  keyword: string;
  intent: 'informational' | 'commercial' | 'local' | 'conversion';
  targetPath: string;
  reason: string;
}

export interface SeoIdeaItem {
  page: string;
  angle: string;
  cta: string;
  reason: string;
}

export interface SeoAuditFinding {
  severity: 'high' | 'medium' | 'low';
  issue: string;
  evidence: string;
  fix: string;
}

export interface SeoAuditReport {
  generatedAt: string;
  score: number;
  summary: string;
  findings: SeoAuditFinding[];
  totals: {
    blogPosts: number;
    comparisons: number;
    states: number;
    cities: number;
    corePages: number;
  };
}

export interface PublishArtifact {
  path: string;
  content: string;
  message: string;
}

export interface PublishResult {
  mode: 'dry-run' | 'github';
  committedPaths: string[];
}

export interface SeoRunResult {
  job: SeoJobName;
  generatedAt: string;
  dryRun: boolean;
  candidate: SeoCandidate | null;
  guardrails: SeoGuardrailResult | null;
  published: boolean;
  changedUrls: string[];
  audit: SeoAuditReport | null;
  backlog: SeoBacklogItem[];
  ideas: SeoIdeaItem[];
  notes: string[];
}
