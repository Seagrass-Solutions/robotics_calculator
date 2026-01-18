'use client';

import { useEffect, useMemo } from "react";

export type TabKey = "payload" | "torque" | "gripper";

const TAB_ORDER: TabKey[] = ["payload", "torque", "gripper"];

export default function Tabs({
  value,
  onChange,
}: {
  value: TabKey;
  onChange: (v: TabKey) => void;
}) {
  const items = useMemo(
    () => [
      { key: "payload" as const, label: "Payload" },
      { key: "torque" as const, label: "Torque" },
      { key: "gripper" as const, label: "Gripper" },
    ],
    []
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const idx = TAB_ORDER.indexOf(value);
      const next =
        e.key === "ArrowRight"
          ? TAB_ORDER[(idx + 1) % TAB_ORDER.length]
          : TAB_ORDER[(idx - 1 + TAB_ORDER.length) % TAB_ORDER.length];
      onChange(next);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [value, onChange]);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={[
            "rounded-xl border px-3 py-2 text-sm font-semibold transition",
            value === t.key
              ? "border-white/30 bg-white text-black"
              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
          ].join(" ")}
          aria-pressed={value === t.key}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
