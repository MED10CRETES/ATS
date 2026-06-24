import Link from "next/link";
import { getOpenJobs } from "@/lib/demo-data";
import { StatusPill } from "@/components/status-pill";

export default function JobsPage() {
  const jobs = getOpenJobs();

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Open roles</p>
          <h1>Jobs with visible process status.</h1>
          <p className="lede">
            Applicants see the role status and shared stage names before they
            apply.
          </p>
        </div>
      </section>

      <section className="grid two">
        {jobs.map((job) => (
          <article className="card" key={job.id}>
            <div className="card-body">
              <div className="split-row">
                <div>
                  <p className="eyebrow">{job.location}</p>
                  <h2>{job.title}</h2>
                </div>
                <StatusPill value={job.status} />
              </div>
              <p className="muted">{job.summary}</p>
              <p>
                <strong>{job.salaryText}</strong>
              </p>
            </div>
            <div className="card-footer">
              <Link className="button" href={`/jobs/${job.id}`}>
                View role
              </Link>
              <Link className="ghost-button" href={`/jobs/${job.id}/apply`}>
                Apply
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
