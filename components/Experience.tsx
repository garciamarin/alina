import { AllPageQuery } from "@/.graphql/datoTypes";

export default function Experience({ data }: { data: AllPageQuery['trainingBlock'] }) {
    return (
        <section id="experience" className="flex flex-col gap-4 text-center mt-8">
            {data?.experience &&
                <h2 className="text-3xl font-bold" >
                    {data?.displayName}
                </h2>}
            <ul className="grid grid-cols-4 gap-10" >
                {data?.experience.map((experience) => (
                    <li key={experience.id} className="flex flex-col items-center overflow-visible -m-10 p-10"
                        style={{ background: `url(${experience.backgroundImage?.url}) no-repeat center/150%` }}
                    >
                        <span>{experience.year}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}