import ReactMarkdown from "react-markdown"

export type TranslationSample = {
    id: string
    kind?: string | null
    languages?: string | null
    title?: string | null
    text?: string | null
}

type Props = {
    locale: string
    title?: string | null
    samples?: TranslationSample[] | null
}

const TITLE: Record<string, string> = {
    de: "Übersetzungsproben",
    en: "Translation samples",
    es: "Muestras de traducción",
    pt: "Amostras de tradução",
}

const FALLBACK: TranslationSample[] = [
    {
        id: "jadedrache",
        kind: "Lektorat",
        languages: "ES → DE",
        title: "Julio Santos – Der Jadedrache (2021)",
    },
    {
        id: "rosa-luxemburg",
        kind: "Übersetzte Artikel",
        languages: "PT → DE",
        title: "Rosa-Luxemburg-Stiftung",
        text: [
            "- [Lautes Schweigen für die queere Agenda](https://www.rosalux.de/news/id/47094/lautes-schweigen-fuer-die-queere-agenda)",
            "- [Brasiliens Militär und die Wahlen](https://www.rosalux.de/news/id/50075/brasiliens-militaer-und-die-wahlen)",
            "- [Hunger bekämpfen durch Ernährungssouveränität](https://www.rosalux.de/news/id/50340/hunger-bekaempfen-durch-ernaehrungssouveraenitaet)",
        ].join("\n"),
    },
    {
        id: "goethe",
        kind: "Website-Übersetzung",
        languages: "DE · PT · ES · EN",
        title: "Goethe-Institut Salvador",
        text: "- [goethe.de/ins/br/de/sta/sal](https://www.goethe.de/ins/br/de/sta/sal.html)",
    },
    {
        id: "nashi44",
        kind: "Songtext-Übersetzung",
        languages: "DE → PT",
        title: "Nashi44 – Asiabox",
    },
    {
        id: "caritas",
        kind: "Übersetzungen",
        title: "Beratungsstelle des Caritas Leipzig e.V.",
    },
    {
        id: "ullrich",
        kind: "Übersetzung und Lektorat",
        languages: "EN → DE",
        title: "Ruth & Hans Ullrich – Aus der Stube in die Welt. Tätowier-Kultur in der Mitte des 20. Jahrhunderts (2025)",
    },
]

export default function TranslationSamples({ locale, title, samples }: Props) {
    const heading = title || (TITLE[locale] ?? TITLE.de)
    const items = samples && samples.length > 0 ? samples : FALLBACK

    return (
        <section id="translations" className="section mt-16 w-full text-left md:mt-24">
            <h2 className="section-header">{heading}</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {items.map((sample) => (
                    <li
                        key={sample.id}
                        className="flex flex-col gap-3 rounded-3xl bg-white/60 p-6 shadow-sm"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                            {sample.kind && (
                                <span className="font-mono text-sm font-medium uppercase tracking-wider text-[#1f9994]">
                                    {sample.kind}
                                </span>
                            )}
                            {sample.languages && (
                                <span className="whitespace-nowrap rounded-full border border-[#1f9994]/40 px-3 py-0.5 font-mono text-sm text-[#1f9994]">
                                    {sample.languages}
                                </span>
                            )}
                        </div>
                        <h3 className="font-mono text-lg font-bold leading-snug md:text-xl">{sample.title}</h3>
                        {sample.text && (
                            <ReactMarkdown
                                className="mt-1 border-t border-[#1f9994]/20 pt-3 text-base"
                                components={{
                                    ul: ({ children }) => <ul className="flex flex-col gap-1.5">{children}</ul>,
                                    li: ({ children }) => (
                                        <li className="flex gap-2">
                                            <span aria-hidden className="text-[#1f9994]">↗</span>
                                            <span className="min-w-0 break-words">{children}</span>
                                        </li>
                                    ),
                                    a: ({ href, children }) => (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline decoration-[#1f9994]/50 underline-offset-4 hover:decoration-[#1f9994]"
                                        >
                                            {children}
                                        </a>
                                    ),
                                }}
                            >
                                {sample.text}
                            </ReactMarkdown>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
