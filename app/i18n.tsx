"use client"
import React, { createContext, useContext, useMemo } from "react"

import type { SupportedLocale } from "@/lib/i18n"
export { getSupportedLocale } from "@/lib/i18n"

type Messages = Record<string, any>

type I18nContextType = {
    locale: SupportedLocale
    t: (key: string) => string
    setLocale?: (l: SupportedLocale) => void
}

const I18nContext = createContext<I18nContextType>({
    locale: "de",
    t: (k: string) => k,
})

const messagesCache: Partial<Record<SupportedLocale, Messages>> = {}

async function loadMessages(locale: SupportedLocale): Promise<Messages> {
    if (messagesCache[locale]) return messagesCache[locale]!
    const data = await import(`@/app/locales/${locale}.json`)
    messagesCache[locale] = (data as any).default || data
    return messagesCache[locale]!
}

export function I18nProvider({ initialLocale, children }: { initialLocale: SupportedLocale, children: React.ReactNode }) {
    const [locale, setLocale] = React.useState<SupportedLocale>(initialLocale)
    const [messages, setMessages] = React.useState<Messages>({})

    React.useEffect(() => {
        let mounted = true
        loadMessages(locale).then((m) => {
            if (mounted) setMessages(m)
        })
        return () => {
            mounted = false
        }
    }, [locale])

    const t = useMemo(() => {
        return (key: string) => {
            const parts = key.split(".")
            let current: any = messages
            for (const part of parts) {
                if (current && typeof current === "object" && part in current) {
                    current = current[part]
                } else {
                    return key
                }
            }
            return typeof current === "string" ? current : key
        }
    }, [messages])

    return (
        <I18nContext.Provider value={{ locale, t, setLocale }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    return useContext(I18nContext)
}

export function useT() {
    const { t } = useI18n()
    return t
}

