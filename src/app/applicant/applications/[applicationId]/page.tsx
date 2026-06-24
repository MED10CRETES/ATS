import { notFound } from "next/navigation";
import { StageTimeline } from "@/components/stage-timeline";
import { StatusPill } from "@/components/status-pill";
import { getApplicationById, getJobById } from "@/lib/demo-data";

type PageProps = {
  params: Promise<{ applicationId: string }>;
};

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { applicationId } = await params;
  const application = getApplicationById(applicationId);

  if (!application) {
    notFound();
  }

  const job = getJobById(application.jobId);

  if (!job) {
    notFound();
  }

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Application detail</p>
          <h1>{job.title}</h1>
          <p className="lede">
            The applicant keeps read-only access to submitted data and the final
            role outcome for the proof of concept.
          </p>
        </div>
        <StatusPill value={job.status} />
      </section>

      <section className="grid two">
        <article className="card">
          <div className="card-body">
            <h2>Stage reached</h2>
            <StageTimeline currentStage={application.stage} />
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <h2>Submitted files</h2>
            <div className="grid">
              {application.files.map((file) => (
                <div className="stat" key={file.filename}>
                  <strong>{file.filename}</strong>
                  <span className="muted">
                    {file.type} · {file.scanStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="grid two" style={{ marginTop: 18 }}>
        <article className="card">
          <div className="card-body">
            <h2>Application answers</h2>
            <div className="grid">
              {application.answers.map((answer) => (
                <div className="stat" key={answer.question}>
                  <strong>{answer.question}</strong>
                  <p className="muted" style={{ marginBottom: 0 }}>
                    {answer.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <h2>Data declarations</h2>
            <div className="grid">
              <div className="stat">
                <strong>Future-role retention</strong>
                <span className="muted">
                  {application.consents.futureRoleRetention ? "accepted" : "declined"}
                </span>
              </div>
              <div className="stat">
                <strong>Recruiter export</strong>
                <span className="muted">
                  {application.consents.recruiterExport ? "accepted" : "declined"}
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
