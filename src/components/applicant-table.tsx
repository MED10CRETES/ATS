import Link from "next/link";
import { getApplicationsForJob } from "@/lib/demo-data";
import { StatusPill } from "@/components/status-pill";

export function ApplicantTable({ jobId }: { jobId: string }) {
  const applications = getApplicationsForJob(jobId);

  return (
    <div className="table">
      <div className="table-row table-head">
        <span>Applicant</span>
        <span>Stage</span>
        <span>Score</span>
        <span>Export</span>
        <span>Detail</span>
      </div>
      {applications.map((application) => (
        <div className="table-row" key={application.id}>
          <span>
            <strong>{application.applicantName}</strong>
            <br />
            <span className="muted">{application.applicantEmail}</span>
          </span>
          <StatusPill value={application.stage} />
          <span>{application.score}/100</span>
          <span>{application.consents.recruiterExport ? "consented" : "declined"}</span>
          <Link className="ghost-button" href={`/applicant/applications/${application.id}`}>
            Open
          </Link>
        </div>
      ))}
    </div>
  );
}
