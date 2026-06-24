import { applicationStages, type ApplicationStage } from "@/lib/demo-data";

export function StageTimeline({ currentStage }: { currentStage: ApplicationStage }) {
  const currentIndex = applicationStages.indexOf(currentStage);

  return (
    <div className="timeline">
      {applicationStages.map((stage, index) => (
        <div className="timeline-item" key={stage}>
          <span className={`dot ${index <= currentIndex ? "active" : ""}`} aria-hidden="true" />
          <div>
            <strong>{stage}</strong>
            <p className="muted" style={{ marginBottom: 0 }}>
              {index < currentIndex
                ? "Completed"
                : index === currentIndex
                  ? "Current stage"
                  : "Not reached"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
