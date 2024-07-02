import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    return (
        <section id="about_me" className="section">
            <div
                className="flex flex-col gap-4 items-center justify-center"
                style={{ background: `url(${data?.image?.url}) no-repeat left/60%` }}
            >
                <div className="flex gap-8 items-center relative">
                    <div className={`font-sans flex flex-col items-start justify-start gap-4`}>
                        {data?.title && <h2 className="section-header" >{data?.title}</h2>}
                        {data?.subtitle && <h2 className="section-header">{data?.subtitle}</h2>}
                    </div>
                    <Image src={data?.profilePicture?.url!} alt={data?.profilePicture?.alt!} width={150} height={150} />
                </div>
                {data?.introText && <p className="max-w-full">{data?.introText}</p>}
            </ div>
            <div
                className="flex flex-col gap-2 items-center justify-center"
            >
                <div className="flex content-center items-center">
                    {data?.meanings?.heading &&
                        <h3 className="text-xl"
                        >
                            {data?.meanings?.heading}...
                        </h3>}
                </div>
                <div className="relative max-w-full">
                    <div className="hidden md:block gradient -left-1" />
                    <ul
                        className='p-4 px-32 lg:px-64 overflow-x-scroll grid grid-row-1 grid-flow-col gap-32 items-center'
                    >
                        {data?.meanings?.meanings?.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="relative h-[280px] !w-[400px] text-center flex align-middl !bg-center !bg-no-repeat"
                                style={{ background: `url(${data?.meanings?.backgroundImage?.url!})` }}
                            >
                                <li className="absolute top-1/2 left-1/2 w-[150px] -translate-y-1/2 -translate-x-1/2" >
                                    {testimonial.description}
                                </li>
                            </div>
                        ))}
                    </ul>
                    <div className="hidden md:block gradient top-0 -right-1 rotate-180" />
                </div>
            </div>
        </section >
    )
}