# AssetLift Lending CRM Buildout Plan

## Repo confirmation

- Local repo: `C:\Users\ylpen\project\AssetLift-Lending`
- Git remote: `https://github.com/simchap123/AssetLift-Lending.git`
- Purpose of this file: keep the CRM scope inside the AssetLift Lending Git account while the actual app architecture is finalized

## Goal

Build an AssetLift Lending CRM that covers and exceeds the core workflow expected from platforms like Genie Rocket:

- lead capture and contact management
- multi-stage pipeline and deal tracking
- borrower and lender matching
- tasking, reminders, and follow-ups
- document collection and e-sign
- email sync and inbox management
- reporting, team visibility, and operational dashboards

## Better-than-basic requirements

To be stronger than a generic CRM, AssetLift should include:

- command center dashboard for inbox pressure, loan bottlenecks, and overdue tasks
- funding workflow by product type, lender box, and property profile
- borrower timeline with notes, docs, lender submissions, and communication history
- document request packs, borrower intake packages, and signing status
- lender submission tracking with status, terms, and feedback history
- owner scorecards for funded volume, speed-to-contact, and stuck-deal alerts

## Recommended build structure

Use a dedicated CRM app rather than forcing it into the marketing site:

- marketing site repo: `AssetLift-Lending`
- CRM app repo: separate Next.js app with its own database, auth, and dashboard routes
- shared brand/system: borrow design tokens and marketing assets where useful

## Delivery phases

### Phase 1

- contacts
- pipeline
- loans
- follow-ups
- dashboard

### Phase 2

- inbox sync
- document workflows
- borrower package generation
- lender submission tracking

### Phase 3

- automations
- role-based team access
- reporting
- alerts
- white-label borrower portals

## Immediate next step

Create or connect the dedicated CRM repository for implementation, then move the operational UI and database work there while keeping this file in the AssetLift Lending Git account as the source-of-truth scope note.
