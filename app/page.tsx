'use client';

import { useEffect, useState } from "react";
import type { UnitSystem } from "../lib/units";
import UnitToggle from "../components/UnitToggle";
import Tabs, { TabKey } from "../components/Tabs";
import CalcCard from "../components/CalcCard";
import PayloadCalc from "../components/PayloadCalc";
import TorqueCalc from "../components/TorqueCalc";
import GripperCalc from "../components/GripperCalc";

const LS_UNITS = "robo_calc_units_v1";
const LS_TAB = "robo_calc_tab_v1";

export default function Page() {
  const [units, setUnits] = useState<UnitSystem>("SI");
  const [tab, setTab] = useState<TabKey>("payload");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LS_UNITS);
      if (saved === "SI" || saved === "IMPERIAL") setUnits(saved);
      const savedTab = window.localStorage.getItem(LS_TAB);
      if (savedTab === "payload" || savedTab === "torque" || savedTab === "gripper") setTab(savedTab);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LS_UNITS, units);
    } catch {}
  }, [units]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LS_TAB, tab);
    } catch {}
  }, [tab]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-5 flex flex-col gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Industrial Robotics Study Calculator</h1>
            <p className="text-sm text-white/60">Tabbed calculators — mobile-first.</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={tab} onChange={setTab} />
            <UnitToggle value={units} onChange={setUnits} />
          </div>
        </header>

        {tab === "payload" ? (
          <CalcCard title="Available Payload" subtitle="Ap = P − Wt">
            <PayloadCalc units={units} />
          </CalcCard>
        ) : null}

        {tab === "torque" ? (
          <CalcCard title="Torque" subtitle="W = m × g,  T = W × d">
            <TorqueCalc units={units} />
          </CalcCard>
        ) : null}

        {tab === "gripper" ? (
          <CalcCard title="Gripper Force" subtitle="F ≥ (W × SF) / (μ × n)">
            <GripperCalc units={units} />
          </CalcCard>
        ) : null}

        <footer className="mt-8 text-xs text-white/40">
          Tip: Tab and units persist in your browser. Use arrow keys to switch tabs on desktop.
        </footer>
      </div>
    </main>
  );
}
