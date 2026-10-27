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

const BLOBS = [
    { shape: "rounded-[3.5rem_1.5rem_4rem_2rem]", color: "bg-[#a5d6d2]/70", ink: "text-white/70" },
    { shape: "rounded-[1.75rem_4rem_2rem_3.5rem]", color: "bg-[#e0a3ac]/45", ink: "text-white/80" },
    { shape: "rounded-[2.5rem_2rem_3.5rem_1.5rem]", color: "bg-[#4aaaa5]/45", ink: "text-white/70" },
]

export default function TranslationSamples({ locale, title, samples }: Props) {
    const heading = title || (TITLE[locale] ?? TITLE.de)
    const items = samples && samples.length > 0 ? samples : FALLBACK

    return (
        <section id="translations" className="section mt-16 w-full text-left md:mt-44">
            <h2 className="section-header">{heading}</h2>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                {items.map((sample, index) => {
                    const blob = BLOBS[index % BLOBS.length]
                    return (
                        <li
                            key={sample.id}
                            className={`relative flex flex-col gap-3 overflow-hidden px-7 pt-7 transition-transform duration-500 ease-out hover:-translate-y-1 hover:rotate-[-0.6deg] md:px-9 md:pt-9 ${sample.languages ? "pb-20 md:pb-24" : "pb-8 md:pb-10"} ${blob.shape} ${blob.color}`}
                        >
                            {sample.languages && (
                                <span
                                    aria-label={sample.languages}
                                    className={`pointer-events-none absolute bottom-1 right-8 select-none whitespace-nowrap font-mono font-medium leading-none ${blob.ink} ${
                                        sample.languages.length > 8 ? "text-4xl md:text-5xl" : "text-6xl md:text-7xl"
                                    }`}
                                >
                                    {sample.languages}
                                </span>
                            )}
                            <div className="relative flex flex-col gap-3">
                                {sample.kind && (
                                    <span className="font-mono text-sm font-medium uppercase tracking-wider text-[#12706c]">
                                        {sample.kind}
                                    </span>
                                )}
                                <h3 className="font-mono text-lg font-bold leading-snug md:text-xl">{sample.title}</h3>
                                {sample.text && (
                                    <ReactMarkdown
                                        className="mt-1 text-base"
                                        components={{
                                            ul: ({ children }) => <ul className="flex flex-col gap-1.5">{children}</ul>,
                                            li: ({ children }) => (
                                                <li className="flex gap-2">
                                                    <span aria-hidden className="text-[#12706c]">↗</span>
                                                    <span className="min-w-0 break-words">{children}</span>
                                                </li>
                                            ),
                                            a: ({ href, children }) => (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline decoration-black/30 underline-offset-4 hover:decoration-black"
                                                >
                                                    {children}
                                                </a>
                                            ),
                                        }}
                                    >
                                        {sample.text}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
