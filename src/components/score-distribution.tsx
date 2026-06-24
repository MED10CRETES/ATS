import type { ScoreBucket } from "@/lib/demo-data";

export function ScoreDistribution({ buckets }: { buckets: ScoreBucket[] }) {
  const maxCount = Math.max(...buckets.map((bucket) => bucket.count), 1);

  return (
    <div className="score-bars" aria-label="Score distribution">
      {buckets.map((bucket) => (
        <div className="score-bar" key={bucket.label}>
          <span>{bucket.label}</span>
          <span className="bar-track">
            <span
              className="bar-fill"
              style={{ width: `${(bucket.count / maxCount) * 100}%` }}
            />
          </span>
          <span>{bucket.count}</span>
        </div>
      ))}
    </div>
  );
}
