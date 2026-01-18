'use client';

import { useMemo, useState } from "react";
import type { UnitSystem } from "../lib/units";
import { UNIT_LABELS } from "../lib/units";
import { availablePayload } from "../lib/formulas";
import { NumInput, ResultBox, parseNum } from "./inputs";

export default function PayloadCalc({ units }: { units: UnitSystem }) {
  const u = UNIT_LABELS[units];
  const [P, setP] = useState("");
  const [Wt, setWt] = useState("");

  const out = useMemo(() => {
    const p = parseNum(P);
    const wt = parseNum(Wt);
    if (!Number.isFinite(p) || !Number.isFinite(wt)) return null;
    return availablePayload(p, wt);
  }, [P, Wt]);

  const warn =
    out != null && Number.isFinite(out) && out < 0
      ? "Tooling exceeds robot rating (negative available payload)."
      : null;

  const note = "Static check only (does not include acceleration/dynamics or wrist moments).";

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NumInput label="Robot rated payload (P)" unit={u.payload} value={P} onChange={setP} placeholder="e.g., 25" />
        <NumInput label="Tooling + sensors total (Wt)" unit={u.payload} value={Wt} onChange={setWt} placeholder="e.g., 6.3" />
      </div>

      <ResultBox
        label="Available payload (Ap = P − Wt)"
        value={out == null ? "—" : Number.isFinite(out) ? out.toFixed(3) : "—"}
        unit={u.payload}
        warn={warn}
        note={note}
      />
    </div>
  );
}
