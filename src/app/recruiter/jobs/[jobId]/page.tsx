import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicantTable } from "@/components/applicant-table";
import { ScoreDistribution } from "@/components/score-distribution";
import { StatGrid } from "@/components/stat-grid";
import { StatusPill } from "@/components/status-pill";
import { getJobById, getRoleStats } from "@/lib/demo-data";

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function RecruiterJobPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  const stats = getRoleStats(job.id);
  const isClosed = job.status === "completed" || job.status === "cancelled";

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Recruiter review</p>
          <h1>{job.title}</h1>
          <p className="lede">
            Recruiter review combines submitted answers, files, clarification
            responses, stage, and rubric scores while the role is active.
          </p>
        </div>
        <StatusPill value={job.status} />
      </section>

      <StatGrid
        stats={[
          { label: "Applicants", value: stats.applicantCount },
          { label: "Mean score", value: stats.meanScore },
          { label: "Median score", value: stats.medianScore },
          { label: "Rubric criteria", value: job.rubric.length },
        ]}
      />

      {isClosed ? (
        <section className="notice" style={{ marginTop: 22 }}>
          Recruiter in-app access to applicant personal data has ended for this
          closed role. Aggregate reporting remains visible.
        </section>
      ) : (
        <section style={{ marginTop: 22 }}>
          <ApplicantTable jobId={job.id} />
        </section>
      )}

      <section className="grid two" style={{ marginTop: 18 }}>
        <article className="card">
          <div className="card-body">
            <h2>Score distribution</h2>
            <ScoreDistribution buckets={stats.distribution} />
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h2>Rubric</h2>
            <div className="grid">
              {job.rubric.map((criterion) => (
                <div className="stat" key={criterion.id}>
                  <strong>{criterion.name}</strong>
                  <span className="muted">
                    {criterion.weight}% · {criterion.scale}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <Link className="ghost-button" href={`/recruiter/jobs/${job.id}/close`}>
              Close role
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
