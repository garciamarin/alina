import { AllPageQuery } from "@/.graphql/datoTypes";
import { bahnSchrift } from "@/app/layout";

export default function Experience({ data }: { data: AllPageQuery['trainingBlock'] }) {
    return (
        <section id="experience" className="section">
            <ul className="grid grid-cols-2 gap-10 mt-4" >
                {data?.experience &&
                    <h2
                        className={`section-header ${bahnSchrift.className}`}
                        style={{ background: `url(${data.experience[0].backgroundImage?.url}) center` }}
                    >
                        {data?.displayName}
                    </h2>}
                {data?.experience.map((experience) => (
                    <li key={experience.id} className="flex flex-col items-center overflow-visible -m-8 p-8"
                    // style={{ background: `url(${experience.backgroundImage?.url}) no-repeat center/105%` }}
                    >
                        <span>{experience.year}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}