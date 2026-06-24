import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplicationsForJob, getJobById } from "@/lib/demo-data";

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function CloseJobPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  const applications = getApplicationsForJob(job.id);
  const exportable = applications.filter((application) => application.consents.recruiterExport);

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Close role</p>
          <h1>{job.title}</h1>
          <p className="lede">
            Closing the role removes recruiter in-app access to applicant
            personal data while keeping applicant history visible.
          </p>
        </div>
      </section>

      <section className="grid two">
        <article className="card">
          <div className="card-body form-grid">
            <h2>Closure decision</h2>
            <div className="field">
              <label htmlFor="status">Final role status</label>
              <select id="status" name="status" defaultValue="completed">
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="note">Closure note</label>
              <textarea
                id="note"
                name="note"
                defaultValue="Role completed. Applicant-facing history remains visible."
              />
            </div>
          </div>
          <div className="card-footer">
            <Link className="button" href={`/recruiter/jobs/${job.id}`}>
              Close demo role
            </Link>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <h2>Export warning</h2>
            <div className="notice">
              Exports include applicant-submitted data only, and only for
              applicants who consented to export. Offline copies become the
              recruiter&apos;s responsibility.
            </div>
            <div className="grid" style={{ marginTop: 14 }}>
              <div className="stat">
                <strong>{applications.length}</strong>
                <span className="muted">total applications</span>
              </div>
              <div className="stat">
                <strong>{exportable.length}</strong>
                <span className="muted">export-consented applications</span>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="ghost-button" type="button">
              Export consented data
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
