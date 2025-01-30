import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'
import Meanings from "@/components/MeaningsBlock"

type AboutMeQuery = { data: AllPageQuery['aboutMe'] }

export default function AboutMe({ data }: AboutMeQuery) {
    const introText = data?.introText!.split("\n")!

    return (
        <>
            <section id="intro section" className="flex flex-col items-center w-full max-w-full">

                <div className="absolute top-[200px] right-0 -z-10 mt-16 animate-slide-in">
                    <Image
                        className="ml-auto"
                        src={data?.image?.url!}
                        alt="background image with Verbinden text"
                        height={data?.image?.height!}
                        width={data?.image?.width!}
                    />
                </div>

                {/* Intro block */}
                <div className="h-screen absolute top-0 flex flex-col w-full pb-8 px-4 md:pb-0 md:px-16 max-w-screen-xl mx-auto animate-fade-in">
                    {/* spacer */}
                    <div className="h-[200px] 2xl:mt-8" />
                    <div className="my-auto">
                        <div id="about_me" className="flex items-center md:items-baseline justify-between relative w-full">
                            <div className="px-4 md:px-0 font-sans">
                                {data?.title && <h2 className="!font-thin !text-4xl section-header" >{data?.title}</h2>}
                            </div>
                            <div className="relative w-[220px] h-[220px] lg:w-[230px] lg:h-[230px]">
                                <Image
                                    src={data?.profilePicture?.url!}
                                    alt={data?.profilePicture?.alt!}
                                    width={data?.profilePicture?.width!}
                                    height={data?.profilePicture?.height!}
                                />
                            </div>
                        </div>
                        <div className="px-4 md:px-0 mt-4 md:mt-12 flex flex-col gap-4 md:mb-4 !text-left md:text-justify">
                            {data?.introText && <p className="max-w-screen-md">{introText[0]}</p>}
                            {data?.introText && <p className="max-w-screen-md">{introText[1]}</p>}
                        </div>
                    </div>
                </div>
            </section>
            <Meanings data={data} />
        </>
    )
}
