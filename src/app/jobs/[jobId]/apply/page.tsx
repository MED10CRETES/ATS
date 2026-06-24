import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById } from "@/lib/demo-data";

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function ApplyPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Application</p>
          <h1>{job.title}</h1>
          <p className="lede">
            This form stores application-time answers and consent declarations
            against this role.
          </p>
        </div>
      </section>

      <section className="grid two">
        <form className="card">
          <div className="card-body form-grid">
            <h2>Applicant details</h2>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" defaultValue="Alex Morgan" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" defaultValue="alex@example.com" />
            </div>
            <div className="field">
              <label htmlFor="cv">CV</label>
              <input id="cv" name="cv" type="file" />
            </div>
            <div className="field">
              <label htmlFor="cover">Cover letter</label>
              <input id="cover" name="cover" type="file" />
            </div>
          </div>
        </form>

        <article className="card">
          <div className="card-body form-grid">
            <h2>Role-specific questions</h2>
            {job.questions.map((question) => (
              <div className="field" key={question.id}>
                <label htmlFor={question.id}>{question.prompt}</label>
                {question.options ? (
                  <select id={question.id} name={question.id}>
                    {question.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <textarea id={question.id} name={question.id} />
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid two" style={{ marginTop: 18 }}>
        <article className="card">
          <div className="card-body form-grid">
            <h2>Data declarations</h2>
            <label className="check-row">
              <input type="checkbox" name="futureRoleRetention" />
              <span>
                Do you consent to this recruiter keeping your application data
                so they can consider you for other positions?
              </span>
            </label>
            <label className="check-row">
              <input type="checkbox" name="recruiterExport" />
              <span>
                Do you consent to this recruiter exporting your application data
                from the platform?
              </span>
            </label>
          </div>
        </article>

        <article className="card">
          <div className="card-body form-grid">
            <h2>AI clarification</h2>
            <div className="notice">
              AI-generated clarification is advisory and gives the applicant a
              chance to add context before recruiter review.
            </div>
            <div className="field">
              <label htmlFor="clarification">
                Can you clarify which parts of the evidence analysis you owned
                directly?
              </label>
              <textarea id="clarification" name="clarification" />
            </div>
          </div>
          <div className="card-footer">
            <Link className="button" href="/applicant">
              Submit demo application
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
