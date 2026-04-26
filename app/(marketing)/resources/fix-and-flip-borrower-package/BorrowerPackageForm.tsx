'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Download,
  FileText,
  Mail,
  Send,
  ShieldCheck,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { sendFormNotification } from '@/services/notificationService';

type UploadField =
  | 'llcDocumentsFile'
  | 'purchaseContractFile'
  | 'governmentIdFile'
  | 'scopeOfWorkFile'
  | 'recentExperienceFile'
  | 'bankStatementFile';

interface BorrowerPackageFormValues {
  name: string;
  email: string;
  phone: string;
  purchasePrice: string;
  arv: string;
  rehabAmount: string;
  propertyAddress: string;
  titleContact: string;
  insuranceContact: string;
  ssnLast4: string;
  appraisalPaymentStatus: string;
  notes: string;
}

const DOWNLOADS = [
  { label: 'Rehab List Template', href: '/forms/rehab-list-template-multi-unit.xlsx' },
  { label: 'Track Record Example', href: '/forms/track-record-example.xlsx' },
];

const UPLOAD_FIELDS: Array<{ key: UploadField; label: string; description: string }> = [
  {
    key: 'llcDocumentsFile',
    label: 'LLC Documents',
    description: 'Operating agreement, entity docs, EIN letter, or your cleanest entity package.',
  },
  {
    key: 'purchaseContractFile',
    label: 'Purchase Contract',
    description: 'Executed contract or the cleanest purchase paperwork you have.',
  },
  {
    key: 'governmentIdFile',
    label: 'Government-Issued ID',
    description: 'Driver’s license or passport for the borrower or signer.',
  },
  {
    key: 'scopeOfWorkFile',
    label: 'Scope of Work',
    description: 'Upload your rehab scope, budget, or completed rehab list template.',
  },
  {
    key: 'recentExperienceFile',
    label: 'Recent Experience / REO',
    description: 'Track record, completed flip history, or recent project summary.',
  },
  {
    key: 'bankStatementFile',
    label: 'Bank Statement',
    description: 'Recent liquidity support for down payment, reserves, or capital support.',
  },
];

const EMPTY_FORM: BorrowerPackageFormValues = {
  name: '',
  email: '',
  phone: '',
  purchasePrice: '',
  arv: '',
  rehabAmount: '',
  propertyAddress: '',
  titleContact: '',
  insuranceContact: '',
  ssnLast4: '',
  appraisalPaymentStatus: '',
  notes: '',
};

function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, '');
  const char: Record<number, string> = { 0: '(', 3: ') ', 6: '-' };
  let formatted = '';
  for (let i = 0; i < numbers.length && i < 10; i++) {
    formatted += (char[i] || '') + numbers[i];
  }
  return formatted;
}

function formatCurrency(value: string) {
  const raw = value.replace(/\D/g, '');
  return raw ? Number(raw).toLocaleString('en-US') : '';
}

export default function BorrowerPackageForm() {
  const [form, setForm] = useState<BorrowerPackageFormValues>(EMPTY_FORM);
  const [files, setFiles] = useState<Record<UploadField, File | null>>({
    llcDocumentsFile: null,
    purchaseContractFile: null,
    governmentIdFile: null,
    scopeOfWorkFile: null,
    recentExperienceFile: null,
    bankStatementFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const maxUploadBytes = 10 * 1024 * 1024;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Fix & Flip Borrower Package',
    description:
      'A resource page where fix and flip borrowers can download templates and upload the main documents needed for deal review.',
    url: 'https://www.assetliftlending.com/resources/fix-and-flip-borrower-package',
    about: ['Fix and flip loans', 'Borrower package', 'Hard money lending documents'],
  };

  const handleChange = (key: keyof BorrowerPackageFormValues, value: string) => {
    let nextValue = value;
    if (key === 'phone') nextValue = formatPhone(value);
    if (key === 'purchasePrice' || key === 'arv' || key === 'rehabAmount') {
      nextValue = formatCurrency(value);
    }
    if (key === 'ssnLast4') nextValue = value.replace(/\D/g, '').slice(0, 4);
    setForm((prev) => ({ ...prev, [key]: nextValue }));
  };

  const handleFileChange = (field: UploadField, file: File | null) => {
    if (file && file.size > maxUploadBytes) {
      toast({
        title: 'File too large',
        description: `${file.name} is larger than 10MB. Please upload a smaller file or email it instead.`,
        variant: 'destructive',
      });
      return;
    }
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.purchasePrice || !form.propertyAddress) {
      toast({
        title: 'Missing required fields',
        description: 'Please complete the required borrower and property information first.',
        variant: 'destructive',
      });
      return false;
    }
    if (!form.titleContact || !form.insuranceContact) {
      toast({
        title: 'Missing required contacts',
        description: 'Please include the title contact and insurance contact.',
        variant: 'destructive',
      });
      return false;
    }
    if (form.ssnLast4 && form.ssnLast4.length < 4) {
      toast({
        title: 'SSN last 4 incomplete',
        description: 'Enter the last 4 digits only, or leave it blank for follow-up.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const totalAttachmentSize = Object.values(files).reduce(
      (sum, file) => sum + (file?.size || 0),
      0,
    );

    if (totalAttachmentSize > 20 * 1024 * 1024) {
      toast({
        title: 'Attachments too large',
        description: 'Please keep total uploads under 20MB or email the package instead.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = new FormData();
      submission.append('type', 'form');
      submission.append('name', form.name);
      submission.append('email', form.email);
      submission.append('phone', form.phone);
      submission.append('program', 'fix-flip-borrower-package');
      submission.append('loanPurpose', 'purchase');
      submission.append('contactMethod', 'email');
      submission.append('loanAmount', form.purchasePrice);
      submission.append('arv', form.arv);
      submission.append('rehabAmount', form.rehabAmount);
      submission.append('propertyAddress', form.propertyAddress);
      submission.append('titleContact', form.titleContact);
      submission.append('insuranceContact', form.insuranceContact);
      submission.append('ssnLast4', form.ssnLast4);
      submission.append('appraisalPaymentStatus', form.appraisalPaymentStatus);
      submission.append('message', form.notes);

      for (const [key, file] of Object.entries(files) as Array<[UploadField, File | null]>) {
        if (file) {
          submission.append(key, file);
        }
      }

      const success = await sendFormNotification(submission);

      if (!success) {
        toast({
          title: 'Submission Error',
          description: 'Please try again or email info@assetliftlending.com directly.',
          variant: 'destructive',
        });
        return;
      }

      setIsSubmitted(true);
      toast({
        title: 'Borrower package submitted',
        description: 'We received the package and will review it shortly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Resources' },
            { label: 'Fix & Flip Borrower Package' },
          ]}
        />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  Fix &amp; Flip Resource
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                  Borrower Package Upload
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Use this page to send the main documents for a fix and flip review. If you do
                  not want to upload online, download the templates and email the package instead.
                </p>

                <div className="rounded-3xl border border-border bg-card p-6 md:p-8 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                    Download templates
                  </p>
                  <div className="space-y-3">
                    {DOWNLOADS.map((doc) => (
                      <a
                        key={doc.href}
                        href={doc.href}
                        download
                        className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                      >
                        <span>{doc.label}</span>
                        <Download className="h-4 w-4 text-primary" />
                      </a>
                    ))}
                    <a
                      href="mailto:info@assetliftlending.com?subject=Fix%20%26%20Flip%20Borrower%20Package"
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                    >
                      <span>Email package instead</span>
                      <Mail className="h-4 w-4 text-primary" />
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-secondary/20 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <p className="font-semibold">Security note</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Do not submit a full SSN or full credit card details through this form. Use
                    the last 4 of SSN only. Appraisal payment is handled separately after review.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Borrower Package Received</h2>
                    <p className="text-muted-foreground mb-6">
                      We received your fix and flip borrower package and will review it shortly.
                    </p>
                    <Button asChild>
                      <Link href="/loans/fix-and-flip">Back to Fix &amp; Flip Loans</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Borrower Information</h2>
                      <p className="text-sm text-muted-foreground">
                        Fill out the basics, then upload the supporting files you already have.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyAddress">Property Address *</Label>
                        <Input id="propertyAddress" value={form.propertyAddress} onChange={(e) => handleChange('propertyAddress', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purchasePrice">Purchase Price *</Label>
                        <Input id="purchasePrice" value={form.purchasePrice} onChange={(e) => handleChange('purchasePrice', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="arv">Projected ARV</Label>
                        <Input id="arv" value={form.arv} onChange={(e) => handleChange('arv', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rehabAmount">Rehab Amount</Label>
                        <Input id="rehabAmount" value={form.rehabAmount} onChange={(e) => handleChange('rehabAmount', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ssnLast4">SSN Last 4</Label>
                        <Input id="ssnLast4" value={form.ssnLast4} onChange={(e) => handleChange('ssnLast4', e.target.value)} maxLength={4} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titleContact">Title Contact *</Label>
                        <Input id="titleContact" value={form.titleContact} onChange={(e) => handleChange('titleContact', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="insuranceContact">Insurance Contact *</Label>
                        <Input id="insuranceContact" value={form.insuranceContact} onChange={(e) => handleChange('insuranceContact', e.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="appraisalPaymentStatus">Credit Card for Appraisal</Label>
                        <Select value={form.appraisalPaymentStatus} onValueChange={(value) => handleChange('appraisalPaymentStatus', value)}>
                          <SelectTrigger id="appraisalPaymentStatus">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ready-now">Ready to provide on request</SelectItem>
                            <SelectItem value="needs-follow-up">Need follow-up from AssetLift</SelectItem>
                            <SelectItem value="already-on-file">Already provided separately</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Upload Documents</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        {UPLOAD_FIELDS.map((field) => (
                          <div key={field.key} className="rounded-2xl border border-border bg-background p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <Label htmlFor={field.key}>{field.label}</Label>
                            </div>
                            <Input
                              id={field.key}
                              type="file"
                              onChange={(e) => handleFileChange(field.key, e.target.files?.[0] ?? null)}
                              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                            />
                            <p className="text-xs text-muted-foreground">{field.description}</p>
                            {files[field.key] && (
                              <p className="text-xs text-primary">Attached: {files[field.key]?.name}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        rows={5}
                        value={form.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        placeholder="Anything we should know about the timeline, experience, exit strategy, title, or insurance."
                      />
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/15 p-5 text-sm text-muted-foreground">
                      This resource is for business-purpose investment property financing only.
                      Do not submit a full SSN or full credit card information through this form.
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-full py-7 text-lg glow-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : (
                        <>
                          Submit Borrower Package
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
