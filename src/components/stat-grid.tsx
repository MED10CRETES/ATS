type Stat = {
  label: string;
  value: string | number;
};

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <section className="metric-row" aria-label="Metrics">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span className="muted">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
