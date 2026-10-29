# BOPEU Member Self-Service Platform — Executive Summary

**Prepared for:** BOPEU leadership and stakeholders
**Prepared by:** Platform development team
**Date:** October 2026
**Status:** Demo mode — production build pending backend integration

---

## 1. What the platform is

The BOPEU Member Self-Service Platform is a **browser-based digital membership platform** for the Botswana Public Employees Union (BOPEU). It is a single web address that any member, staff member or benefit partner can open in any mobile or desktop browser — **nothing to install, no app store, no third-party services or tracking scripts**. All content and imagery are served from BOPEU's own hosting.

BOPEU represents **37,000+ public employees** across **5 offices** (Gaborone HQ, Francistown, Palapye, Maun, Kang) and **4 employment sectors** (Central Government, Local Authority, Land Boards, Parastatals & SOEs). The platform exists to put membership services, benefits, applications, claims and support into the hands of every one of those members, on the low-cost handsets and shared devices they actually use.

## 2. Why it matters

Before the platform, a member in Kang or Maun who needed a funeral claim, a bursary form or a partner discount had to travel to an office or wait on a phone line. The platform removes that distance:

- **Reach** — every member, on any phone, in any of the five catchment areas.
- **Offload** — forms, calculators and document checklists are handled before the member reaches a counter.
- **Data** — structured, capturable membership and application data instead of paper.
- **Partners** — 16 partner benefit providers activated through one verifiable directory.
- **Protection** — the six-month and twelve-month funeral-claim windows are actively managed for members.

## 3. What the platform can do (finished state)

When fully built and connected to a backend, the platform will deliver:

### For members
- **Digital membership card** with QR verification, status tag (Active / Pending Verification) and validity date — presented at any partner for a discount.
- **9 member services** grouped as members think about them: Money (Bursary, Direct Loans, Babereki SACCOS), Protection (Funeral Cover), Everyday (Lifestyle Discounts, Utilities & Airtime, Building Materials), Standing up for members (Legal Representation, Dispute Resolution, Collective Bargaining).
- **16 partner benefit providers** in one directory with 7 category filters and a status badge (Confirmed / Apply) so members always know which offers are verified.
- **7 smart application forms** (New Membership, Educational Bursary, Building Materials, Funeral Cover, BOPEU Direct Loan, Access Bank, Contact/Grievance) — each 3 steps with live calculators and a reference number on submission.
- **6 official BOPEU forms** rebuilt as live pages (Membership Application, Extended Family, Funeral Cover Amendment, Extended Family Application, GLA Nomination of Beneficiaries, KYC) with downloadable PDFs.
- **6 premium calculators** built from the official rate tables.
- **Funeral claims flow** with a guided 5-document checklist, live progress bar, and submit unlocked only when complete.
- **Document vault** — store scans on the device, attach from camera/gallery/PDF, download the six official form PDFs.
- **Worker education** — BOPEU at a Glance (history, 37,000+ members, 5 offices, 4 affiliates) plus an 8-question Quick Quiz.
- **Offices and support** — 5 offices with addresses and phones, support line, WhatsApp, email, grievance raising.
- **Timeline** — 10 campaign stories with real artwork, shareable to WhatsApp.
- **Updates / notice board** — 4 standing notices with live search.
- **Data Saver mode** — hides images on demand for members on small bundles.
- **Privacy controls** — privacy policy, terms of service, Clear Local Data in one action.

### For staff
- **Staff dashboard** — member counts at a glance, sector and status filters, search by name/Omang/member number/employer/job title/district, employment sector and office counts (read-only in demo).
- **Role-based portals** for 7 staff roles: Marketing & Partnerships, Sales & Recruitment, Finance & Payroll, Welfare & Claims, Regional Coordination, Legal & Industrial Relations, Super Admin.
- **Submissions queue** — bursary, loan, funeral, building, grievance submissions with status workflow (submitted → office review → verified → approved/rejected).
- **Audit log** — every privileged action recorded.
- **Content management** — draft, schedule and publish timeline posts, notices, partner cards, document-vault metadata (maker-checker approval).
- **Payroll reconciliation** — upload/compare payroll deduction batches, resolve subscription discrepancies, manage arrears and refunds.
- **Claims processing** — assigned funeral-claim, bursary and welfare dossiers with document checklists and partner hand-off.
- **Legal case management** — assigned grievance/dispute files, legal deadlines, mediation/arbitration status, bargaining-council alerts.
- **Regional operations** — branch meetings, local notices, attendance/minutes, local grievance triage and escalation to national legal.

### For benefit partners
- **Partner portal** — dashboard with KPIs (active offers, impressions, clicks, redemptions), profile, offers, analytics, feedback, documents, users.
- **Scoped access** — each partner sees only their own offers, assigned transactions and consented minimum fields for member-initiated requests.
- **Offer management** — draft own offer data, update assigned application/redemption milestones.
- **Eligibility verification** — minimal yes/no eligibility ping (e.g. Diagnofirm) without exposing medical history.
- **CUG enrolment** — manage assigned airtime/CUG enquiries and consented contact/SIM fields.

## 4. User types and how the platform assists them

| User type | How the platform assists |
|---|---|
| **Members** (37,000+) | Self-service access to membership card, 9 services, 16 partners, 7 forms, 6 calculators, funeral claims, document vault, education, offices/support — on any phone, in any region. |
| **Staff — Marketing & Partnerships** | Draft and schedule member-facing content and partner cards; manage document-vault metadata; second-person approval before publishing. |
| **Staff — Sales & Recruitment** | Capture leads, follow-up dates, onboard prospects, moderate member submissions; cannot activate membership without payroll verification. |
| **Staff — Finance & Payroll** | Reconcile payroll deduction batches, resolve subscription discrepancies, manage arrears/refunds; dual approval for payments. |
| **Staff — Welfare & Claims** | Process assigned funeral claims, bursaries, welfare grants with document checklists and partner hand-off. |
| **Staff — Regional Coordinator / Shop Steward** | Local triage, branch meetings, local notices, attendance/minutes, escalation to national legal; scoped to assigned region. |
| **Staff — Legal & Industrial Relations** | Assigned grievance/dispute cases, legal deadlines, mediation/arbitration, bargaining alerts. |
| **Staff — Super Admin** | User/role/account management, security settings, backups, audit-log review; break-glass access is time-limited, justified and logged. |
| **Benefit Partners** (16) | Scoped portal for own offers, assigned transactions, consented minimum fields; eligibility pings; CUG enrolment; no member search or sensitive data. |

## 5. What to expect from the current demo mode

The platform is currently in **demo mode**. This means:

- **All profile records, names, identity references, contact details, account references, balances, cases, dependants, submissions and usage metrics are synthetic.** The six member display names are retained from the brief, but their associated profile data is invented.
- **No real member data is stored or transmitted.** Member data is held on the member's own device in browser storage (localStorage). There is no backend server, no database, no real payroll integration.
- **Form submissions stay on the device.** Applications submitted through the forms are saved to localStorage and shown in the admin submissions queue, but they do not reach a server.
- **Funeral claims are simulated.** The 5-document checklist and progress bar work, but no claim is actually filed with an underwriter.
- **Partner offers marked "Apply"** have terms that still need verification with the partner. Only 4 of 16 partners are "Confirmed".
- **Premium figures** are taken from the official BOPEU forms but should be validated against the underwriter's current schedule before publication.
- **Demo login password** is `1234` for all demo profiles (member, staff, partner, admin).
- **Every demo record should carry a visible DEMO flag** in the prototype.

### What is real vs. simulated

| Element | Status |
|---|---|
| UI, navigation, forms, calculators | ✅ Fully functional |
| Member registration wizard | ✅ Functional (data stays on device) |
| Digital member card (QR visual) | ✅ Visual only — not a live verification credential |
| Funeral cover premium calculations | ✅ Based on official rate tables |
| Partner directory and detail pages | ✅ Functional; terms subject to verification |
| Staff dashboards and queues | ✅ Functional with demo data |
| Partner portal | ✅ Functional with demo data |
| Backend / database / API | ❌ Not connected |
| Real payroll integration | ❌ Not connected |
| Real claim filing with underwriter | ❌ Not connected |
| Live QR verification | ❌ Not connected |
| Email/SMS notifications | ❌ Not connected |

## 6. Next steps (decisions needed)

1. **Confirm the funeral cover scheme figures and underwriter naming** for publication (platform carries one set of numbers; printed forms carry another).
2. **Wire the digital member card to the membership register** for live QR verification.
3. **Add verification actions to the staff dashboard** (currently read-only).
4. **Connect form submissions to a backend** so applications move beyond the device.
5. **Extend the partner schedule** — move partners from "Apply" to "Confirmed" as terms are verified.

---

*This document is an executive summary. For the full platform overview, see `BOPEU-Platform-Comprehensive-Overview.md`. For technical details, see `BOPEU-Platform-Technical-Deep-Dive.md`. For the demo walkthrough, see `BOPEU-Platform-Demo-Guide.md`.*
