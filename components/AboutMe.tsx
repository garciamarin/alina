import { AllPageQuery } from "@/.graphql/datoTypes"
import { bahnSchrift } from "@/app/layout"
import Image from 'next/image'

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    return (
        <section id="about_me" className="section">
            <div
                className="flex flex-col gap-4 items-center justify-center"
                style={{ background: `url(${data?.image?.url}) no-repeat center/70%` }}
            >
                <div className="flex gap-8 items-center">
                    <div className={`${bahnSchrift.className} flex flex-col justify-start`}>
                        {data?.title && <h2 className="section-header" >{data?.title}</h2>}
                        {data?.subtitle && <h2 className="section-header">{data?.subtitle}</h2>}
                    </div>
                    <Image src={data?.profilePicture?.url!} alt={data?.profilePicture?.alt!} width={150} height={150} />
                </div>
                {data?.introText && <p className="text-center">{data?.introText}</p>}
            </ div>
            <div
                className="flex flex-col gap-2 items-center justify-center"
                style={{ background: `url(${data?.meanings?.backgroundImage?.url}) no-repeat center/cover` }}
            >
                {data?.meanings?.heading && <h3 className={`${bahnSchrift.className} text-xl`}>{data?.meanings?.heading}</h3>}
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