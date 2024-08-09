import { AllPageQuery } from "@/.graphql/datoTypes";
import Image from "next/image";

export default function Experience({ data }: { data: AllPageQuery['trainingBlock'] }) {
    return (
        <section id="experience" className="section">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10" >
                {/* <div className="w-[250px] h-[250px]  border-black border-4 self-center"> */}
                <Image
                    className="self-start -mt-4 mx-auto"
                    src={data?.experience[0].backgroundImage?.url!}
                    width={250}
                    height={250}
                    alt={data?.experience[0].backgroundImage?.url || ""} />
                {/* </div> */}
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