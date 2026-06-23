# AGENTS.md

This repository is currently documentation-first. Treat `README.md` as the active product brief until implementation begins.

## Mission

Build an applicant tracking system that improves hiring transparency for applicants while giving recruiters better structured evidence than CVs and cover letters alone.

The first principle is:

- transparency before automation

If a proposed feature improves recruiter efficiency but reduces applicant clarity or fairness, stop and reconsider the design.

## Product Priorities

In order of importance:

1. Clear applicant visibility into role and application status.
2. Recruiter workflows that stay simple and auditable.
3. Structured applications with bespoke tests.
4. AI-assisted clarification that improves completeness without silently filtering people out.
5. Useful recruiter comparison views and safe applicant feedback.

## Current Product Assumptions

Unless the user says otherwise, work from these assumptions:

- the first target customer is in-house recruiters
- the current build target is a proof of concept, not a production-ready product
- the proof of concept supports one recruiter seat per recruiter profile
- recruiter profiles own the jobs they post
- applicant profiles primarily show application history
- each application stores its own submitted answers, files, and other application-time data
- AI is advisory only in the proof of concept
- comparative applicant statistics can appear once there are at least 2 applicants, with applicant count and uncertainty visible
- proof-of-concept scoring is recruiter-rubric only, and recruiters define the rubric shape for each role
- each application asks for separate applicant declarations about future-role retention and recruiter export
- applicant-facing and recruiter-facing stage names are the same for the proof of concept
- completed or cancelled jobs remain visible to applicants who applied
- closed or cancelled role history remains visible to applicants indefinitely for the proof of concept
- recruiter in-app access to applicant personal data ends when a role is completed or cancelled
- recruiter offline exports may be supported only with applicant export consent, and every export must be explicit, logged, and treated as compliance-sensitive
- recruiter exports include applicant-submitted data only, not recruiter scores, notes, or comparative analytics
- controller, processor, and lawful-basis questions remain future legal review risks

## Proof-Of-Concept Boundaries

When in doubt, keep the first implementation focused on these workflows:

### Recruiter POC

- create recruiter and organization profile
- draft and publish a job
- generate and edit role-specific application questions
- review applicants in a structured table
- move applicants between simple stages
- close a job

### Applicant POC

- browse jobs
- view job detail
- create profile
- apply with files and answers
- complete separate data declarations for future-role retention and recruiter export
- respond to AI clarification prompts
- view application dashboard and role progress

### Not POC

- enterprise admin tooling
- multi-seat recruiter collaboration
- full recruiting CRM features
- interview scheduling integrations
- AI-driven rejection
- advanced machine-learned ranking

## AI Guardrails

AI features in this product must follow these rules:

- AI suggestions must be reviewable by a human recruiter.
- AI outputs should be stored in structured form where possible.
- AI should clarify, summarize, and assist comparison.
- AI should not make unreviewed hiring decisions in the proof of concept.
- AI should not automatically reject applicants in the proof of concept.
- AI should not generate applicant scores in the proof of concept.
- Any applicant-facing AI prompt should have a clear purpose and plain language.
- Any recruiter-facing AI score or summary should be traceable to the underlying inputs.

If implementing AI features, prefer deterministic schemas and background jobs over inline free-form behavior.

## Transparency Rules

This product is differentiated by transparency. Future contributors should preserve that in the UX and data model.

Prefer:

- visible status histories
- clear timestamps
- shared recruiter/applicant stage labels
- role-level summaries that explain process progress
- explicit submission and closure states
- closed-role visibility in applicant history
- applicant-count disclosure from 2 applicants onward
- score-statistic transparency from 2 applicants onward, with later review if the score type creates privacy or inference issues

Avoid:

- silent status changes
- opaque rejection flows
- unexplained applicant scoring
- misleading precision in comparative statistics
- exact score disclosures that accidentally reveal another applicant's identifiable result

## Data and Security Expectations

This product will handle personal data, uploaded files, and hiring decisions. Build with:

- strong access control between recruiter and applicant contexts
- secure file handling
- audit logs for important state changes
- conservative data exposure in analytics and notifications
- privacy-aware retention and deletion design
- rate limiting and bot protection on public or AI-heavy endpoints
- managed, proven security services where possible

Do not expose recruiter-only notes, internal scores, or other applicants' data to applicants.

Use OWASP Top 10 as the risk checklist and OWASP ASVS Level 1 as the proof-of-concept verification baseline. Target ASVS Level 2 before production use with real hiring teams and real applicant data.

Security-biased implementation preferences:

- prefer managed auth such as `Clerk` for the proof of concept unless the user explicitly chooses lower vendor coupling
- require recruiter MFA before live applicant data is processed
- use server-side authorization policy functions for all role and ownership checks
- write tests for applicant-to-applicant, recruiter-to-recruiter, and applicant-to-recruiter access boundaries
- keep uploads in private object storage with signed URLs
- allow only `pdf` and `docx` uploads until the product has a reason to expand
- scan uploaded files before recruiter download
- rate limit login, signup, application submission, AI clarification, and export endpoints
- keep secrets in managed environment variable storage, never in the repo
- avoid sending applicant personal data to analytics, logs, or error monitoring
- use structured audit logs for status changes, data access, file access, exports, consent changes, and AI actions

When a role is completed or cancelled:

- applicants should still be able to see the role outcome and their own application history
- recruiters should lose ordinary access to applicant personal data
- anonymized aggregate reporting may remain visible to recruiters
- this should be implemented as an access and retention rule, not by making the application disappear for applicants

When implementing recruiter exports:

- treat exports as controlled actions, not ordinary file downloads
- log who exported what, from which role, and when
- show a clear responsibility warning before export
- include applicant-submitted application data only
- exclude recruiter scores, score distributions, recruiter notes, internal decision comments, and comparative analytics
- only include applicants who consented to export, unless a later legal review defines a different lawful route
- require recent authentication before export when practical
- keep in-app closure access rules even when an export has happened

When implementing applicant declarations:

- keep future-role retention consent separate from export consent
- default both declarations to declined
- make both declarations optional so declining does not block applying
- record the exact wording version shown to the applicant
- store consent decisions per application, not only on the applicant profile
- design for later withdrawal, even if withdrawal management is not fully built in the proof of concept
- record enough history to support future withdrawal workflows without building self-service withdrawal in the proof of concept

When implementing scoring:

- use recruiter-defined rubric shape only for the proof of concept
- allow recruiters to define criteria, weights, scoring scale, and optional evidence notes
- keep AI out of score generation
- store enough rubric and score metadata to explain each score later
- design score-statistic displays so low applicant counts do not overstate precision

When implementing AI features:

1. Keep AI out of rejection and scoring in the proof of concept.
2. Tell applicants when AI is used to generate clarification prompts.
3. Store enough implementation notes to make a later AI risk review possible.
4. Do not block core proof-of-concept workflow delivery on a full AI compliance review.
5. Treat recruitment AI as a future legal-review topic even when outputs are advisory.

## Compliance Watchlist

Do not block implementation on full legal analysis yet, but keep these concerns visible in design notes:

- GDPR and UK GDPR retention expectations for applicant data and uploaded files
- offline exports creating separate recruiter-controlled copies of applicant data
- controller, processor, and lawful-basis questions deferred for later legal review
- ability to demonstrate access control, audit logging, file security, and retention actions
- consent quality concerns if future-role retention or export consent is bundled, pre-ticked, or hard to withdraw
- profiling concerns if applicant scoring distributions are shown back to users
- transparency requirements around AI-assisted clarification and summaries
- deletion and retention tension when applicants want history preserved but recruiters should not retain personal data
- avoiding use or exposure of special category data in scoring or review flows
- recruitment AI may trigger high-risk AI or automated decision-making review, so AI use should be reviewed after the proof-of-concept workflow is meaningful

## Suggested Technical Direction

Unless the user requests otherwise, prefer:

- `Next.js` with TypeScript
- `PostgreSQL`
- `Prisma` or `Drizzle`
- `Tailwind CSS`
- `Clerk` for managed proof-of-concept authentication
- `S3`-compatible storage
- `Cloudflare Turnstile`
- `Cloudflare` WAF and rate limiting
- `Sentry`
- `Inngest` or `Trigger.dev` for background AI work

Keep the first implementation monolithic and modular. Do not introduce microservices early unless there is a clear, current need.

## Working Style For Future Agents

When making changes in this repository:

1. Read `README.md` first.
2. Preserve the product thesis of transparency and structured evidence.
3. Favor small, end-to-end slices over broad but shallow scaffolding.
4. Document domain decisions as they emerge.
5. Flag ethical or legal risk when a feature touches AI scoring, comparative feedback, or applicant visibility, but do not let speculative risk block the proof-of-concept user story.
6. Use numbered lists in user-facing discussion so product decisions can be referenced precisely.

## Recommended Proof-Of-Concept Build Sequence

1. Define core schema and user roles.
2. Build auth and role-aware routing.
3. Build recruiter job posting flow.
4. Build applicant browsing and application flow.
5. Build recruiter review table and status transitions.
6. Build applicant dashboard and status timeline.
7. Add AI-generated tests.
8. Add AI clarification.
9. Add statistics and feedback surfaces.

## Open Product Questions

The following questions remain unresolved and should be clarified before heavy implementation:

- What uncertainty display should accompany statistics for applicant pools with 2 or more people?
- Is email notification enough for the proof of concept, or should in-app messaging be added soon after?
- Should the bespoke test be optional for each role, or required by default?
- What later legal review should cover controller, processor, lawful-basis, retention, export obligations, and AI risk?

## Documentation Standard

Until code exists, prioritize clean product docs over speculative scaffolding.

When adding new documentation:

- prefer concise, decision-oriented writing
- state assumptions explicitly
- separate current decisions from open questions
- keep proof-of-concept scope tight
