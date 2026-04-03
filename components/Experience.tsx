"use client"
import type { ExperienceQuery } from "@/.graphql/datoTypes";
import Image from "next/image";
import { useT } from "@/app/i18n";

export default function Experience({ data }: { data: ExperienceQuery['trainingBlock'] }) {
    const t = useT()
    return (
        <section id="experience" className="section mt-16 md:mt-[320px] ">
            <div className="hidden md:block relative left overflow-visible">
                <Image
                    className="absolute -top-[300px] left-10 -z-10"
                    src={data?.experience[0].backgroundImage?.url!}
                    width={450}
                    height={450}
                    alt={data?.experience[0].backgroundImage?.url || ""} />
            </div>
            <ul className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20" >
                <li className="block md:hidden">
                    <div className="relative left overflow-visible">
                        <Image
                            className="relative top-5"
                            src={data?.experience[0].backgroundImage?.url!}
                            width={450}
                            height={450}
                            alt={data?.experience[0].backgroundImage?.url || ""} />
                    </div>
                </li>
                <li className="flex flex-col items-start  overflow-visible -m-8 p-8 text-left gap-4   ">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold">{t("experience.since")}</span >
                        <span ><b>{t("experience.freelance_title")}</b>
                            {" "}
                            {t("experience.freelance_desc")}
                        </span>
                    </div>


                </li>
                {data?.experience.map((experience) => {
                    return experience.year !== "seit 2020" && (
                        <li key={experience.id} className="flex flex-col items-start overflow-visible -m-8 p-8 text-left"
                        >
                            <span className="font-bold">{experience.year}</span>
                            {experience.event.map((event) => (
                                <span key={event.title} className="inline"><b>{event.title}</b> {event.description}</span>
                            ))}
                        </li>
                    )
                })}
            </ul>
            <div className="flex flex-col gap-2 mt-8">
                <span className="lg:w-7/12 font-bold">{t("experience.clients_intro")} </span>
                <span className="lg:w-7/12">
                    UNESCO  •  Rosa-Luxemburg-Stiftung  •  EU-LAC  •  Caritas  •  LUSH GmbH  •  DOK Leipzig Filmfestival  •  Fusion Festival  •  Konzeptwerk Neue Ökonomie  •  u.a.
                </span>
            </div>
        </section>
    )
}