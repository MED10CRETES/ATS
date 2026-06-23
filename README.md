# ATS

An applicant tracking system that is designed for both recruiters and applicants, with transparency as a product feature rather than an afterthought.

## Product Idea

Traditional ATS products often optimize for recruiter throughput while leaving applicants in the dark. They rely heavily on CVs and cover letters, provide little feedback, and rarely explain what is happening to a role or an application.

This product aims to be a more transparent ATS where:

- applicants can see the status of their application and the status of the role itself
- recruiters can collect richer, job-specific evidence beyond CVs and cover letters
- AI is used to clarify and structure applications rather than silently reject people
- recruiter review is supported by tabulated data, comparable answers, and clear scoring
- applicants receive meaningful status updates and comparative feedback at decision gates

## Core Pillars

### 1. Transparent application tracking

Applicants should be able to see:

- whether a role is open, closed, paused, or in offer stage
- how far the process has progressed
- whether submissions are still being accepted
- how many applicants are at each stage, in an anonymized and safe way
- the current status of their own application
- whether a role was completed or cancelled after they applied
- closed or cancelled roles in their own history, rather than having them disappear

### 2. Bespoke application tests

Each role can include a custom test created from the job advert and then reviewed by the recruiter before publishing.

The intended workflow is:

1. Recruiter posts or drafts a job advert.
2. AI proposes application questions based on the advert.
3. Recruiter reviews the draft test, disables weak questions, edits wording, changes order, and adds their own questions.
4. Applicants complete the test as part of the application process.

Supported answer types for the first build should be:

- short text
- long text
- multiple choice
- single select
- numeric

### 3. Immediate AI clarification stage

After an applicant submits their core materials, AI compares the role advert against the CV, cover letter, and structured form data. Instead of producing a silent score only, it highlights unclear or missing areas and asks the applicant targeted follow-up questions.

The aim is to:

- reduce misreading of applications
- give applicants a chance to clarify weak or ambiguous areas
- extract more relevant evidence before recruiter review

This should be governed carefully:

- recruiter-visible AI outputs should be reviewable and auditable
- applicant-facing prompts should be framed as clarification, not interrogation
- captcha or bot protection should be used around repeated AI-assisted interactions
- fully automated rejection should not be part of the initial proof of concept

### 4. Structured recruiter review

Recruiters should be able to review applicants in a table that combines:

- profile basics
- CV and cover letter presence
- test responses
- AI clarification responses
- stage
- score inputs
- decision history

This makes it easier to compare applicants fairly and consistently for a specific role.

### 5. Meaningful applicant feedback

Applicants should receive more than a binary outcome. The system should provide:

- live status updates
- decision gate notifications
- the number of applicants for the role
- the applicant's score shown against a probability distribution of the applicant pool for that role
- mean and median scores for the pool
- the stage the applicant reached
- high-level comparative insights against the applicant pool
- role-level updates such as stage counts and process progress

This area has legal, ethical, and UX sensitivity, so the first build should keep feedback aggregated, anonymized, and carefully worded.

## Primary Users

### Recruiters

- create and publish jobs
- manage applications
- review applicants in a structured table
- move candidates through stages
- close roles and communicate outcomes

### Applicants

- browse jobs
- view transparent role information
- apply with standard materials plus bespoke responses
- answer AI clarification prompts
- track their applications and role progress from a dashboard

## Current Product Decisions

The following assumptions are now part of the working product brief:

- the first customer segment is in-house recruiters
- the current build target is a proof of concept, not a production-ready product
- the proof of concept supports one recruiter seat per recruiter profile
- a recruiter account owns a profile, and that profile owns the jobs they post
- an applicant profile is primarily an application history view rather than a rich reusable master profile
- each application stores its own submitted answers, uploaded files, and application-time data snapshot
- AI remains advisory only in the proof of concept
- applicant-visible comparative statistics can appear once a role has at least 2 applicants, but they must show the applicant count and communicate uncertainty
- proof-of-concept scoring is based on a recruiter-defined rubric, and the recruiter defines the rubric shape for each role
- each application asks for separate applicant declarations about future-role retention and recruiter export
- applicant-facing and recruiter-facing stage names should be the same for the proof of concept because precision and transparency are core product values
- if a job is completed or cancelled, it should no longer appear in the public open jobs list, but it should remain visible to applicants who applied
- closed or cancelled role history remains visible to applicants indefinitely for the proof of concept
- once a role is completed or cancelled, recruiter in-app access to applicant personal data ends, while applicants retain read-only visibility into the role outcome and their own application record
- recruiters may export applicant-submitted data for offline retention only when the applicant has consented, and exports must be explicit, logged, and treated as a compliance-sensitive action
- recruiter exports include what the applicant submitted for the application, but exclude recruiter scoring, recruiter notes, and comparative analytics
- controller, processor, and lawful-basis decisions are logged as future legal review risks rather than solved in proof-of-concept documentation

## Recommended Proof Of Concept

The first build should prove the product thesis in a compelling, end-to-end user story. It does not need to behave like a complete commercial ATS yet.

### Proof-of-concept goal

Build a working loop where:

- a recruiter can publish a role with a small bespoke test
- applicants can apply and receive transparent status updates
- recruiters can review applicants in a structured, comparable view
- applicants can later see role progress and application progress without needing to chase updates

The proof of concept should make the core pillars tangible enough to test:

1. transparent role and application status
2. recruiter-defined job-specific tests
3. AI-assisted clarification, kept advisory
4. structured recruiter comparison
5. applicant-visible score and role statistics
6. closed-role persistence for applicants

### In scope for the first build

#### Recruiter workflow

1. Create recruiter account and single-seat recruiter profile.
2. Create a job advert with title, summary, description, location, salary, and hiring stages.
3. Generate draft screening questions from the job advert using AI.
4. Edit, disable, reorder, and add questions manually.
5. Publish the job.
6. Review applicants in a role-specific table.
7. Open an applicant detail view with submitted files, answers, AI clarification responses, and recruiter notes.
8. Move applicants through simple stages such as `submitted`, `screening`, `interview`, `offer`, `rejected`, `withdrawn`.
9. Close the job as `completed` or `cancelled`, remove it from the public open jobs list, and publish role outcome status to applicants.
10. After closure, retain anonymized role reporting while removing recruiter access to applicant personal data.

#### Applicant workflow

1. Browse a list of open jobs.
2. Open a job detail page with transparent role-level information.
3. Create or update applicant profile.
4. Apply with CV, cover letter, profile details, and bespoke application questions.
5. Complete application data declarations for future-role retention and recruiter export.
6. Complete an AI clarification step if gaps or ambiguities are detected.
7. Submit the application.
8. View an application dashboard showing status, timeline, role progress, score context, notifications, and whether the role was completed or cancelled.

#### Shared platform workflow

- email notifications for status changes
- role-level counters and stage summaries
- audit trail for application status changes
- basic search and filtering
- bot protection on apply and clarification stages

### Explicitly out of scope for the proof of concept

- multi-tenant enterprise admin tooling
- multi-seat recruiter collaboration
- interview scheduling integrations
- complex permissions hierarchies
- full recruiter CRM
- AI auto-rejection
- advanced ranking models trained on historical hiring decisions
- public comparative feedback that could reveal other applicants
- video interviewing or assessments

## Recommended Proof-Of-Concept Build Order

To reduce risk and ship something testable quickly, build in this order:

1. Authentication and role-based accounts.
2. Recruiter org profile and basic job posting.
3. Public job board and job detail pages.
4. Applicant profile and application submission flow.
5. Recruiter application review table and status updates.
6. Applicant dashboard with transparent tracking.
7. AI-generated test builder for jobs.
8. AI clarification stage for applicants.
9. Feedback and statistics layer.

This order lets the product work end to end before adding the more experimental AI features. The goal is a meaningful product demonstration, not full operational completeness.

## Status And Visibility Rules

The first build should treat job lifecycle visibility as a product feature.

### Job statuses

- `draft`
- `open`
- `paused`
- `completed`
- `cancelled`

### Visibility behavior

- `open` jobs appear on the public jobs list
- `paused` jobs may be hidden from new applicants while remaining visible to recruiters
- `completed` and `cancelled` jobs are removed from the public jobs list
- `completed` and `cancelled` jobs remain visible to applicants who applied
- applicants should be able to see the final role outcome and the stage they reached
- recruiters lose in-app access to applicant personal data immediately when a role is completed or cancelled

Recommended proof-of-concept interpretation:

- applicants keep read-only access to the role detail, their submitted application, and the final outcome
- recruiters keep access to anonymized aggregate reporting, audit history, and role metadata only

## Applicant Statistics Rules

The product should prioritize transparency while making uncertainty visible.

### Minimum counts

- comparative statistics can appear once a role has at least 2 applicants
- every comparative statistic must show the applicant count it is based on
- if there is only 1 applicant, show the applicant's own score and explain that no comparison is available yet

### Proof-of-concept statistics

- total applicant count
- applicant's score
- mean score
- median score
- distribution view for the role's applicant pool
- uncertainty cue, such as error bars, confidence ranges, or a plain-language low-sample-size warning

### Cascading disclosure

Comparative statistics may start at 2 applicants. More sophisticated privacy-preserving display rules can be reviewed later.

Proof-of-concept principle:

- applicant count should be visible as early as possible
- score comparisons should explain when small samples are fragile
- if score privacy becomes a real issue, the answer should be to review the type of score being shared rather than remove the transparency goal

### Presentation principle

Small samples create bias and error, but hiding the process creates distrust. The UI should show the limitation rather than hide the statistic.

### Proof-of-concept scoring model

The first scoring model should be recruiter-rubric only.

This means:

- recruiters define the rubric shape for each role
- rubric shape may include criteria, weights, scoring scale, and optional evidence notes
- applicants are scored against those criteria
- AI may help structure or summarize application information, but should not generate the score in the proof of concept
- score distribution transparency depends on the rubric score output and sample size

## Recruiter Data Export

Recruiters may need to keep records outside the ATS. The product can support this, but it should be designed as a controlled export rather than an ordinary download.

Proof-of-concept export behavior:

- recruiters can export applicant data for a role before or during closure when the applicant has consented to export
- exports include applicant-submitted application data only
- exports exclude recruiter scores, score distributions, recruiter notes, and comparative analytics
- the export should be logged with recruiter, role, timestamp, and export type
- the export should include a visible warning that the recruiter becomes responsible for managing the offline copy
- the export should avoid including data that is not needed for recruitment record keeping
- once the role is completed or cancelled, normal in-app access to applicant personal data should still be removed or heavily restricted

Recommended export formats:

- CSV for structured application data
- ZIP archive for files and structured data together
- PDF summary for a human-readable decision record

Applicant-submitted data includes:

1. applicant profile fields submitted for that application
2. CV and cover letter files
3. application form answers
4. bespoke test answers
5. applicant responses to AI clarification prompts
6. applicant consent declarations

Applicant export should not include:

1. recruiter rubric scores
2. score distributions
3. recruiter notes
4. internal decision comments
5. comparative analytics for the role

Later compliance hardening may add:

- encrypted export archives
- export expiry links
- configurable retention periods
- deletion request workflows that record whether offline exports exist
- organization-level export policy settings

## Applicant Data Declarations

Each application should include clear, separate declarations about what can happen to the applicant's data.

### Declaration 1: future positions

Question:

- Do you consent to this recruiter keeping your application data so they can consider you for other positions?

Default:

- unchecked or `no`

If yes:

- the recruiter may keep the applicant's data for future-role consideration, subject to future retention policy
- the consent must be recorded against that specific application
- the applicant should later be able to withdraw this consent

If no:

- the applicant can still apply
- the recruiter should only use the data for the role applied to
- the applicant should not be added to any future-role candidate pool

### Declaration 2: recruiter export

Question:

- Do you consent to this recruiter exporting your application data from the platform?

Default:

- unchecked or `no`

If yes:

- the recruiter may export the applicant's application data through the controlled export workflow
- the export still needs a warning, audit log, and minimum-necessary data selection

If no:

- the applicant can still apply
- the recruiter should not be able to export that applicant's personal application data
- anonymized aggregate role reporting can still be exported if it does not identify the applicant

### Consent record

For each declaration, store:

- consent type
- accepted or declined value
- timestamp
- application ID
- job ID
- recruiter profile ID
- applicant user ID
- wording version shown to the applicant
- withdrawal timestamp, if later withdrawn

These declarations should be presented in plain language and should not be bundled with terms of service acceptance.

Consent withdrawal should be recorded for later implementation. The proof of concept should store enough consent history to support withdrawal workflows later, but does not need to include a full applicant self-service withdrawal dashboard in the first build.

## Technology Recommendations

### Frontend

- `Next.js` with TypeScript for a unified web app covering recruiter and applicant experiences
- `React` for component-driven UI
- `Tailwind CSS` for fast UI development
- `shadcn/ui` or a similar headless component approach for accessible primitives

Why:

- strong fit for a modern product web app
- easy separation of recruiter and applicant surfaces
- flexible server rendering for public job pages and authenticated dashboards

### Backend

- `Next.js` server actions and route handlers for the initial build
- `tRPC` only if the team wants stricter typed client-server boundaries across many interactive screens

Why:

- keeps the first build simple
- avoids premature microservice complexity
- supports a fast proof of concept without losing the option to extract services later

### Database

- `PostgreSQL`
- `Prisma` or `Drizzle` as the ORM

Why:

- relational data is central here: users, organizations, jobs, applications, questions, answers, stages, scores, notifications
- PostgreSQL is reliable and flexible enough for both transactional data and early reporting

### File storage

- `S3`-compatible object storage for CVs and other uploads

Why:

- simple and proven
- easy to integrate with signed uploads and secure access patterns

### Authentication

- `Clerk` if the team wants the safest and fastest managed auth path
- `Auth.js` if staying close to the Next.js ecosystem and accepting more implementation responsibility
- `Supabase Auth` if using Supabase for database and platform services

Recommendation:

- start with `Clerk` for the proof of concept if security confidence and speed matter more than vendor coupling
- require MFA for recruiter accounts before handling real applicant data
- allow applicant MFA but do not make it mandatory in the first build unless risk increases

### AI orchestration

- an LLM API with structured outputs for:
  - generating test questions from job adverts
  - detecting likely gaps or ambiguities in an application
  - drafting clarification prompts
- background job runner such as `Inngest` or `Trigger.dev`

Why:

- AI features should run asynchronously and leave an audit trail
- structured outputs matter more than free-form prose for maintainability
- closure and retention workflows will likely need background processing too

### Notifications

- `Resend` or `Postmark` for transactional email

### Bot protection

- `Cloudflare Turnstile`

Why:

- lighter friction than traditional captchas
- appropriate for protecting AI clarification loops and application submission

### Analytics and product insight

- `PostHog`

Why:

- good fit for funnel analysis, feature usage, and event tracking during proof-of-concept discovery

### Deployment

- `Vercel` for the web app
- `Neon`, `Supabase`, or `Railway` for PostgreSQL

Recommended combination for the proof of concept:

- `Vercel` + `Neon` + `S3-compatible storage`

### Testing

- `Vitest` for unit tests
- `Playwright` for end-to-end workflows

Focus test coverage on:

- recruiter job posting
- applicant application flow
- application status transitions
- permission boundaries between recruiter and applicant views
- AI output schema validation

## Security Baseline

This product handles CVs, cover letters, hiring decisions, application scores, uploaded files, consent records, and export logs. Security should be treated as part of the proof of concept, not as an enterprise add-on.

### Reference standards

Use these as the security baseline:

- OWASP Top 10 for common web application risks
- OWASP ASVS Level 1 for proof-of-concept security verification
- OWASP ASVS Level 2 before production usage with real hiring teams and real applicant data
- OWASP Cheat Sheets for authentication, authorization, file upload, logging, secrets, and secure headers
- NIST SP 800-63B as a reference for authentication and MFA decisions

### Security-biased proof-of-concept stack

Recommended proven services:

- `Clerk` for managed authentication, MFA, sessions, password reset, and account security
- `Cloudflare` for DNS, WAF, rate limiting, bot protection, and Turnstile
- `Vercel` for managed hosting, HTTPS, environment variables, preview deployments, and deployment controls
- `Neon` or `Supabase` for managed PostgreSQL with TLS, backups, and point-in-time restore
- `S3`-compatible private object storage for CVs, cover letters, and exports
- `Sentry` for error monitoring and security-relevant alerting
- `GitHub Dependabot` or `Renovate` for dependency updates
- `GitHub Advanced Security`, `CodeQL`, or equivalent scanning if available
- `Resend` or `Postmark` for transactional email with SPF, DKIM, and DMARC configured

### Authentication and sessions

Proof-of-concept requirements:

- recruiter accounts must use verified email
- recruiter MFA should be required before live applicant data is processed
- applicant accounts should support MFA but not require it initially
- session cookies must be secure, HTTP-only, and same-site
- password reset and email verification should be handled by the auth provider
- sensitive actions should require recent authentication where practical

Sensitive actions include:

- exporting applicant data
- closing or cancelling a role
- changing recruiter email or password
- changing consent or retention settings
- deleting applicant data

### Authorization and access control

The most important security risk for this product is broken access control.

Proof-of-concept requirements:

- every application, job, file, score, note, consent record, and export log must be checked against the current user's role and ownership
- applicants can only access their own applications and applicant-visible role data
- recruiters can only access jobs they own
- recruiter access to applicant personal data changes when a job is completed or cancelled
- recruiter-only notes and internal scoring details must never be exposed to applicants
- authorization checks must happen on the server, not only in the UI

Recommended implementation pattern:

- centralize authorization in reusable server-side policy functions
- write tests for cross-user and cross-role access attempts
- treat IDs in URLs as untrusted input

### File upload security

CV and cover letter uploads are a major risk area.

Proof-of-concept requirements:

- allow only business-critical file types, initially `pdf` and `docx`
- set strict file size limits
- generate server-side filenames instead of trusting uploaded filenames
- store files in a private bucket outside the public web root
- use short-lived signed URLs for file access
- validate file extension, MIME type, and file signature where possible
- scan uploaded files for malware before recruiter access
- never execute or render uploaded files directly inside the app

Recommended implementation:

- private S3-compatible bucket
- signed upload and signed download URLs
- malware scanning with a managed scanning service, cloud function, or ClamAV-based worker
- quarantine status before recruiter-visible download is available

### Data protection

Proof-of-concept requirements:

- enforce TLS for all traffic
- use managed PostgreSQL with encrypted storage
- use private object storage for uploaded files
- keep production secrets out of the repo
- separate local, preview, and production secrets
- use least-privilege database credentials
- avoid storing unnecessary applicant data
- avoid sending applicant personal data to analytics tools

### Audit logging

Audit logs should exist from the start because this product handles hiring decisions and sensitive data.

Log these events:

- login and logout for recruiter accounts
- failed login or suspicious authentication events when available from the auth provider
- application submission
- application status changes
- role publication, pause, completion, and cancellation
- recruiter viewing applicant personal data
- recruiter export attempts and completed exports
- consent declaration changes and withdrawals
- file upload, scan result, download, and deletion
- AI-generated test creation
- AI clarification prompts and responses

Audit logs should be append-only from the application perspective.

### Rate limiting and abuse protection

Proof-of-concept requirements:

- rate limit login, signup, application submission, AI clarification, and export endpoints
- use Turnstile on public application submission and AI clarification loops
- detect repeated failed uploads, repeated failed login attempts, and high-volume applications
- protect AI endpoints with quotas and server-side authorization

### Security testing

Before using real applicant data, test:

- applicant cannot view another applicant's application
- recruiter cannot view another recruiter's job or applicants
- applicant cannot view recruiter notes
- recruiter cannot access personal applicant data after closure unless policy allows it
- export only includes applicants who consented to export
- upload rejects unsupported file types and oversize files
- signed file URLs expire
- common API endpoints reject unauthenticated requests

Recommended checks:

- unit tests for authorization policies
- Playwright tests for role-boundary workflows
- dependency scanning in CI
- secret scanning in CI
- manual OWASP ASVS Level 1 review before first private beta

## Security Clarifications To Resolve

These choices should be made before implementation handles real applicant data:

1. Should the proof of concept use `Clerk` for managed auth, even with some vendor coupling?
2. Should recruiter MFA be mandatory from day one?
3. Should applicant MFA be optional or required?
4. Should uploads be limited to `pdf` and `docx` only?
5. Should malware scanning be mandatory before recruiters can download CVs?
6. Should production data be hosted in the UK/EU from the start?
7. Who should receive security alerts from Sentry, Cloudflare, and the auth provider?
8. Should recruiter data exports require re-authentication immediately before export?

## AI Risk Recommendations For Later Review

AI risk should not block the proof-of-concept build. The immediate goal is to show a meaningful ATS user story built on the core pillars, then test where those pillars create AI, legal, fairness, or trust risks.

### Why this matters

Recruitment AI is a sensitive area because AI can influence access to work. The proof of concept avoids AI-generated scores and AI rejection, but AI still supports question generation, application clarification, and recruiter understanding. That means the product should keep enough notes to make a later AI review useful without slowing the first build.

### Later AI risk record

When the proof of concept is working, review each AI-assisted feature and record:

1. feature name
2. user affected
3. input data used
4. output produced
5. whether the output is shown to applicant, recruiter, or both
6. whether the output can influence a recruiter decision
7. required human review step
8. model or provider used
9. prompt version
10. output schema version
11. known limitations
12. audit events to store

### Proof-of-concept AI guardrails

1. AI must not reject applicants.
2. AI must not generate applicant scores.
3. AI-generated test questions must be reviewed and edited by the recruiter before publication.
4. AI clarification prompts must be framed as a chance for the applicant to add context.
5. AI outputs must be stored with prompt version, model/provider, timestamp, and source inputs.
6. Applicants should be told when AI is used to generate clarification prompts.
7. Recruiters should see AI output as advisory and reviewable, not authoritative.
8. AI outputs should avoid inferring protected or special-category characteristics.

### Later AI review questions

Later legal and compliance review should cover:

1. whether any AI feature falls within high-risk recruitment AI obligations
2. whether a data protection impact assessment is needed
3. whether human oversight is meaningful enough
4. whether applicants need additional explanation or contest routes
5. whether model/provider contracts, data retention, and training-data handling are acceptable
6. whether the system needs bias, accuracy, and robustness testing before production use

## Suggested Domain Model

Core entities for the first build:

- `User`
- `ApplicantProfile`
- `RecruiterProfile`
- `Organization`
- `Job`
- `JobLifecycleEvent`
- `JobStage`
- `JobQuestion`
- `ScoreRubric`
- `RubricCriterion`
- `Application`
- `ApplicationAnswer`
- `ApplicationFile`
- `ApplicationClarification`
- `ApplicationScore`
- `ApplicationConsent`
- `ApplicationStatusEvent`
- `DataExportLog`
- `SecurityAuditEvent`
- `FileScanResult`
- `RecruiterNote`
- `Notification`

Later AI/compliance entities may include:

1. `AIRiskRecord`
2. `AIPromptVersion`
3. `AIOutputRecord`

## Product Risks To Design Around

### AI fairness and explainability

AI should assist structure and clarification, not become an opaque gatekeeper. Any scoring or summary visible to recruiters should be inspectable and attributable.

### Legal and privacy obligations

This product will process personal and potentially sensitive data. Privacy, retention, access control, and auditability should be designed from the beginning.

Current EU and UK light-touch concerns to log now:

- controller, processor, and lawful-basis decisions require later legal advice and are intentionally not resolved in proof-of-concept documentation
- recruiter access should change when a role is completed or cancelled, especially where applicant personal data is no longer needed
- offline exports create uncontrolled copies, so they need clear audit logs and recruiter responsibility warnings
- consent for future-role retention and consent for export should be separate, optional, recorded, and withdrawable
- security controls need to be demonstrable, especially access control, audit logs, file handling, and retention actions
- applicant-visible score distributions may count as profiling and should remain explainable and advisory
- retention periods for uploaded CVs, cover letters, and clarification responses will need later policy review
- applicant requests for deletion may conflict with the desire to preserve an application history view
- special category personal data should not be inferred, exposed, or used casually in scoring
- recruitment AI may attract high-risk AI and automated decision-making review even when outputs are advisory, so AI use should be easy to review after the proof of concept is working

### Feedback sensitivity

Applicants want feedback, but careless comparative feedback can be harmful, misleading, or legally risky. Keep early feedback:

- aggregated
- non-identifying
- factual
- human-readable

## Proof-Of-Concept Success Criteria

The proof of concept is successful if:

- recruiters can publish and close jobs without admin intervention
- applicants can complete the flow without confusion
- applicants reliably see transparent progress updates
- recruiters can compare applications faster than with email and CV review alone
- AI-generated test and clarification features improve completeness without blocking submissions

## Clarifications To Resolve Next

These questions still matter for the next design pass:

1. What uncertainty display should be used for small applicant pools:
   - error bars
   - confidence range
   - low-sample warning
   - all of the above
2. Is email notification enough for the proof of concept, or do you want in-app messaging soon after?
3. Should the bespoke test be optional for each role, or required by default?
4. What later legal review should cover controller, processor, lawful-basis, retention, export obligations, and AI risk?

## Next Documentation To Add

Good follow-up docs after this README:

- product requirements document
- user journeys for recruiter and applicant
- proof-of-concept user story
- initial schema design
- AI prompt and evaluation policy
- privacy and data handling notes
