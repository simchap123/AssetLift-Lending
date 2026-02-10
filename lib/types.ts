export interface LoanProgram {
  id: string;
  title: string;
  subtitle: string;
  maxLTC?: string;
  maxLTV?: string;
  highlights: string[];
  otherOptions?: string;
  color: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  program: string;
  loanAmount: string;
  arv: string;
  rehabAmount: string;
  propertyAddress: string;
  message: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export interface GeminiResult {
  text: string;
  sources?: GroundingSource[];
}
