'use client';

import { useEffect, useState } from "react";
import type { UnitSystem } from "../lib/units";
import UnitToggle from "../components/UnitToggle";
import CalcCard from "../components/CalcCard";
import PayloadCalc from "../components/PayloadCalc";
import TorqueCalc from "../components/TorqueCalc";
import GripperCalc from "../components/GripperCalc";

const LS_KEY = "robo_calc_units_v1";

export default function Page() {
  const [units, setUnits] = useState<UnitSystem>("SI");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LS_KEY);
      if (saved === "SI" || saved === "IMPERIAL") setUnits(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY, units);
    } catch {}
  }, [units]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">Industrial Robotics Study Calculator</h1>
              <p className="text-sm text-white/60">Payload, torque, and gripper sizing — mobile-first.</p>
            </div>
          </div>
          <UnitToggle value={units} onChange={setUnits} />
        </header>

        <div className="grid gap-4">
          <CalcCard title="Available Payload" subtitle="Ap = P − Wt">
            <PayloadCalc units={units} />
          </CalcCard>

          <CalcCard title="Torque" subtitle="W = m × g,  T = W × d">
            <TorqueCalc units={units} />
          </CalcCard>

          <CalcCard title="Gripper Force" subtitle="F ≥ (W × SF) / (μ × n)">
            <GripperCalc units={units} />
          </CalcCard>
        </div>

        <footer className="mt-8 text-xs text-white/40">
          Built for personal study. Toggle SI/Imperial at the top.
        </footer>
      </div>
    </main>
  );
}
