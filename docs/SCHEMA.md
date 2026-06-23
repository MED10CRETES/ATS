# Initial Schema Design

This document defines the first schema direction for the ATS proof of concept.

The schema should support a compelling end-to-end POC before it tries to support enterprise ATS complexity.

## Design Principles

1. Model the proof-of-concept workflow first.
2. Keep recruiter and applicant contexts separate.
3. Store submitted application data as an application-time snapshot.
4. Use shared stage names for recruiter and applicant transparency.
5. Keep AI out of scoring and rejection.
6. Support consent-aware exports.
7. Remove recruiter in-app access to applicant personal data when a role closes.
8. Preserve applicant access to their own closed-role history.

## Suggested Enums

### UserRole

1. `applicant`
2. `recruiter`

### JobStatus

1. `draft`
2. `open`
3. `paused`
4. `completed`
5. `cancelled`

### ApplicationStage

1. `submitted`
2. `screening`
3. `interview`
4. `offer`
5. `rejected`
6. `withdrawn`

### QuestionType

1. `short_text`
2. `long_text`
3. `single_select`
4. `multi_select`
5. `numeric`

### ApplicationFileType

1. `cv`
2. `cover_letter`
3. `other`

### ConsentType

1. `future_role_retention`
2. `recruiter_export`

### ConsentValue

1. `accepted`
2. `declined`
3. `withdrawn`

### DataExportStatus

1. `requested`
2. `completed`
3. `failed`

### FileScanStatus

1. `pending`
2. `clean`
3. `suspicious`
4. `failed`

## Core Tables

## User

Represents an authenticated account.

Fields:

1. `id`
2. `email`
3. `role`
4. `createdAt`
5. `updatedAt`

Notes:

1. Authentication should be managed by Clerk or another provider.
2. Store provider user ID if needed by implementation.

## RecruiterProfile

Represents the single recruiter seat for the proof of concept.

Fields:

1. `id`
2. `userId`
3. `displayName`
4. `companyName`
5. `jobTitle`
6. `createdAt`
7. `updatedAt`

Relationships:

1. One recruiter profile belongs to one user.
2. One recruiter profile owns many jobs.

## ApplicantProfile

Represents an applicant account and application history view.

Fields:

1. `id`
2. `userId`
3. `displayName`
4. `createdAt`
5. `updatedAt`

Relationships:

1. One applicant profile belongs to one user.
2. One applicant profile has many applications.

Notes:

1. Do not treat this as a rich reusable candidate profile in the proof of concept.
2. Submitted application fields are stored on each application.

## Job

Represents a recruiter-owned role.

Fields:

1. `id`
2. `recruiterProfileId`
3. `title`
4. `summary`
5. `description`
6. `location`
7. `salaryText`
8. `status`
9. `publishedAt`
10. `closedAt`
11. `createdAt`
12. `updatedAt`

Relationships:

1. One job belongs to one recruiter profile.
2. One job has many questions.
3. One job has many rubric criteria.
4. One job has many applications.
5. One job has many lifecycle events.

Access rules:

1. `open` jobs appear in the public jobs list.
2. `completed` and `cancelled` jobs are hidden from the public jobs list.
3. Applicants who applied can still view closed or cancelled jobs.
4. Recruiters lose in-app access to applicant personal data when a job is completed or cancelled.

## JobLifecycleEvent

Records role status changes.

Fields:

1. `id`
2. `jobId`
3. `fromStatus`
4. `toStatus`
5. `changedByUserId`
6. `note`
7. `createdAt`

Notes:

1. Use this for applicant-visible role history.
2. Keep status labels precise and shared.

## JobStage

Represents shared recruiter/applicant stage names for a job.

Fields:

1. `id`
2. `jobId`
3. `name`
4. `position`
5. `isTerminal`
6. `createdAt`
7. `updatedAt`

Notes:

1. Stage names are visible to both recruiter and applicant.
2. Initial defaults can match the `ApplicationStage` enum.
3. If custom stages are added later, keep applicant visibility intact.

## JobQuestion

Represents a bespoke application question for a job.

Fields:

1. `id`
2. `jobId`
3. `type`
4. `prompt`
5. `helpText`
6. `optionsJson`
7. `position`
8. `isRequired`
9. `isActive`
10. `source`
11. `createdAt`
12. `updatedAt`

Notes:

1. `source` can be `manual` or `ai_generated`.
2. AI-generated questions must be reviewed before publishing.

## ScoreRubric

Represents the recruiter-defined rubric for a job.

Fields:

1. `id`
2. `jobId`
3. `name`
4. `description`
5. `scoreScaleMin`
6. `scoreScaleMax`
7. `createdAt`
8. `updatedAt`

Relationships:

1. One score rubric belongs to one job.
2. One score rubric has many criteria.

Notes:

1. Recruiter defines the rubric shape.
2. AI does not generate applicant scores in the proof of concept.

## RubricCriterion

Represents one scoring criterion in a recruiter-defined rubric.

Fields:

1. `id`
2. `scoreRubricId`
3. `name`
4. `description`
5. `weight`
6. `position`
7. `createdAt`
8. `updatedAt`

## Application

Represents one applicant's application to one job.

Fields:

1. `id`
2. `jobId`
3. `applicantProfileId`
4. `stage`
5. `submittedAt`
6. `applicantNameSnapshot`
7. `applicantEmailSnapshot`
8. `phoneSnapshot`
9. `locationSnapshot`
10. `createdAt`
11. `updatedAt`

Relationships:

1. One application belongs to one job.
2. One application belongs to one applicant profile.
3. One application has many answers.
4. One application has many files.
5. One application has many consent records.
6. One application has many status events.
7. One application has zero or more clarification records.
8. One application has zero or more scores.

Access rules:

1. Applicant can view their own application indefinitely for the proof of concept.
2. Recruiter can view personal applicant data while the job is active.
3. Recruiter loses in-app access to personal applicant data after job closure.
4. Recruiter may view anonymized reporting after job closure.

## ApplicationAnswer

Represents an answer to a job question.

Fields:

1. `id`
2. `applicationId`
3. `jobQuestionId`
4. `valueText`
5. `valueJson`
6. `createdAt`
7. `updatedAt`

## ApplicationFile

Represents an uploaded applicant file.

Fields:

1. `id`
2. `applicationId`
3. `type`
4. `storageKey`
5. `originalFilename`
6. `contentType`
7. `sizeBytes`
8. `scanStatus`
9. `uploadedAt`

Access rules:

1. Files are stored in private object storage.
2. Files are accessed by short-lived signed URL.
3. Recruiter access is blocked after role closure.

## FileScanResult

Represents the malware or safety scan result for an uploaded file.

Fields:

1. `id`
2. `applicationFileId`
3. `status`
4. `scannerName`
5. `scannerVersion`
6. `resultSummary`
7. `scannedAt`
8. `createdAt`

Rules:

1. Recruiters should not download files until the scan status is `clean`.
2. Suspicious or failed files should remain unavailable to recruiters.
3. Scan outcomes should be reflected in security audit events.

## ApplicationClarification

Represents an AI-assisted clarification prompt and applicant response.

Fields:

1. `id`
2. `applicationId`
3. `prompt`
4. `response`
5. `source`
6. `createdAt`
7. `answeredAt`

Notes:

1. `source` can be `ai_generated` or `manual`.
2. Clarification is advisory only.
3. Clarification does not generate applicant score.

## ApplicationConsent

Represents one consent declaration for one application.

Fields:

1. `id`
2. `applicationId`
3. `type`
4. `value`
5. `wordingVersion`
6. `decidedAt`
7. `withdrawnAt`
8. `createdAt`
9. `updatedAt`

Rules:

1. Store one record for future-role retention.
2. Store one record for recruiter export.
3. Default is declined.
4. Declining does not block applying.
5. Withdrawal is designed for later implementation.

## ApplicationStatusEvent

Represents stage changes for an application.

Fields:

1. `id`
2. `applicationId`
3. `fromStage`
4. `toStage`
5. `changedByUserId`
6. `note`
7. `createdAt`

Rules:

1. Stage labels are shared between recruiter and applicant.
2. Applicants can see their own stage history.

## ApplicationScore

Represents recruiter-entered rubric scoring for an application.

Fields:

1. `id`
2. `applicationId`
3. `rubricCriterionId`
4. `score`
5. `evidenceNote`
6. `scoredByUserId`
7. `createdAt`
8. `updatedAt`

Rules:

1. Scores are recruiter-entered.
2. AI does not generate scores.
3. Scores are used for role-specific comparison only.
4. Scores are not included in recruiter offline exports.

## RecruiterNote

Represents internal recruiter notes.

Fields:

1. `id`
2. `applicationId`
3. `recruiterProfileId`
4. `body`
5. `createdAt`
6. `updatedAt`

Access rules:

1. Recruiter notes are never visible to applicants.
2. Recruiter notes are not included in applicant-submitted data export.

## DataExportLog

Represents an applicant data export event.

Fields:

1. `id`
2. `jobId`
3. `recruiterProfileId`
4. `requestedByUserId`
5. `status`
6. `exportType`
7. `includedApplicationIdsJson`
8. `excludedApplicationIdsJson`
9. `createdAt`
10. `completedAt`

Rules:

1. Only include applicants who consented to export.
2. Include applicant-submitted data only.
3. Exclude scores, recruiter notes, and comparative analytics.
4. Show a recruiter responsibility warning before export.
5. Require recent authentication when practical.

## SecurityAuditEvent

Represents important security and data access events.

Fields:

1. `id`
2. `actorUserId`
3. `eventType`
4. `targetType`
5. `targetId`
6. `metadataJson`
7. `createdAt`

Events to log:

1. Application submission
2. Application stage change
3. Job status change
4. Recruiter viewing applicant personal data
5. Recruiter export requested
6. Recruiter export completed
7. Consent declaration recorded
8. File uploaded
9. File downloaded
10. File scan result recorded

## Notification

Represents a notification or email event.

Fields:

1. `id`
2. `userId`
3. `type`
4. `subject`
5. `body`
6. `sentAt`
7. `readAt`
8. `createdAt`

## Derived Reporting

The proof of concept can calculate reporting from stored data rather than introduce heavy reporting tables.

Applicant-visible reporting:

1. Applicant count for the role
2. Applicant's own stage
3. Applicant's own score
4. Mean score for the role
5. Median score for the role
6. Score distribution
7. Role status
8. Stage reached

Recruiter-visible reporting after closure:

1. Applicant count
2. Stage counts
3. Mean score
4. Median score
5. Score distribution
6. Anonymized aggregate summary

## Closure Access Rule

When a job status changes to `completed` or `cancelled`:

1. Remove recruiter in-app access to applicant personal data.
2. Preserve applicant access to their own application and the role outcome.
3. Preserve recruiter access to job metadata.
4. Preserve recruiter access to anonymized aggregate reporting.
5. Preserve audit logs.
6. Keep applicant-submitted data available for applicant history.

## POC Build Slices

### Slice 1: Core Accounts And Jobs

1. User
2. RecruiterProfile
3. ApplicantProfile
4. Job
5. JobLifecycleEvent
6. JobStage

### Slice 2: Application Submission

1. JobQuestion
2. Application
3. ApplicationAnswer
4. ApplicationFile
5. ApplicationConsent

### Slice 3: Recruiter Review

1. ScoreRubric
2. RubricCriterion
3. ApplicationScore
4. ApplicationStatusEvent
5. RecruiterNote

### Slice 4: Transparency Dashboard

1. Applicant-visible status
2. Role status
3. Applicant count
4. Score context
5. Closed-role visibility

### Slice 5: Export And Audit

1. DataExportLog
2. SecurityAuditEvent
3. FileScanResult
4. Consent-aware export filtering

### Slice 6: AI Assistance

1. AI-generated draft questions
2. AI clarification prompts
3. Applicant clarification responses
4. Later AI risk review notes
