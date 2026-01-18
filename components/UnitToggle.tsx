'use client';

import type { UnitSystem } from "../lib/units";

export default function UnitToggle({
  value,
  onChange,
}: {
  value: UnitSystem;
  onChange: (v: UnitSystem) => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
      {(["SI", "IMPERIAL"] as UnitSystem[]).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          className={[
            "px-3 py-1.5 text-sm font-medium rounded-lg transition",
            value === u
              ? "bg-white text-black"
              : "text-white/70 hover:text-white hover:bg-white/10",
          ].join(" ")}
        >
          {u === "SI" ? "SI" : "Imperial"}
        </button>
      ))}
    </div>
  );
}
