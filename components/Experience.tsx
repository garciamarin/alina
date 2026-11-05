"use client"
import type { ExperienceQuery } from "@/.graphql/datoTypes"
import Image from "next/image"
import { AnimatedSvg } from "./AnimateSvg"

const HAT_BOX = "animate-hat-wiggle pointer-events-none absolute left-[48%] -top-[15%] h-[28%] w-[38%]"

const CLIENTS = [
    "UNESCO",
    "Rosa-Luxemburg-Stiftung",
    "EU-LAC",
    "LUSH GmbH",
    "Caritas",
    "Diakonie",
    "Frauen für Frauen",
    "DOK Leipzig Filmfestival",
    "Fusion Festival",
    "Konzeptwerk Neue Ökonomie",
]

const CLIENT_LEAD: Record<string, { title: string; description: string }> = {
    de: { title: "freiberufliche Dolmetscherin & Übersetzerin", description: "für Unternehmen und Organisationen wie:" },
    en: { title: "freelance interpreter and translator", description: "for companies and organisations such as:" },
    es: { title: "intérprete y traductora autónoma", description: "para empresas y organizaciones como:" },
    pt: { title: "intérprete e tradutora autônoma", description: "para empresas e organizações como:" },
}

// The "seit 2020" entry in Dato lists the clients. They are printed under the 2023 entry instead.
function isClientWork(experience: NonNullable<ExperienceQuery["trainingBlock"]>["experience"][number]) {
    const year = experience.year ?? ""
    const text = experience.event.map((event) => `${event.title ?? ""} ${event.description ?? ""}`).join(" ")
    return /2020/.test(year) && /unesco/i.test(`${year} ${text}`)
}

export default function Experience({
    data,
    hatFrames,
    locale,
}: {
    data: ExperienceQuery["trainingBlock"]
    hatFrames: string[]
    locale: string
}) {
    const timeline = data?.experience.filter((experience) => !isClientWork(experience))
    const bubble = data?.experience.find((experience) => experience.backgroundImage?.url)?.backgroundImage

    return (
        <section id="experience" className="section mt-16 md:mt-[440px]">
            {bubble?.url && (
                <div className="relative hidden md:block">
                    <div className="absolute -top-[300px] left-10 -z-10 w-[450px]">
                        <div className="relative animate-bubble-wave">
                            <Image
                                src={bubble.url}
                                width={450}
                                height={450}
                                alt={bubble.alt || ""}
                                className="h-auto w-full"
                            />
                            <Hat frames={hatFrames} />
                        </div>
                    </div>
                </div>
            )}
            <ul className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:pt-32 lg:gap-20">
                {bubble?.url && (
                    <li className="block md:hidden">
                        <div className="relative top-5 w-full max-w-[450px] animate-bubble-wave">
                            <Image
                                src={bubble.url}
                                width={450}
                                height={450}
                                alt={bubble.alt || ""}
                                className="h-auto w-full"
                            />
                            <Hat frames={hatFrames} />
                        </div>
                    </li>
                )}
                {timeline?.map((experience) => {
                    const lead = CLIENT_LEAD[locale] ?? CLIENT_LEAD.de
                    return (
                        <li key={experience.id} className="flex flex-col items-start overflow-visible -m-8 p-8 text-left">
                            <span className="font-bold">{experience.year}</span>
                            {experience.event.map((event) => (
                                <span key={event.title} className="inline"><b>{event.title}</b> {event.description}</span>
                            ))}
                            {/2023/.test(experience.year ?? "") && (
                                <span className="mt-4 inline"><b>{lead.title}</b> {lead.description} {CLIENTS.join(", ")}</span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

function Hat({ frames }: { frames: string[] }) {
    if (!frames.length) return null
    return (
        <div className={HAT_BOX}>
            <AnimatedSvg contain animation={frames} interval={320} />
        </div>
    )
}
