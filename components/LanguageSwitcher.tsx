"use client"
import { useI18n } from "@/app/i18n"
import { usePathname, useRouter } from "next/navigation"

const LABELS: Record<"de" | "en" | "es" | "pt", { short: string; label: string }> = {
  de: { short: "DE", label: "Deutsch" },
  en: { short: "EN", label: "English" },
  es: { short: "ES", label: "Español" },
  pt: { short: "PT", label: "Português" },
}

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const router = useRouter()
  const pathname = usePathname() || "/de"

  function navigateToLocale(next: string) {
    const segments = pathname.split("/")
    // pathname like: /de, /de/..., maybe empty leading
    if (segments.length > 1) {
      segments[1] = next
    }
    const nextPath = segments.join("/") || `/${next}`
    router.push(nextPath)
  }

  return (
    <div className="relative">
      <select
        aria-label="Language"
        value={locale}
        onChange={(e) => {
          const next = e.target.value
          // update client provider for immediate UI strings
          setLocale?.(next as any)
          // navigate to locale route for SSR/Dato content
          navigateToLocale(next)
        }}
        className="
          appearance-none
          text-[#1f9994]
          bg-[#edebec]
          border border-[#1f9994]/40
          rounded-md
          px-3 pr-8
          py-1
          h-9 md:h-10
          font-mono
          text-sm md:text-lg
          leading-none
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-[#1f9994]/50 focus:ring-offset-1 focus:ring-offset-[#edebec]
        "
      >
        {Object.entries(LABELS).map(([value, lang]) => (
          <option key={value} value={value} aria-label={lang.label}>
            {lang.short}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1f9994"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10l5 5 5-5" />
      </svg>
    </div>
  )
}
