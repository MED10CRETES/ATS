import Link from "next/link";
import { StatGrid } from "@/components/stat-grid";
import { StatusPill } from "@/components/status-pill";
import { demoJobs, getApplicationsForJob } from "@/lib/demo-data";

export default function RecruiterDashboardPage() {
  const openJobs = demoJobs.filter((job) => job.status === "open");
  const applicantCount = demoJobs.reduce(
    (count, job) => count + getApplicationsForJob(job.id).length,
    0,
  );

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Recruiter dashboard</p>
          <h1>Role control with transparent applicant status.</h1>
          <p className="lede">
            One recruiter seat, recruiter-owned jobs, shared stage names, and
            role-specific review tables.
          </p>
        </div>
        <Link className="button" href="/recruiter/jobs/new">
          Create job
        </Link>
      </section>

      <StatGrid
        stats={[
          { label: "Open jobs", value: openJobs.length },
          { label: "Applications", value: applicantCount },
          { label: "Closed roles", value: demoJobs.filter((job) => job.status === "completed").length },
          { label: "Seats", value: 1 },
        ]}
      />

      <section className="grid" style={{ marginTop: 22 }}>
        {demoJobs.map((job) => (
          <article className="card" key={job.id}>
            <div className="card-body split-row">
              <div>
                <p className="eyebrow">{job.location}</p>
                <h2>{job.title}</h2>
                <p className="muted" style={{ marginBottom: 0 }}>
                  {getApplicationsForJob(job.id).length} applications · {job.questions.length} questions ·{" "}
                  {job.rubric.length} rubric criteria
                </p>
              </div>
              <StatusPill value={job.status} />
            </div>
            <div className="card-footer">
              <Link className="button" href={`/recruiter/jobs/${job.id}`}>
                Review
              </Link>
              <Link className="ghost-button" href={`/recruiter/jobs/${job.id}/close`}>
                Close role
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
