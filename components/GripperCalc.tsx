'use client';

import { useMemo, useState } from "react";
import type { UnitSystem } from "../lib/units";
import { UNIT_LABELS } from "../lib/units";
import { requiredGripForce, weightFromMass } from "../lib/formulas";
import { NumInput, ResultBox, parseNum } from "./inputs";

export default function GripperCalc({ units }: { units: UnitSystem }) {
  const u = UNIT_LABELS[units];

  const [massOrLb, setMassOrLb] = useState("");
  const [mu, setMu] = useState("0.80");
  const [sf, setSf] = useState("2");
  const [n, setN] = useState("2");

  const computed = useMemo(() => {
    const m = parseNum(massOrLb);
    const MU = parseNum(mu);
    const SF = parseNum(sf);
    const N = parseNum(n);
    if (!Number.isFinite(m) || !Number.isFinite(MU) || !Number.isFinite(SF) || !Number.isFinite(N)) return null;
    const W = weightFromMass(m, units);
    const F = requiredGripForce(W, MU, N, SF);
    return { W, F };
  }, [massOrLb, mu, sf, n, units]);

  const warn = computed && Number.isFinite(computed.F) ? "Minimum required normal force. Add margin for vibration/acceleration and surface variability." : null;

  return (
    <div className="grid gap-3">
      <NumInput label="Load" unit={u.mass} value={massOrLb} onChange={setMassOrLb} placeholder={units === "SI" ? "kg (e.g., 0.45)" : "lb (e.g., 1)"} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <NumInput label="Friction (μ)" value={mu} onChange={setMu} placeholder="0.80" />
        <NumInput label="Safety factor (SF)" value={sf} onChange={setSf} placeholder="2" />
        <NumInput label="Contacts (n)" value={n} onChange={setN} placeholder="2" />
      </div>

      <ResultBox
        label="Weight (W)"
        value={computed == null ? "—" : Number.isFinite(computed.W) ? computed.W.toFixed(3) : "—"}
        unit={u.force}
      />

      <ResultBox
        label="Required grip force"
        value={computed == null ? "—" : Number.isFinite(computed.F) ? computed.F.toFixed(3) : "—"}
        unit={u.force}
        warn={warn}
      />
    </div>
  );
}
