import ReactMarkdown from "react-markdown"

type Props = {
    locale: string
    title?: string | null
    samples?: { id: string; text?: string | null }[] | null
}

const TITLE: Record<string, string> = {
    de: "Übersetzungsproben",
    en: "Translation samples",
    es: "Muestras de traducción",
    pt: "Amostras de tradução",
}

const ARTICLES = [
    {
        href: "https://www.rosalux.de/news/id/47094/lautes-schweigen-fuer-die-queere-agenda",
        label: "Lautes Schweigen für die queere Agenda",
    },
    {
        href: "https://www.rosalux.de/news/id/50075/brasiliens-militaer-und-die-wahlen",
        label: "Brasiliens Militär und die Wahlen",
    },
    {
        href: "https://www.rosalux.de/news/id/50340/hunger-bekaempfen-durch-ernaehrungssouveraenitaet",
        label: "Hunger bekämpfen durch Ernährungssouveränität",
    },
]

export default function TranslationSamples({ locale, title, samples }: Props) {
    const heading = title || (TITLE[locale] ?? TITLE.de)

    if (samples && samples.length > 0) {
        return (
            <section id="translations" className="section mt-16 w-full text-left md:mt-24">
                <h2 className="section-header">{heading}</h2>
                <ul className="flex flex-col gap-3 text-base md:text-lg">
                    {samples.map((sample) => (
                        <li key={sample.id}>
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <>{children}</>,
                                    ul: ({ children }) => <ul className="mt-1 flex flex-col gap-1 pl-4">{children}</ul>,
                                    a: ({ href, children }) => (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
                                            {children}
                                        </a>
                                    ),
                                }}
                            >
                                {sample.text ?? ""}
                            </ReactMarkdown>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }

    return (
        <section id="translations" className="section mt-16 w-full text-left md:mt-24">
            <h2 className="section-header">{heading}</h2>
            <ul className="flex flex-col gap-3 text-base md:text-lg">
                <li>Lektorat ES&gt;DE: Julio Santos – Der Jadedrache (2021)</li>
                <li>
                    Übersetzte Artikel für die Rosa-Luxemburg-Stiftung, PT&gt;DE
                    <ul className="mt-1 flex flex-col gap-1 pl-4">
                        {ARTICLES.map((article) => (
                            <li key={article.href}>
                                <a href={article.href} target="_blank" rel="noopener noreferrer" className="underline">
                                    {article.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    Website-Übersetzung Goethe-Institut Salvador (DE, PT, ES, EN){" "}
                    <a
                        href="https://www.goethe.de/ins/br/de/sta/sal.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        goethe.de/ins/br/de/sta/sal
                    </a>
                </li>
                <li>Songtext-Übersetzung Nashi44 – Asiabox, DE&gt;PT</li>
                <li>Übersetzungen für die Beratungsstelle des Caritas Leipzig e.V.</li>
                <li>
                    Übersetzung EN&gt;DE und Lektorat: Ruth &amp; Hans Ullrich. Aus der Stube in die Welt – Tätowier-Kultur in der Mitte des 20. Jahrhunderts (2025)
                </li>
            </ul>
        </section>
    )
}
