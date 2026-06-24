import type { ApplicationStage, JobStatus } from "@/lib/demo-data";

const toneByValue: Record<string, "green" | "blue" | "amber" | "red"> = {
  open: "green",
  draft: "amber",
  paused: "amber",
  completed: "blue",
  cancelled: "red",
  submitted: "green",
  screening: "blue",
  interview: "blue",
  offer: "green",
  rejected: "red",
  withdrawn: "amber",
};

export function StatusPill({ value }: { value: JobStatus | ApplicationStage | string }) {
  const tone = toneByValue[value] ?? "blue";

  return <span className={`pill ${tone}`}>{value}</span>;
}
