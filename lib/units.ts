export type UnitSystem = "SI" | "IMPERIAL";

export const UNIT_LABELS = {
  SI: {
    mass: "kg",
    force: "N",
    distance: "m",
    torque: "N·m",
    payload: "kg",
  },
  IMPERIAL: {
    mass: "lb",
    force: "lbf",
    distance: "in",
    torque: "lbf·in",
    payload: "lb",
  },
} as const;

export function gravity(units: UnitSystem) {
  return units === "SI" ? 9.80665 : 32.174;
}

/**
 * Student-friendly weight model:
 * - SI: W (N) = m (kg) * g
 * - Imperial: users typically enter "lb" as a force-like weight; we treat input lb as lbf (1g approximation)
 * If you need strict physics (slugs), we can add an "Advanced" toggle later.
 */
export function weightFromMassInput(massOrLb: number, units: UnitSystem) {
  if (!Number.isFinite(massOrLb)) return NaN;
  if (units === "SI") return massOrLb * gravity("SI"); // N
  return massOrLb; // lbf (practical approximation)
}
