import { AllPageQuery } from "@/.graphql/datoTypes"
import { bahnSchrift } from "@/lib/fonts"
import Image from 'next/image'

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    return (
        <section id="about_me" className="section">
            <div
                className="flex flex-col gap-4 items-center justify-center"
                style={{ background: `url(${data?.image?.url}) no-repeat left/60%` }}
            >
                <div className="flex gap-8 items-center">
                    <div className={`font-sans flex flex-col items-start justify-start gap-4`}>
                        {data?.title && <h2 className="section-header" >{data?.title}</h2>}
                        {data?.subtitle && <h2 className="section-header">{data?.subtitle}</h2>}
                    </div>
                    <Image src={data?.profilePicture?.url!} alt={data?.profilePicture?.alt!} width={150} height={150} />
                </div>
                {data?.introText && <p className="text-center">{data?.introText}</p>}
            </ div>
            <div
                className="flex flex-col gap-2 items-center justify-center"
            >
                <div className="h-fit w-fit relative flex content-center items-center">
                    <Image src={data?.meanings?.backgroundImage?.url!} width={50} height={50} alt={data?.image?.alt || ""} />
                    {data?.meanings?.heading &&
                        <h3 className="text-xl"
                        // style={{ background: `url(${data?.meanings?.backgroundImage?.url}) no-repeat center/cover` }}
                        >
                            {data?.meanings?.heading}
                        </h3>}
                </div>
                <ul className="grid grid-cols-2">
                    {data?.meanings?.meanings?.map((meaning) => {
                        return meaning.description &&
                            <li key={meaning.id}>
                                <span>{meaning.description}</span>
                            </li>
                    }
                    )}
                </ul>
            </div>
        </section >
    )
}