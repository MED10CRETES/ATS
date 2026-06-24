import Link from "next/link";
import { notFound } from "next/navigation";
import { StageTimeline } from "@/components/stage-timeline";
import { StatusPill } from "@/components/status-pill";
import { getJobById, getRoleStats } from "@/lib/demo-data";

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function JobDetailPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  const stats = getRoleStats(job.id);

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">{job.location}</p>
          <h1>{job.title}</h1>
          <p className="lede">{job.description}</p>
        </div>
        <StatusPill value={job.status} />
      </section>

      <section className="grid two">
        <article className="card">
          <div className="card-body">
            <h2>Role status</h2>
            <div className="grid">
              <div className="stat">
                <strong>{stats.applicantCount}</strong>
                <span className="muted">applicants</span>
              </div>
              <div className="notice">
                Comparative statistics start at 2 applicants and show the
                applicant count that they are based on.
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link className="button" href={`/jobs/${job.id}/apply`}>
              Apply to this role
            </Link>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <h2>Shared stages</h2>
            <StageTimeline currentStage="submitted" />
          </div>
        </article>
      </section>

      <section className="grid two" style={{ marginTop: 18 }}>
        <article className="card">
          <div className="card-body">
            <h2>Application questions</h2>
            <div className="grid">
              {job.questions.map((question) => (
                <div className="stat" key={question.id}>
                  <strong>{question.prompt}</strong>
                  <span className="muted">
                    {question.type} · {question.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <h2>Recruiter rubric</h2>
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
        </article>
      </section>
    </main>
  );
}
