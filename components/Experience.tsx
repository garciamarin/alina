import { AllPageQuery } from "@/.graphql/datoTypes";
import { bahnSchrift } from "@/app/layout";
import Image from "next/image";

export default function Experience({ data }: { data: AllPageQuery['trainingBlock'] }) {
    return (
        <section id="experience" className="section">
            <ul className="grid grid-cols-2 gap-10 mt-4" >
                <div className="h-fit w-fit relative flex content-center items-center">
                    <Image src={data?.experience[0].backgroundImage?.url!} width={50} height={50} alt={data?.experience[0].backgroundImage?.url || ""} />
                    {data?.experience &&
                        <h2
                            className={`section-header ${bahnSchrift.className} bg-center bg-no-repeat flex items-center justify-center h-full`}
                        // style={{ background: `url(${data.experience[0].backgroundImage?.url})` }}
                        >
                            {data?.displayName}
                        </h2>}
                </div>
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