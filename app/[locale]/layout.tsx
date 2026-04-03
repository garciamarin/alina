import "../globalStyles.css";
import { I18nProvider } from "../i18n";
import { getSupportedLocale, type SupportedLocale } from "@/lib/i18n";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = getSupportedLocale(params.locale) as SupportedLocale
  return (
    <I18nProvider initialLocale={locale}>
      {children}
    </I18nProvider>
  )
}
