export default function NewJobPage() {
  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Create job</p>
          <h1>Draft a transparent role.</h1>
          <p className="lede">
            The proof-of-concept job editor captures advert content, shared
            stages, bespoke questions, and recruiter-defined rubric shape.
          </p>
        </div>
      </section>

      <section className="grid two">
        <form className="card">
          <div className="card-body form-grid">
            <h2>Job advert</h2>
            <div className="field">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" defaultValue="Product Analyst" />
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" defaultValue="Hybrid, Manchester" />
            </div>
            <div className="field">
              <label htmlFor="salary">Salary</label>
              <input id="salary" name="salary" defaultValue="£48,000 - £58,000" />
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                defaultValue="Work with product, design, and engineering to investigate user behaviour and explain tradeoffs clearly."
              />
            </div>
          </div>
        </form>

        <article className="card">
          <div className="card-body form-grid">
            <h2>Stages and rubric</h2>
            <div className="field">
              <label htmlFor="stages">Shared stages</label>
              <input
                id="stages"
                name="stages"
                defaultValue="submitted, screening, interview, offer, rejected, withdrawn"
              />
            </div>
            <div className="field">
              <label htmlFor="rubric">Rubric criteria</label>
              <textarea
                id="rubric"
                name="rubric"
                defaultValue="Evidence quality: 40&#10;Communication: 30&#10;Role-specific experience: 30"
              />
            </div>
            <div className="field">
              <label htmlFor="questions">Bespoke questions</label>
              <textarea
                id="questions"
                name="questions"
                defaultValue="Describe a time you changed a product decision using evidence."
              />
            </div>
          </div>
          <div className="card-footer">
            <button className="button" type="button">
              Publish demo role
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
