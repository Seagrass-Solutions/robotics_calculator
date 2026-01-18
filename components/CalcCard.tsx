export default function CalcCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
