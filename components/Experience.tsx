import { AllPageQuery } from "@/.graphql/datoTypes";
import Image from "next/image";

export default function Experience({ data }: { data: AllPageQuery['trainingBlock'] }) {
    return (
        <section id="experience" className="section mt-16 md:mt-64">
            <div className="hidden md:block relative left overflow-visible">
                <Image
                    className="absolute -top-60"
                    src={data?.experience[0].backgroundImage?.url!}
                    width={450}
                    height={450}
                    alt={data?.experience[0].backgroundImage?.url || ""} />
            </div>
            <ul className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20" >
                <li>
                    <div className="block relative left overflow-visible">
                        <Image
                            className="relative top-5"
                            src={data?.experience[0].backgroundImage?.url!}
                            width={450}
                            height={450}
                            alt={data?.experience[0].backgroundImage?.url || ""} />
                    </div>
                </li>
                {data?.experience.map((experience) => (
                    <li key={experience.id} className="flex flex-col items-start overflow-visible -m-8 p-8 text-left"
                    >
                        <span className="font-bold">{experience.year}</span>
                        {experience.event.map((event) => (
                            <span key={event.title} className="inline"><b>{event.title}</b> {event.description}</span>
                        ))}
                    </li>
                ))}
            </ul>
        </section>
    )
}