import { getDato } from "@/lib/datocms"
import { FooterDocument, HeaderDocument } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMeFetcher"
import Experience from "@/components/ExperienceFetcher"
import Services from "@/components/ServicesFetcher"
import Contact from "@/components/Contact"
import Audios from "@/components/AudioBlockFetcher"
import ReactMarkdown from "react-markdown"
import { getSupportedLocale } from "@/lib/i18n"

export default async function Page({ params }: { params: { locale: string } }) {
    const locale = getSupportedLocale(params.locale)
    let { header } = await getDato(HeaderDocument, { locale })

    if (locale !== "de" && !header?.backgroundAnimation?.[0]?.url) {
        const de = await getDato(HeaderDocument, { locale: "de" })
        header = de.header
    }

    return (
        <div className="relative overflow-hidden">
            <div className="h-screen -z-10" />
            <Header data={header} />
            <main className="mx-auto flex min-h-screen flex-col items-center content-center px-8 md:px-16 max-w-screen-xl md:text-lg">
                <AboutMe locale={locale} />
                <Experience locale={locale} />
                <Services locale={locale} />
                <Audios locale={locale} />
                <Contact locale={locale} />
            </main>
            <Footer locale={locale} />
        </div>
    )
}

async function Footer({ locale }: { locale: string }) {
    const { footer } = await getDato(FooterDocument, { locale })
    if (!footer) return null

    const footerTitle = footer.title ?? ""
    const footerContent = footer.content ?? ""
    const backgroundUrl = footer?.backgroundImage?.image?.url

    return (
        <footer
            className="flex flex-col gap-1 items-center justify-center w-full bg-no-repeat bg-cover pt-16 text-lg font-sans p-4 mt-16 md:mt-32"
            style={{
                backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
                backgroundPosition: "center calc(100% + 1rem)",
            }}
        >
            <p className="text-xl">{footerTitle}</p>
            <ReactMarkdown className="text-[15px] text-center">{footerContent}</ReactMarkdown>
        </footer>
    )
}

export const metadata: Metadata = {
    title: 'Alina Salzer – Dolmetscherin & Übersetzerin | Translator & Interpreter',
    description: 'Allgemein beeidigte Dolmetscherin und Übersetzerin für Deutsch, Spanisch, Portugiesisch und Englisch. Konferenzdolmetschen mit Fokus auf Dekolonialismus, Queerfeminismus, Umwelt, Nachhaltigkeit, Kunst & Kultur.',
    keywords: [
        'Alina Salzer',
        'Dolmetscherin',
        'Übersetzerin',
        'Konferenzdolmetschen',
        'Deutsch Spanisch Portugiesisch Englisch',
        'beeidigte Übersetzerin',
        'Translator',
        'Interpreter',
        'Translation',
        'Simultaneous Interpreting',
        'Remote Interpreting'
    ],
    authors: [{ name: 'Alina Salzer' }],
    openGraph: {
        title: 'Alina Salzer – Translator & Interpreter | Dolmetscherin & Übersetzerin',
        description: 'Certified interpreter and translator for German, Spanish, Portuguese, and English. Conference interpreting with a focus on decolonialism, queer feminism, sustainability, and culture.',
        url: 'https://www.alina-salzer.de',
        siteName: 'Alina Salzer',
        locale: 'de_DE',
        type: 'website',
        images: [
            {
                url: '/images/logo.png',
                width: 983,
                height: 1013,
                alt: 'Portrait of Alina Salzer with translation languages listed',
            },
        ],
    },
    icons: {
        icon: '/images/favicon.ico',
    },
}
