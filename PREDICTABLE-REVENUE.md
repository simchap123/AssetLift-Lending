# Predictable Revenue Report — AssetLift Lending

**Date:** February 12, 2026
**NMLS#:** 1324403
**Framework:** Aaron Ross / Predictable Revenue methodology

---

## Current Score: 2 / 10

| Dimension | Score | Notes |
|-----------|-------|-------|
| Role Specialization | 0/10 | No separation of prospecting vs closing |
| Outbound Process (Spears) | 0/10 | No Cold Calling 2.0, no SDR function |
| Inbound Engine (Nets) | 3/10 | SEO foundation exists, 4 blog posts, AI chatbot |
| Referral Engine (Seeds) | 0/10 | No referral program, no NPS, no post-close process |
| CRM & Pipeline Tracking | 1/10 | Leads go to email inbox, no pipeline visibility |
| Conversion Tracking | 1/10 | GA installed but no event tracking on forms/chat |
| Email Nurture | 0/10 | No follow-up sequences after application |
| Pipeline Predictability | 0/10 | Cannot forecast revenue 30, 60, or 90 days out |

---

## Lead Type Analysis

```mermaid
pie title Current Lead Source Mix
    "Nets (Inbound/SEO)" : 85
    "Seeds (Referrals)" : 10
    "Spears (Outbound)" : 5
```

**Target mix at maturity (Month 12):**

```mermaid
pie title Target Lead Source Mix (Month 12)
    "Nets (Inbound/SEO)" : 40
    "Seeds (Referrals)" : 35
    "Spears (Outbound)" : 25
```

Seeds (referrals from funded borrowers) should become the largest source over time — they convert at 3-5x the rate of cold leads and cost almost nothing.

---

## Revenue Pipeline Math

### Assumptions

| Metric | Value |
|--------|-------|
| Average loan size | $450,000 |
| Origination fee | 2 points (2%) |
| **Revenue per funded loan** | **$9,000** |
| Application-to-funded rate | 20% |
| Website visitor-to-application rate | 5% |
| Outbound response rate (Cold Calling 2.0) | 10% |
| Outbound response-to-application rate | 15% |
| Referral-to-application rate | 40% |

### Year 1 Revenue Model

```
 Annual Revenue Goal           $540,000
 ÷ Revenue per loan              $9,000
 ────────────────────────────────────────
 Loans needed                        60  (5 per month)
 ÷ Win rate                         20%
 ────────────────────────────────────────
 Applications needed                300  (25 per month)
```

### How to Get 25 Applications / Month

| Channel | Monthly Volume | Conversion | Applications |
|---------|---------------|------------|-------------|
| **Nets** (SEO + content + chatbot) | 2,000 visitors | 5% | 10 |
| **Spears** (Cold Calling 2.0) | 1,500 emails | 10% respond → 15% apply | 8 |
| **Seeds** (referrals from funded deals) | 18 referral asks | 40% | 7 |
| **Total** | | | **25** |

```mermaid
flowchart LR
    subgraph NETS["Nets (Inbound)"]
        SEO[SEO + Blog\n2,000 visitors/mo] --> SITE[Website]
        CALC[Calculators] --> SITE
        ADS[Paid Ads] --> SITE
        SITE -->|5% convert| APP1[10 Applications]
    end

    subgraph SPEARS["Spears (Outbound)"]
        LIST[Target List\n1,500 contacts/mo] --> EMAIL[Cold Calling 2.0\nReferral Emails]
        EMAIL -->|10% respond| RESP[150 Responses]
        RESP -->|15% apply| APP2[8 Applications]
    end

    subgraph SEEDS["Seeds (Referrals)"]
        FUNDED[Funded Borrowers] -->|Ask for referral| REF[18 Referrals/mo]
        REF -->|40% apply| APP3[7 Applications]
    end

    APP1 --> PIPE[Pipeline\n25 Apps/Month]
    APP2 --> PIPE
    APP3 --> PIPE
    PIPE -->|20% close| DEALS[5 Funded Loans/Month\n$45,000 Revenue]
```

---

## Sales Funnel — Full Journey

```mermaid
flowchart TD
    A["AWARENESS\nVisitor lands on site\n2,000+ / month"] --> B

    B["INTEREST\nViews loan product page,\nuses calculator, reads blog\n800 / month"] --> C

    C["CAPTURE\nSubmits application form\nor gives email to chatbot\n100 / month"] --> D

    D["QUALIFY\nSDR/you calls within 2 hrs\nANUM qualification\n50 qualified / month"] --> E

    E["TERM SHEET\nAE/you issues term sheet,\nborrower reviews and signs\n25 term sheets / month"] --> F

    F["FUNDED\nLoan closes, wire sent\n5 loans / month"]

    F --> G["POST-CLOSE\nAsk for referral 48 hrs\nNPS survey 7 days\nNurture for next deal"]

    G -->|"Referral loop"| C

    style A fill:#f9f9f9,stroke:#333
    style C fill:#fef3c7,stroke:#d97706
    style F fill:#d1fae5,stroke:#059669
    style G fill:#dbeafe,stroke:#2563eb
```

---

## Cold Calling 2.0 — Outbound Playbook

### Ideal Customer Profile (ICP)

| Attribute | Target |
|-----------|--------|
| **Who** | Real estate investors doing 2+ deals/year |
| **Deal size** | $100K – $5M per asset |
| **Strategy** | Fix and flip, BRRRR, rental portfolios, new construction |
| **Geography** | 46 U.S. states (exclude AK, ND, SD, VT) |
| **Where to find** | BiggerPockets, LinkedIn, REI meetups, title companies, real estate agents |
| **Pain points** | Slow bank financing, need to close fast, need higher leverage |

### The Referral Email Sequence

```mermaid
sequenceDiagram
    participant SDR as SDR / You
    participant VP as VP or Senior Contact
    participant DM as Decision Maker
    participant AE as AE / You

    Note over SDR: Day 1
    SDR->>VP: Referral email asking\nwho handles capital
    Note over SDR: Day 3
    SDR->>VP: Follow-up bump

    VP->>DM: Forwards email

    DM->>SDR: That is me, what do you offer?

    Note over SDR: Within 2 hours
    SDR->>DM: Qualify with ANUM

    SDR->>AE: Handoff with notes

    AE->>DM: Discovery call then Term sheet then Fund
```

### Email Templates

**Day 1 — Referral Email**

> **Subject:** Quick question
>
> Hi [Name],
>
> I'm not sure if you're the right person, but I was hoping you could point me in the right direction.
>
> We're a direct private lender that funds fix and flip, DSCR, and bridge loans — typically closing in 7-10 days with up to 90% LTC.
>
> Do you work with any investors who could use a fast, reliable capital source?
>
> Thanks,
> [Your name]
> AssetLift Lending | NMLS# 1324403

**Day 3 — Follow-Up**

> Hi [Name],
>
> Just bumping this up — would you happen to know the right person to talk to about investment financing at [Company/Group]?
>
> Thanks,
> [Your name]

**Day 7 — Different Angle**

> Hi [Name],
>
> One more try — we just funded a $650K fix and flip in [their state] in 8 days. If you know any investors looking for that kind of speed, I would love an introduction.
>
> [Your name]

**Day 14 — Break-Up Email**

> Hi [Name],
>
> Have not heard back — no worries at all. Should I close your file, or would it make sense to connect?
>
> [Your name]

---

## Role Specialization Plan

### Current State (1-Person Team)

```mermaid
flowchart LR
    YOU[You] --> P[Prospect]
    YOU --> Q[Qualify]
    YOU --> C[Close]
    YOU --> S[Service]
    style YOU fill:#fee2e2,stroke:#dc2626
```

**Problem:** Everything depends on one person. Pipeline is feast-or-famine.

### Phase 1 — Time Blocking (Now)

| Time Block | Mon | Tue | Wed | Thu | Fri |
|------------|-----|-----|-----|-----|-----|
| 8-10 AM | Prospect | Prospect | Prospect | Prospect | Prospect |
| 10-12 PM | Qualify | Close | Qualify | Close | Qualify |
| 1-3 PM | Close | Close | Close | Close | Seeds/Referrals |
| 3-5 PM | Content/SEO | Follow-ups | Content/SEO | Follow-ups | Review metrics |

### Phase 2 — First Hire: Virtual SDR (Month 3-4)

```mermaid
flowchart LR
    VA[Virtual SDR\n$10-15/hr\n20 hrs/week] --> P[Prospect\nCold Calling 2.0]
    VA --> Q[Initial Qualify]
    VA -->|Handoff| YOU[You\nAE + CSM]
    YOU --> C[Close Deals]
    YOU --> S[Post-Close\nReferral Asks]

    style VA fill:#dbeafe,stroke:#2563eb
    style YOU fill:#d1fae5,stroke:#059669
```

**Cost:** ~$800-1,200/month
**Expected output:** 10-20 qualified opportunities/month

### Phase 3 — Full Team (Month 8-12)

```mermaid
flowchart LR
    SDR[SDR\nFull-time] --> QUAL[Qualify\nANUM]
    MDR[MDR\nInbound Leads] --> QUAL
    QUAL -->|Qualified opps| AE[AE / You\nClose Deals]
    AE -->|Funded| CSM[CSM / Automated\nNurture + Referrals]
    CSM -->|Referrals| SDR

    style SDR fill:#dbeafe,stroke:#2563eb
    style MDR fill:#fef3c7,stroke:#d97706
    style AE fill:#d1fae5,stroke:#059669
    style CSM fill:#ede9fe,stroke:#7c3aed
```

---

## ANUM Qualification Framework

```mermaid
flowchart TD
    LEAD[New Lead] --> A{Authority?\nDecision maker?}
    A -->|Yes| N{Need?\nSpecific deal?}
    A -->|No| NURTURE[Add to nurture\nsequence]
    N -->|Yes| U{Urgency?\nUnder 30 days?}
    N -->|No| NURTURE
    U -->|Yes| M{Money?\nEquity ready?}
    U -->|No| WARM[Warm lead\nfollow up monthly]
    M -->|Yes| QUALIFIED["QUALIFIED\nIssue term sheet\nwithin 24 hours"]
    M -->|No| EDUCATE[Educate on\nrequirements\ncheck back 2 weeks]

    style QUALIFIED fill:#d1fae5,stroke:#059669,stroke-width:3px
    style NURTURE fill:#fee2e2,stroke:#dc2626
    style WARM fill:#fef3c7,stroke:#d97706
```

| Criteria | Questions to Ask | Green Light | Red Flag |
|----------|-----------------|-------------|----------|
| **Authority** | Are you the one making the financing decision? | Decision maker, entity owner | Just looking for a friend |
| **Need** | Do you have a property under contract? | Contract signed, address known | Just browsing, no deal |
| **Urgency** | When do you need to close? | Within 30 days, competing offer | Sometime this year |
| **Money** | Do you have the down payment ready? | Proof of funds available | No cash reserves |

---

## 12-Month Revenue Forecast

| Month | Nets | Spears | Seeds | Total Apps | Loans Funded | Monthly Revenue |
|-------|------|--------|-------|------------|-------------|----------------|
| 1 | 5 | 0 | 0 | 5 | 1 | $9,000 |
| 2 | 7 | 2 | 0 | 9 | 2 | $18,000 |
| 3 | 8 | 4 | 1 | 13 | 3 | $27,000 |
| 4 | 10 | 6 | 2 | 18 | 4 | $36,000 |
| 5 | 11 | 7 | 2 | 20 | 4 | $36,000 |
| 6 | 13 | 8 | 3 | 24 | 5 | $45,000 |
| 7 | 14 | 8 | 4 | 26 | 5 | $45,000 |
| 8 | 16 | 9 | 5 | 30 | 6 | $54,000 |
| 9 | 17 | 9 | 5 | 31 | 6 | $54,000 |
| 10 | 18 | 10 | 6 | 34 | 7 | $63,000 |
| 11 | 19 | 10 | 7 | 36 | 7 | $63,000 |
| 12 | 20 | 10 | 7 | 37 | 7 | $63,000 |
| **Total** | **158** | **83** | **42** | **283** | **57** | **$513,000** |

```mermaid
xychart-beta
    title "Monthly Revenue Forecast Year 1"
    x-axis ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"]
    y-axis "Revenue ($)" 0 --> 70000
    bar [9000,18000,27000,36000,36000,45000,45000,54000,54000,63000,63000,63000]
    line [9000,18000,27000,36000,36000,45000,45000,54000,54000,63000,63000,63000]
```

### Key Milestones

| Milestone | Target Month | Trigger |
|-----------|-------------|---------|
| First outbound-sourced loan funded | Month 3 | SDR function active for 60 days |
| First referral-sourced loan funded | Month 4 | 10+ loans funded total |
| $45K monthly revenue (breakeven+) | Month 6 | All 3 channels producing |
| Hire first VA/SDR | Month 4 | Revenue covers $1K/mo cost |
| 5 loans/month sustained | Month 8 | Pipeline is predictable |
| $500K annual run rate | Month 10 | Compounding referral engine |

---

## Referral Engine (Seeds) Playbook

```mermaid
flowchart TD
    CLOSE[Loan Funded] -->|48 hours| ASK["Call borrower:\nKnow anyone who could\nuse fast funding?"]
    ASK -->|7 days| NPS["Send NPS survey:\nHow likely to refer us?\n1-10 scale"]
    NPS -->|Score 9-10| PROMOTER["PROMOTER\nAsk for specific referral\nOffer fee discount"]
    NPS -->|Score 7-8| PASSIVE["PASSIVE\nAdd to newsletter\nShare case studies"]
    NPS -->|Score 1-6| DETRACTOR["DETRACTOR\nCall personally\nResolve issue"]

    PROMOTER -->|Referral given| NEW[New Lead\nenters pipeline]
    NEW --> CLOSE

    style CLOSE fill:#d1fae5,stroke:#059669
    style PROMOTER fill:#dbeafe,stroke:#2563eb
    style DETRACTOR fill:#fee2e2,stroke:#dc2626
```

**Referral incentive structure:**
- Referrer gets 0.25 points off origination on their next deal
- Referred borrower gets 0.25 points off on first deal
- Both parties win — creates viral loop

---

## Metrics Dashboard

### What to Track Weekly

| Category | Metric | Target | Current |
|----------|--------|--------|---------|
| **Activity** | Outbound emails sent | 300/week | 0 |
| **Activity** | Blog posts published | 2/week | < 1/week |
| **Pipeline** | New applications received | 6/week | ~2/week |
| **Pipeline** | Qualified opportunities | 3/week | Unknown |
| **Pipeline** | Term sheets issued | 2/week | Unknown |
| **Revenue** | Loans funded | 1/week | Unknown |
| **Revenue** | Revenue this month | $36K+ | Unknown |
| **Efficiency** | Cost per application | < $50 | ~$0 |
| **Efficiency** | Application-to-funded rate | 20%+ | Unknown |
| **Growth** | Referrals received | 2/week | 0 |

### Leading vs Lagging Indicators

```mermaid
flowchart LR
    subgraph LEADING["Leading Indicators"]
        E[Emails Sent\nper week]
        B[Blog Posts\nPublished]
        V[Website\nVisitors]
        R[Response\nRate]
    end

    subgraph LAGGING["Lagging Indicators"]
        A[Applications]
        Q[Qualified\nOpportunities]
        F[Loans\nFunded]
        REV[Revenue]
    end

    E --> R --> A
    B --> V --> A
    A --> Q --> F --> REV

    style LEADING fill:#fef3c7,stroke:#d97706
    style LAGGING fill:#d1fae5,stroke:#059669
```

---

## Implementation Roadmap

```mermaid
gantt
    title Predictable Revenue Implementation
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Phase 1 Fix the Bucket
    GA conversion tracking              :done, p1a, 2026-02-13, 3d
    Set up CRM                          :p1b, 2026-02-16, 7d
    Email nurture sequence              :p1c, 2026-02-16, 7d
    Break-up email Day 14               :p1d, 2026-02-23, 2d

    section Phase 2 Scale Nets
    46 state lending pages              :p2a, 2026-02-20, 14d
    8 new blog posts                    :p2b, 2026-02-20, 30d
    Facebook Pixel and retargeting      :p2c, 2026-03-01, 3d
    10 comparison pages                 :p2d, 2026-03-15, 14d

    section Phase 3 Build Outbound
    Define ICP and build target list    :p3a, 2026-03-01, 14d
    Cold Calling 2.0 templates          :p3b, 2026-03-01, 7d
    Start outbound 50 emails per day    :p3c, 2026-03-15, 90d
    Hire VA or SDR                      :p3d, 2026-05-01, 14d

    section Phase 4 Referral Engine
    Post-close referral ask process     :p4a, 2026-04-01, 7d
    NPS survey automation               :p4b, 2026-04-15, 7d
    Referral incentive program          :p4c, 2026-05-01, 14d
    Case study content                  :p4d, 2026-05-15, 30d
```

---

## Common Mistakes to Avoid

| Mistake | Why It Kills Revenue | Fix |
|---------|---------------------|-----|
| Leads rotting in email inbox | No follow-up = no close | CRM + 2-hour response SLA |
| Long pitchy outbound emails | Low response rate | Short referral email under 80 words |
| Only doing inbound marketing | SEO takes 6+ months to compound | Start outbound in parallel NOW |
| Not asking for referrals | Best lead source left on table | Ask every funded borrower within 48 hrs |
| Prospecting and closing same time | Feast-or-famine pipeline | Time-block or hire SDR |
| No conversion tracking | Cannot measure what works | GA events on every form submit |
| Treating all leads the same | Wasting time on unqualified | ANUM qualification on every lead |

---

## The Predictable Revenue Formula

```mermaid
flowchart TD
    SPEARS["SPEARS\nCold Calling 2.0\n50 emails/day\n8 apps/month"] --> PIPE

    NETS["NETS\nSEO + Blog + Chatbot\n2,000 visitors/month\n10 apps/month"] --> PIPE

    SEEDS["SEEDS\nReferrals from\nfunded borrowers\n7 apps/month"] --> PIPE

    PIPE["PIPELINE\n25 Applications/Month"] --> QUAL["QUALIFY\nANUM Framework"]

    QUAL --> CLOSE["CLOSE\n5 Loans/Month"]

    CLOSE --> REV["$45,000/Month\n$540,000/Year"]

    CLOSE -->|"Referral loop"| SEEDS

    style SPEARS fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style NETS fill:#fef3c7,stroke:#d97706,stroke-width:2px
    style SEEDS fill:#d1fae5,stroke:#059669,stroke-width:2px
    style REV fill:#d1fae5,stroke:#059669,stroke-width:3px
```

---

## Next Steps (This Week)

- [ ] Set up Google Search Console and submit sitemap
- [ ] Implement GA conversion events on application form + chatbot
- [ ] Choose CRM (HubSpot Free or Supabase-based)
- [ ] Write 5-email nurture sequence for new applicants
- [ ] Build target account list (first 200 contacts)
- [ ] Draft Cold Calling 2.0 email templates
- [ ] Start publishing 2 blog posts per week
- [ ] Generate city-level lending pages for programmatic SEO

---

*Report generated using the [Predictable Revenue](https://www.amazon.com/Predictable-Revenue-Business-Practices-Salesforce-com/dp/0984380213) framework by Aaron Ross. Adapted for private lending / hard money vertical.*
