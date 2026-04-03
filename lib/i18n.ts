export type SupportedLocale = "de" | "en" | "es" | "pt"

export function getSupportedLocale(input?: string | null): SupportedLocale {
  const normalized = (input || "").toLowerCase()
  if (normalized === "en" || normalized === "es" || normalized === "pt") return normalized
  return "de"
}

