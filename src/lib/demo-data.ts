export const applicationStages = [
  "submitted",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
] as const;

export const jobStatuses = ["draft", "open", "paused", "completed", "cancelled"] as const;

export type ApplicationStage = (typeof applicationStages)[number];
export type JobStatus = (typeof jobStatuses)[number];
export type QuestionType = "short_text" | "long_text" | "single_select" | "multi_select" | "numeric";

export type JobQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  required: boolean;
  source: "manual" | "ai_generated";
  options?: string[];
};

export type RubricCriterion = {
  id: string;
  name: string;
  weight: number;
  scale: string;
};

export type Job = {
  id: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  salaryText: string;
  status: JobStatus;
  stages: ApplicationStage[];
  questions: JobQuestion[];
  rubric: RubricCriterion[];
};

export type Application = {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  stage: ApplicationStage;
  score: number;
  submittedAt: string;
  answers: Array<{ question: string; answer: string }>;
  files: Array<{ type: "cv" | "cover_letter"; filename: string; scanStatus: "clean" | "pending" }>;
  clarificationResponses: Array<{ prompt: string; response: string }>;
  consents: {
    futureRoleRetention: boolean;
    recruiterExport: boolean;
  };
};

export type ScoreBucket = {
  label: string;
  count: number;
};

export const demoJobs: Job[] = [
  {
    id: "product-analyst",
    title: "Product Analyst",
    summary: "A role for someone who can turn messy product data into sharp decisions.",
    description:
      "Work with product, design, and engineering to investigate user behaviour, define decision metrics, and explain tradeoffs in plain language.",
    location: "Hybrid, Manchester",
    salaryText: "£48,000 - £58,000",
    status: "open",
    stages: [...applicationStages],
    questions: [
      {
        id: "q1",
        type: "long_text",
        prompt: "Describe a time you changed a product decision using evidence.",
        required: true,
        source: "manual",
      },
      {
        id: "q2",
        type: "single_select",
        prompt: "Which analysis mode is your strongest?",
        required: true,
        source: "ai_generated",
        options: ["Experiment analysis", "Funnel analysis", "Research synthesis", "Forecasting"],
      },
      {
        id: "q3",
        type: "numeric",
        prompt: "How many years have you worked with SQL or analytics tooling?",
        required: true,
        source: "ai_generated",
      },
    ],
    rubric: [
      { id: "r1", name: "Evidence quality", weight: 40, scale: "0-40" },
      { id: "r2", name: "Communication", weight: 30, scale: "0-30" },
      { id: "r3", name: "Role-specific experience", weight: 30, scale: "0-30" },
    ],
  },
  {
    id: "people-ops-lead",
    title: "People Operations Lead",
    summary: "A hands-on role building transparent processes for a growing team.",
    description:
      "Own people operations, hiring coordination, onboarding, and policy quality for a 70-person company.",
    location: "Remote, UK",
    salaryText: "£55,000 - £65,000",
    status: "open",
    stages: [...applicationStages],
    questions: [
      {
        id: "q4",
        type: "long_text",
        prompt: "How would you improve a hiring process that applicants describe as opaque?",
        required: true,
        source: "manual",
      },
    ],
    rubric: [
      { id: "r4", name: "Operational clarity", weight: 50, scale: "0-50" },
      { id: "r5", name: "Candidate empathy", weight: 50, scale: "0-50" },
    ],
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    summary: "Build workflow-heavy interfaces for recruiters and applicants.",
    description:
      "Create accessible, dense, and resilient product interfaces for a transparency-first ATS.",
    location: "London",
    salaryText: "£70,000 - £85,000",
    status: "completed",
    stages: [...applicationStages],
    questions: [
      {
        id: "q5",
        type: "long_text",
        prompt: "Describe a complex workflow interface you made easier to use.",
        required: true,
        source: "manual",
      },
    ],
    rubric: [
      { id: "r6", name: "Workflow judgement", weight: 60, scale: "0-60" },
      { id: "r7", name: "Technical execution", weight: 40, scale: "0-40" },
    ],
  },
];

export const demoApplications: Application[] = [
  {
    id: "app-001",
    jobId: "product-analyst",
    applicantName: "Maya Patel",
    applicantEmail: "maya@example.com",
    stage: "screening",
    score: 82,
    submittedAt: "2026-06-22",
    answers: [
      {
        question: "Describe a time you changed a product decision using evidence.",
        answer: "I used retention cohorts to pause a roadmap item and redirect the team to onboarding.",
      },
      {
        question: "Which analysis mode is your strongest?",
        answer: "Funnel analysis",
      },
    ],
    files: [
      { type: "cv", filename: "maya-patel-cv.pdf", scanStatus: "clean" },
      { type: "cover_letter", filename: "maya-patel-cover.pdf", scanStatus: "clean" },
    ],
    clarificationResponses: [
      {
        prompt: "Can you clarify how much of the SQL analysis you performed directly?",
        response: "I wrote the cohort queries directly and paired with analytics engineering for validation.",
      },
    ],
    consents: {
      futureRoleRetention: true,
      recruiterExport: true,
    },
  },
  {
    id: "app-002",
    jobId: "product-analyst",
    applicantName: "Owen Ellis",
    applicantEmail: "owen@example.com",
    stage: "submitted",
    score: 68,
    submittedAt: "2026-06-23",
    answers: [
      {
        question: "Describe a time you changed a product decision using evidence.",
        answer: "I compared support tags against activation data to reshape a billing workflow.",
      },
      {
        question: "Which analysis mode is your strongest?",
        answer: "Experiment analysis",
      },
    ],
    files: [{ type: "cv", filename: "owen-ellis-cv.docx", scanStatus: "clean" }],
    clarificationResponses: [
      {
        prompt: "Can you add more detail about the experiment design?",
        response: "The test used account-level randomisation and a two-week guardrail review.",
      },
    ],
    consents: {
      futureRoleRetention: false,
      recruiterExport: false,
    },
  },
  {
    id: "app-003",
    jobId: "product-analyst",
    applicantName: "Lina Chen",
    applicantEmail: "lina@example.com",
    stage: "interview",
    score: 91,
    submittedAt: "2026-06-21",
    answers: [
      {
        question: "Describe a time you changed a product decision using evidence.",
        answer: "I linked qualitative research themes to activation metrics and changed the launch plan.",
      },
      {
        question: "Which analysis mode is your strongest?",
        answer: "Research synthesis",
      },
    ],
    files: [
      { type: "cv", filename: "lina-chen-cv.pdf", scanStatus: "clean" },
      { type: "cover_letter", filename: "lina-chen-cover.pdf", scanStatus: "clean" },
    ],
    clarificationResponses: [],
    consents: {
      futureRoleRetention: true,
      recruiterExport: false,
    },
  },
];

export function getOpenJobs() {
  return demoJobs.filter((job) => job.status === "open");
}

export function getJobById(jobId: string) {
  return demoJobs.find((job) => job.id === jobId);
}

export function getApplicationsForJob(jobId: string) {
  return demoApplications.filter((application) => application.jobId === jobId);
}

export function getApplicationById(applicationId: string) {
  return demoApplications.find((application) => application.id === applicationId);
}

export function getRoleStats(jobId: string) {
  const applications = getApplicationsForJob(jobId);
  const scores = applications.map((application) => application.score).sort((a, b) => a - b);
  const applicantCount = applications.length;
  const total = scores.reduce((sum, score) => sum + score, 0);
  const meanScore = applicantCount ? Math.round(total / applicantCount) : 0;
  const medianScore =
    applicantCount === 0
      ? 0
      : applicantCount % 2
        ? scores[Math.floor(applicantCount / 2)]
        : Math.round((scores[applicantCount / 2 - 1] + scores[applicantCount / 2]) / 2);

  return {
    applicantCount,
    meanScore,
    medianScore,
    distribution: buildDistribution(scores),
  };
}

function buildDistribution(scores: number[]): ScoreBucket[] {
  const buckets: ScoreBucket[] = [
    { label: "0-49", count: 0 },
    { label: "50-64", count: 0 },
    { label: "65-79", count: 0 },
    { label: "80-89", count: 0 },
    { label: "90-100", count: 0 },
  ];

  scores.forEach((score) => {
    if (score < 50) buckets[0].count += 1;
    else if (score < 65) buckets[1].count += 1;
    else if (score < 80) buckets[2].count += 1;
    else if (score < 90) buckets[3].count += 1;
    else buckets[4].count += 1;
  });

  return buckets;
}
