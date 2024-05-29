import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    return (
        <section id="about_me" className="flex flex-col gap-4 text-center m-8">
            <div
                className="flex flex-col gap-4 items-center justify-center mb-10"
                style={{ background: `url(${data?.image?.url}) no-repeat center/70%` }}
            >
                <div className="flex gap-8 items-center">
                    {data?.title && <h2 className="text-3xl font-bold" >{data?.title}</h2>}
                    <Image src={data?.profilePicture?.url!} alt={data?.profilePicture?.alt!} width={150} height={150} />
                </div>
                {data?.subtitle && <h2 className="text-2xl font-bold">{data?.subtitle}</h2>}
                {data?.introText && <p>{data?.introText}</p>}
            </ div>
            <div
                className="flex flex-col gap-2 items-center justify-center h-[300px] -m-12 p-12"
                style={{ background: `url(${data?.meanings?.backgroundImage?.url}) no-repeat center/cover` }}
            >
                {data?.meanings?.heading && <h3 className="text-lg">{data?.meanings?.heading}</h3>}
                <ul className="grid grid-cols-3">
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