import Link from "next/link";
import { demoJobs, getApplicationsForJob, getRoleStats } from "@/lib/demo-data";
import { StatGrid } from "@/components/stat-grid";
import { StatusPill } from "@/components/status-pill";

export default function HomePage() {
  const job = demoJobs[0];
  const applications = getApplicationsForJob(job.id);
  const stats = getRoleStats(job.id);

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Proof of concept</p>
          <h1>Hiring status that applicants can actually see.</h1>
          <p className="lede">
            A working ATS story for transparent roles, role-specific evidence,
            recruiter-defined scoring, and closed-role visibility.
          </p>
        </div>
        <Link className="button" href="/jobs">
          Browse jobs
        </Link>
      </section>

      <StatGrid
        stats={[
          { label: "Open roles", value: demoJobs.filter((item) => item.status === "open").length },
          { label: "Applicants", value: applications.length },
          { label: "Mean score", value: stats.meanScore },
          { label: "Current stage", value: "screening" },
        ]}
      />

      <section className="grid two" style={{ marginTop: 22 }}>
        <article className="card">
          <div className="card-body">
            <div className="split-row">
              <div>
                <p className="eyebrow">Recruiter story</p>
                <h2>{job.title}</h2>
              </div>
              <StatusPill value={job.status} />
            </div>
            <p className="muted">
              The recruiter can publish the role, review structured answers,
              score applicants with their rubric, and close the job without the
              applicant history disappearing.
            </p>
          </div>
          <div className="card-footer">
            <Link className="button" href={`/recruiter/jobs/${job.id}`}>
              Review applicants
            </Link>
            <Link className="ghost-button" href="/recruiter/jobs/new">
              Draft job
            </Link>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <p className="eyebrow">Applicant story</p>
            <h2>Application timeline</h2>
            <p className="muted">
              Applicants see the same stage names recruiters use, current role
              status, applicant count, score context, and the final outcome if
              the role is completed or cancelled.
            </p>
          </div>
          <div className="card-footer">
            <Link className="button" href="/applicant">
              View dashboard
            </Link>
            <Link className="ghost-button" href={`/jobs/${job.id}/apply`}>
              Apply flow
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
