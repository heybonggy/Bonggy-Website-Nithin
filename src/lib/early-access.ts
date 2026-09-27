/** Roles offered in the Early-access form; the API accepts only these. */
export const EARLY_ACCESS_ROLES = [
  "VP Sales / Head of Sales",
  "Head of Marketing",
  "Head of RevOps",
  "Founder",
  "Sales Manager",
  "RevOps",
  "Marketing",
  "SDR / AE",
  "Other",
] as const;

export type EarlyAccessRole = (typeof EARLY_ACCESS_ROLES)[number];

export function isEarlyAccessRole(v: string): v is EarlyAccessRole {
  return (EARLY_ACCESS_ROLES as readonly string[]).includes(v);
}
