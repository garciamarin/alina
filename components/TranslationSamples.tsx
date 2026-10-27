import ReactMarkdown from "react-markdown"
import Image from "next/image"

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
    {
        shape: "rounded-[4.5rem_1rem_5rem_1.5rem]",
        back: "rounded-[1.5rem_4rem_1rem_5rem] bg-[#e0a3ac]/40 -rotate-2 translate-x-3 translate-y-3",
        color: "bg-[#a5d6d2]/75",
        ink: "text-white",
    },
    {
        shape: "rounded-[1rem_5rem_1.5rem_4.5rem]",
        back: "rounded-[5rem_1.5rem_4rem_1rem] bg-[#4aaaa5]/30 rotate-2 -translate-x-3 translate-y-3",
        color: "bg-[#e0a3ac]/70",
        ink: "text-white",
    },
    {
        shape: "rounded-[5rem_1.5rem_1rem_4rem]",
        back: "rounded-[1rem_4rem_5rem_1.5rem] bg-[#e0a3ac]/40 -rotate-1 translate-x-2 translate-y-3",
        color: "bg-[#4aaaa5]/55",
        ink: "text-white",
    },
]

function iconFor(kind?: string | null) {
    if (!kind) return null
    if (/lektor/i.test(kind)) return "/svg/ubersetzen_stift.svg"
    if (/(ü|u)bersetz|translat|traduc|tradu/i.test(kind)) return "/svg/ubersetzen_tastaturpng.svg"
    return null
}

export default function TranslationSamples({ locale, title, samples }: Props) {
    const heading = title || (TITLE[locale] ?? TITLE.de)
    const items = samples && samples.length > 0 ? samples : FALLBACK

    return (
        <section id="translations" className="section mt-16 w-full text-left md:mt-44">
            <h2 className="section-header">{heading}</h2>
            <svg aria-hidden width="0" height="0" className="absolute">
                <defs>
                    {[3, 11, 27].map((seed, i) => (
                        <filter key={seed} id={`wavy-${i}`} colorInterpolationFilters="sRGB">
                            <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="1" seed={seed} result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    ))}
                </defs>
            </svg>
            <ul className="grid grid-cols-1 gap-x-14 items-start gap-y-12 pb-4 md:grid-cols-2 md:gap-y-16">
                {items.map((sample, index) => {
                    const blob = BLOBS[index % BLOBS.length]
                    const icon = iconFor(sample.kind)
                    const long = (sample.languages?.length ?? 0) > 8
                    return (
                        <li
                            key={sample.id}
                            className={`group relative isolate ${index % 2 === 0 ? "mr-4 md:mr-0" : "ml-4 md:ml-0 md:mt-20"}`}
                        >
                            <div
                                aria-hidden
                                style={{ filter: `url(#wavy-${(index + 1) % 3})` }}
                                className={`absolute inset-0 -z-10 ${blob.back}`}
                            />
                            <div className="relative flex flex-col gap-3 px-7 pb-8 pt-9 transition-transform duration-500 ease-out group-hover:-translate-y-1 md:px-10 md:pb-10 md:pt-10">
                                <div
                                    aria-hidden
                                    style={{ filter: `url(#wavy-${index % 3})` }}
                                    className={`absolute inset-0 -z-10 ${blob.shape} ${blob.color}`}
                                />
                                {sample.languages && (
                                    <span
                                        className={`select-none whitespace-nowrap font-sans font-extralight uppercase leading-none tracking-wide ${blob.ink} ${
                                            long ? "text-3xl md:text-4xl" : "text-5xl md:text-6xl"
                                        }`}
                                    >
                                        {sample.languages}
                                    </span>
                                )}
                                {sample.kind && (
                                    <span className="mt-2 font-mono text-sm font-medium uppercase tracking-wider text-[#12706c]">
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
                            {icon && (
                                <div className="absolute -right-2 -top-6 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#edebec] shadow transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 md:-right-4 md:h-16 md:w-16">
                                    <Image src={icon} alt="" width={44} height={31} className="h-auto w-[84%]" />
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
