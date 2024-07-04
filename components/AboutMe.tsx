import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    return (
        <section id="about_me" className="section">
            {/* Intro block */}
            <div
                className="realtive flex flex-col gap-4 items-center justify-center h-fit"
            >
                <Image
                    className="max-w-screen-lg h-full -z-10 lg:!left-16 !top-4 lg:!top-16"
                    src={data?.image?.url!}
                    alt={data?.image?.alt!}
                    fill
                />
                <div className="flex gap-8 items-center justify-between relative w-full">
                    <div className={`font-sans flex flex-col items-start justify-start gap-4`}>
                        {data?.title && <h2 className="!text-4xl section-header" >{data?.title}</h2>}
                        {data?.subtitle && <h3 className="text-2xl">{data?.subtitle}</h3>}
                    </div>
                    <div className="relative w-[180px] h-[180px] lg:w-[250px] lg:h-[250px]">
                        <Image src={data?.profilePicture?.url!} alt={data?.profilePicture?.alt!} className="object-contain" fill />
                    </div>
                </div>
                {data?.introText && <p className="max-w-screen-md">{data?.introText}</p>}
            </ div>
            {/* Meanings block */}
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
                <div className="relative max-w-full h-[300px]">
                    <div className="absolute left-1/2 -translate-x-1/2 w-screen">
                        <div className="hidden md:block gradient -left-1" />
                        <ul
                            className='p-4 px-32 lg:px-32 overflow-x-scroll grid grid-row-1 grid-flow-col items-center horizontal-scroll-animation'
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
            </div>
        </section >
    )
}
