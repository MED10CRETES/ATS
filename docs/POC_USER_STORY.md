# Proof-Of-Concept User Story

This document defines the first buildable product story for the ATS proof of concept.

The goal is not to build a production-ready ATS. The goal is to show a compelling end-to-end hiring workflow built around transparency, structured evidence, and applicant-visible progress.

## POC Narrative

An in-house recruiter posts a role, adds role-specific questions, defines a rubric, receives applications, reviews applicants in a structured table, moves applicants through transparent stages, and closes the role.

An applicant browses jobs, applies with standard and structured materials, answers role-specific questions, responds to AI-assisted clarification prompts, and can later see the status of their application, the status of the role, and comparative role statistics.

## Core Product Pillars Demonstrated

1. Applicants can see precise role and application status.
2. Recruiters can define bespoke application questions for each role.
3. Applicants can provide richer evidence than CV and cover letter alone.
4. AI can ask advisory clarification questions without rejecting or scoring applicants.
5. Recruiters can compare applicants in a structured table.
6. Applicants can see role statistics and their own score context.
7. Closed or cancelled roles remain visible to applicants who applied.

## Primary POC Actors

1. Recruiter
2. Applicant

## Recruiter Story

As an in-house recruiter, I want to publish a role with transparent stages and structured application questions so that applicants understand the process and I can compare applications consistently.

### Recruiter Journey

1. Recruiter creates or signs into an account.
2. Recruiter creates their recruiter profile.
3. Recruiter creates a job post.
4. Recruiter defines hiring stages.
5. Recruiter adds role-specific application questions.
6. Recruiter defines a scoring rubric.
7. Recruiter publishes the job.
8. Recruiter views submitted applications in a table.
9. Recruiter opens an applicant detail view.
10. Recruiter scores applicants using the recruiter-defined rubric.
11. Recruiter moves applicants through stages.
12. Recruiter completes or cancels the role.
13. Recruiter loses in-app access to applicant personal data after closure.
14. Recruiter keeps anonymized role reporting and role metadata.

### Recruiter Screens

1. Recruiter dashboard
2. Create job page
3. Job edit page
4. Question builder
5. Rubric builder
6. Applicant review table
7. Applicant detail view
8. Role closure screen

### Recruiter Happy Path

1. The recruiter signs in.
2. The recruiter clicks `Create job`.
3. The recruiter enters title, description, location, salary, and job status.
4. The recruiter defines the shared stage list.
5. The recruiter adds bespoke application questions.
6. The recruiter defines scoring criteria, weights, and scale.
7. The recruiter publishes the role.
8. The recruiter receives submitted applications.
9. The recruiter reviews applicants in a structured table.
10. The recruiter scores each applicant.
11. The recruiter moves applicants through stages.
12. The recruiter closes the role as `completed` or `cancelled`.

### Recruiter Acceptance Criteria

1. Recruiter can create a job in `draft` status.
2. Recruiter can publish a job as `open`.
3. Recruiter can define stages that are visible to both recruiter and applicant.
4. Recruiter can add role-specific questions.
5. Recruiter can create a rubric with criteria, weights, and score scale.
6. Recruiter can see applicants in a role-specific table.
7. Recruiter can open applicant-submitted data before role closure.
8. Recruiter can score applicants using the rubric.
9. Recruiter can change an application stage.
10. Recruiter can close a role as `completed` or `cancelled`.
11. Recruiter cannot access applicant personal data in-app after role closure.
12. Recruiter can still see anonymized role reporting after role closure.

## Applicant Story

As an applicant, I want to apply to a role and track the real hiring process so that my application does not disappear into a black box.

### Applicant Journey

1. Applicant browses open jobs.
2. Applicant opens a job detail page.
3. Applicant sees the role status and hiring stages.
4. Applicant starts an application.
5. Applicant enters profile details for this application.
6. Applicant uploads CV and cover letter.
7. Applicant answers role-specific application questions.
8. Applicant answers data declarations.
9. Applicant answers AI-assisted clarification questions if present.
10. Applicant submits the application.
11. Applicant sees their application dashboard.
12. Applicant sees role status, application stage, applicant count, and score context.
13. Applicant can still see the closed or cancelled role after closure.

### Applicant Screens

1. Public jobs list
2. Job detail page
3. Application form
4. Applicant data declarations
5. AI clarification step
6. Application submitted confirmation
7. Applicant dashboard
8. Application detail page
9. Closed role detail view

### Applicant Happy Path

1. The applicant opens the public jobs list.
2. The applicant selects an open job.
3. The applicant reviews the job advert, role status, and stage list.
4. The applicant clicks `Apply`.
5. The applicant enters name, email, and application details.
6. The applicant uploads CV and cover letter.
7. The applicant answers bespoke questions.
8. The applicant answers consent declarations.
9. The applicant responds to AI clarification prompts.
10. The applicant submits the application.
11. The applicant opens their dashboard.
12. The applicant sees `submitted` as the current stage.
13. The applicant later sees stage changes made by the recruiter.
14. The applicant sees role-level applicant count and score statistics once at least 2 applicants exist.
15. The applicant continues to see the role after it is completed or cancelled.

### Applicant Acceptance Criteria

1. Applicant can view open jobs without recruiter access.
2. Applicant can view a job detail page.
3. Applicant can see the same stage names the recruiter uses.
4. Applicant can submit an application with profile fields.
5. Applicant can upload CV and cover letter.
6. Applicant can answer bespoke questions.
7. Applicant can decline future-role retention consent and still apply.
8. Applicant can decline export consent and still apply.
9. Applicant can answer AI clarification prompts.
10. Applicant can see application status after submission.
11. Applicant can see role status after submission.
12. Applicant can see applicant count.
13. Applicant can see score context when at least 2 applicants exist.
14. Applicant can see whether the role was completed or cancelled.
15. Applicant can view their closed-role history indefinitely for the proof of concept.

## Shared Stage Names

Stage names are shared between recruiter and applicant for the proof of concept.

This is deliberate. The product value is transparency, and applicants should not receive softened or translated status labels.

Suggested initial stages:

1. `submitted`
2. `screening`
3. `interview`
4. `offer`
5. `rejected`
6. `withdrawn`

Suggested role statuses:

1. `draft`
2. `open`
3. `paused`
4. `completed`
5. `cancelled`

## Application Data Declarations

Each application includes two separate declarations.

### Future-Role Retention

Question:

1. Do you consent to this recruiter keeping your application data so they can consider you for other positions?

Rules:

1. Default is unchecked or `no`.
2. Declining does not block applying.
3. Consent is recorded against the application.
4. Withdrawal is recorded for later implementation but does not need a self-service dashboard in the proof of concept.

### Recruiter Export

Question:

1. Do you consent to this recruiter exporting your application data from the platform?

Rules:

1. Default is unchecked or `no`.
2. Declining does not block applying.
3. Consent is recorded against the application.
4. Recruiter exports include applicant-submitted data only.
5. Recruiter exports exclude scores, notes, and comparative analytics.

## Recruiter Export Rules

Applicant-submitted data includes:

1. Applicant profile fields submitted for that application
2. CV file
3. Cover letter file
4. Application form answers
5. Bespoke test answers
6. AI clarification responses
7. Applicant consent declarations

Applicant export excludes:

1. Recruiter rubric scores
2. Score distributions
3. Recruiter notes
4. Internal decision comments
5. Comparative analytics for the role

## AI In The POC

AI exists to support the story, not to decide outcomes.

POC AI features:

1. Generate draft application questions from a job advert.
2. Generate clarification prompts based on the role and submitted application.

AI guardrails:

1. AI does not reject applicants.
2. AI does not score applicants.
3. AI-generated questions are reviewed by the recruiter before publishing.
4. AI clarification prompts are framed as a chance for the applicant to add context.
5. Applicants are told when AI is used to generate clarification prompts.
6. AI risk review happens after the proof-of-concept workflow is meaningful.

## Statistics And Feedback

The applicant-facing dashboard should show:

1. Application stage
2. Role status
3. Stage reached
4. Applicant count
5. Applicant score
6. Mean score once at least 2 applicants exist
7. Median score once at least 2 applicants exist
8. Score distribution once at least 2 applicants exist
9. Low-sample or uncertainty warning

## POC Success Criteria

The proof of concept is successful if:

1. A recruiter can publish and close a job.
2. An applicant can apply without confusion.
3. The applicant can see precise stage and role status.
4. The recruiter can review and score applicants in a structured table.
5. The applicant can see meaningful statistics after applying.
6. Closed or cancelled jobs remain visible to applicants who applied.
7. Recruiter in-app access to applicant personal data ends after role closure.
8. The product demonstrates how a transparency-first ATS differs from a traditional ATS.

## Deferred From POC

1. Multi-seat recruiter collaboration
2. Enterprise admin tools
3. Full recruiting CRM
4. Interview scheduling integrations
5. AI scoring
6. AI rejection
7. Legal review of controller, processor, lawful-basis, retention, export, and AI obligations
8. Full applicant self-service consent withdrawal
9. Production-ready security and compliance certification
