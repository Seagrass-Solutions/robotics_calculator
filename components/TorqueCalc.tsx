'use client';

import { useMemo, useState } from "react";
import type { UnitSystem } from "../lib/units";
import { UNIT_LABELS } from "../lib/units";
import { weightFromMass, torque } from "../lib/formulas";
import { NumInput, ResultBox, parseNum } from "./inputs";

export default function TorqueCalc({ units }: { units: UnitSystem }) {
  const u = UNIT_LABELS[units];

  const [massOrLb, setMassOrLb] = useState("");
  const [distance, setDistance] = useState("");

  const computed = useMemo(() => {
    const m = parseNum(massOrLb);
    const d = parseNum(distance);
    if (!Number.isFinite(m) || !Number.isFinite(d)) return null;
    const W = weightFromMass(m, units); // N or lbf
    const T = torque(W, d); // N·m or lbf·in
    return { W, T };
  }, [massOrLb, distance, units]);

  const note =
    units === "IMPERIAL"
      ? "Imperial uses the common coursework approximation: input lb is treated as lbf at 1g."
      : "SI uses W = m × g.";

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NumInput label={`Load (m)`} unit={u.mass} value={massOrLb} onChange={setMassOrLb} placeholder={units === "SI" ? "kg (e.g., 2.0)" : "lb (e.g., 5)"} />
        <NumInput label="Distance to CG (d)" unit={u.distance} value={distance} onChange={setDistance} placeholder={units === "SI" ? "m (e.g., 0.25)" : "in (e.g., 2.5)"} />
      </div>

      <ResultBox
        label="Weight (W)"
        value={computed == null ? "—" : Number.isFinite(computed.W) ? computed.W.toFixed(3) : "—"}
        unit={u.force}
        note={note}
      />

      <ResultBox
        label="Torque (T = W × d)"
        value={computed == null ? "—" : Number.isFinite(computed.T) ? computed.T.toFixed(3) : "—"}
        unit={u.torque}
      />
    </div>
  );
}
