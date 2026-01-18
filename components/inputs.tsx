'use client';

export function parseNum(s: string) {
  if (!s) return NaN;
  const n = Number(String(s).replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : NaN;
}

export function NumInput({
  label,
  unit,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  unit?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        {unit ? <span className="text-xs text-white/60">{unit}</span> : null}
      </div>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base text-white placeholder:text-white/30 outline-none focus:border-white/30"
      />
    </label>
  );
}

export function ResultBox({
  label,
  value,
  unit,
  note,
  warn,
}: {
  label: string;
  value: string;
  unit?: string;
  note?: string | null;
  warn?: string | null;
}) {
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="flex items-end justify-between gap-3">
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-right">
          <div className="text-2xl font-semibold tabular-nums text-white">{value}</div>
          {unit ? <div className="text-xs text-white/60">{unit}</div> : null}
        </div>
      </div>
      {warn ? <div className="mt-2 text-sm text-amber-200/90">{warn}</div> : null}
      {note ? <div className="mt-2 text-xs text-white/60">{note}</div> : null}
    </div>
  );
}
