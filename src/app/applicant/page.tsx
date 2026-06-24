import Link from "next/link";
import { ScoreDistribution } from "@/components/score-distribution";
import { StageTimeline } from "@/components/stage-timeline";
import { StatGrid } from "@/components/stat-grid";
import { StatusPill } from "@/components/status-pill";
import { demoApplications, getJobById, getRoleStats } from "@/lib/demo-data";

export default function ApplicantDashboardPage() {
  const application = demoApplications[0];
  const job = getJobById(application.jobId);

  if (!job) {
    return null;
  }

  const stats = getRoleStats(job.id);

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Applicant dashboard</p>
          <h1>{job.title}</h1>
          <p className="lede">
            Applicant-facing status uses the same stage names as the recruiter
            workflow.
          </p>
        </div>
        <StatusPill value={application.stage} />
      </section>

      <StatGrid
        stats={[
          { label: "Applicants", value: stats.applicantCount },
          { label: "Your score", value: application.score },
          { label: "Mean score", value: stats.meanScore },
          { label: "Median score", value: stats.medianScore },
        ]}
      />

      <section className="grid two" style={{ marginTop: 22 }}>
        <article className="card">
          <div className="card-body">
            <h2>Application stage</h2>
            <StageTimeline currentStage={application.stage} />
          </div>
          <div className="card-footer">
            <Link className="button" href={`/applicant/applications/${application.id}`}>
              Open application
            </Link>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <h2>Score distribution</h2>
            <ScoreDistribution buckets={stats.distribution} />
            <p className="muted" style={{ marginTop: 14, marginBottom: 0 }}>
              Based on {stats.applicantCount} applicants. Small samples are
              fragile, so the applicant count is shown with the statistic.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
