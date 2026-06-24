export type DealStatus =
  | 'submitted'
  | 'under_review'
  | 'term_sheet_issued'
  | 'docs_required'
  | 'closing'
  | 'funded'
  | 'declined';

export type LoanType = 'fix-flip' | 'dscr-rental' | 'bridge' | 'ground-up' | 'commercial';

export interface Deal {
  id: string;
  brokerName?: string;
  brokerCompany?: string;
  brokerEmail?: string;
  brokerPhone?: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  loanType: LoanType;
  propertyAddress: string;
  purchasePrice: number;
  loanAmount?: number;
  arv?: number;
  rehabAmount?: number;
  creditScore: string;
  flipsCompleted?: string;
  status: DealStatus;
  submittedAt: string;
  updatedAt: string;
  notes?: string;
  termSheetUrl?: string;
  termSheetName?: string;
  termSheetSize?: number;
  termSheetIssuedAt?: string;
}

export const STATUS_PIPELINE: DealStatus[] = [
  'submitted',
  'under_review',
  'term_sheet_issued',
  'docs_required',
  'closing',
  'funded',
];

export const STATUS_CONFIG: Record<DealStatus, { label: string; color: string; dot: string }> = {
  submitted:          { label: 'Submitted',          color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',     dot: 'bg-blue-400' },
  under_review:       { label: 'Under Review',        color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400' },
  term_sheet_issued:  { label: 'Term Sheet Issued',   color: 'bg-purple-500/15 text-purple-400 border-purple-500/30', dot: 'bg-purple-400' },
  docs_required:      { label: 'Docs Required',       color: 'bg-orange-500/15 text-orange-400 border-orange-500/30', dot: 'bg-orange-400' },
  closing:            { label: 'Closing',             color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' },
  funded:             { label: 'Funded',              color: 'bg-green-500/15 text-green-500 border-green-500/30',   dot: 'bg-green-500' },
  declined:           { label: 'Declined',            color: 'bg-red-500/15 text-red-400 border-red-500/30',        dot: 'bg-red-400' },
};

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  'fix-flip':    'Fix & Flip',
  'dscr-rental': 'DSCR Rental',
  'bridge':      'Bridge',
  'ground-up':   'Ground-Up',
  'commercial':  'Commercial',
};
