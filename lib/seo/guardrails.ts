import type { SeoCandidate, SeoGuardrailResult } from './types';
import { SEO_RESTRICTED_PHRASES } from './config';

function countInternalLinks(candidate: SeoCandidate) {
  return candidate.sections.reduce((total, section) => {
    const matches = section.content.match(/href="\/[^"]+"/g);
    return total + (matches?.length ?? 0);
  }, 0);
}

export function evaluateCandidate(candidate: SeoCandidate, existingSlugs: Set<string>): SeoGuardrailResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (existingSlugs.has(candidate.slug)) {
    errors.push(`Slug already exists: ${candidate.slug}`);
  }

  if (candidate.sections.length < 4) {
    errors.push('Candidate needs at least 4 sections.');
  }

  if (candidate.faqs.length < 3) {
    errors.push('Candidate needs at least 3 FAQs.');
  }

  if (candidate.description.length < 120 || candidate.description.length > 180) {
    warnings.push('Meta description is outside the preferred 120-180 character range.');
  }

  if (countInternalLinks(candidate) < 2) {
    errors.push('Candidate needs at least 2 internal links.');
  }

  const normalizedText = [
    candidate.title,
    candidate.description,
    ...candidate.sections.map((section) => `${section.heading} ${section.content}`),
    ...candidate.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]
    .join(' ')
    .toLowerCase();

  for (const phrase of SEO_RESTRICTED_PHRASES) {
    if (normalizedText.includes(phrase.toLowerCase())) {
      errors.push(`Restricted phrase detected: ${phrase}`);
    }
  }

  const score = Math.max(0, 100 - errors.length * 30 - warnings.length * 10);

  return {
    autoPublish: errors.length === 0,
    score,
    errors,
    warnings,
  };
}
