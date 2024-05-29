import { AllPageQuery } from "@/.graphql/datoTypes"

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    return (
        <section id="about_me" className="flex flex-col gap-4 text-center mt-8">
            <div
                className="flex flex-col gap-4 h-[400px] items-center justify-center"
                style={{ background: `url(${data?.image?.url}) no-repeat center/cover` }}
            >
                {data?.title && <h2 className="text-3xl font-bold" >{data?.title}</h2>}
                {data?.subtitle && <h2 className="text-3xl font-bold">{data?.subtitle}</h2>}
                {data?.introText && <p>{data?.introText}</p>}
            </ div>
            <div
                className="flex flex-col gap-2 items-center justify-center h-[300px]"
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