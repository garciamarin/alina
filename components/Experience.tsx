"use client"
import type { ExperienceQuery } from "@/.graphql/datoTypes"
import Image from "next/image"
import { AnimatedSvg } from "./AnimateSvg"

const HAT_BOX = "pointer-events-none absolute left-[48%] -top-[15%] h-[28%] w-[38%]"

export default function Experience({
    data,
    hatFrames,
}: {
    data: ExperienceQuery["trainingBlock"]
    hatFrames: string[]
}) {
    // The first entry only carries the Ausbildung bubble and the freelance/client text. That text is printed under 2023.
    const [intro, ...timeline] = data?.experience ?? []
    const bubble = intro?.backgroundImage
    const clientsAfter = timeline.find((experience) => /2023/.test(experience.year ?? "")) ?? timeline[0]

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
                {timeline.map((experience) => {
                    return (
                        <li key={experience.id} className="flex flex-col items-start overflow-visible -m-8 p-8 text-left">
                            <span className="font-bold">{experience.year}</span>
                            {experience.event.map((event) => (
                                <span key={event.title} className="inline"><b>{event.title}</b> {event.description}</span>
                            ))}
                            {experience === clientsAfter &&
                                intro?.event.map((event, index) => (
                                    <span key={event.title} className={`inline ${index === 0 ? "mt-4" : ""}`}><b>{event.title}</b> {event.description}</span>
                                ))}
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
