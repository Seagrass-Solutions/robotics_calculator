import type { UnitSystem } from "./units";
import { weightFromMassInput } from "./units";

export function availablePayload(P: number, Wt: number) {
  return P - Wt;
}

export function weightFromMass(mass: number, units: UnitSystem) {
  return weightFromMassInput(mass, units);
}

export function torque(W: number, d: number) {
  return W * d;
}

export function requiredGripForce(W: number, mu: number, nContacts: number, safetyFactor: number) {
  if (!Number.isFinite(W) || !Number.isFinite(mu) || !Number.isFinite(nContacts) || !Number.isFinite(safetyFactor)) return NaN;
  if (mu <= 0 || nContacts <= 0 || safetyFactor <= 0) return NaN;
  return (W * safetyFactor) / (mu * nContacts);
}
