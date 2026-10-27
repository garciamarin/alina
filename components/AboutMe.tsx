import type { AboutMeQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'
import Meanings from "@/components/MeaningsBlock"

type AboutMeProps = { data: AboutMeQuery['aboutMe'] }

export default function AboutMe({ data }: AboutMeProps) {
    const introText = (data?.introText || "").split("\n")
    const bubbleUrl = data?.image?.url
    const profileUrl = data?.profilePicture?.url

    return (
        <>
            <section id="intro" className="flex flex-col items-center w-full max-w-full">

                <div className="absolute right-0 top-[calc(100svh-5vh)] -z-10 -translate-y-full md:top-[170px] md:translate-y-0">
                    <div className="relative animate-slide-from-right">
                        {bubbleUrl && (
                            <Image
                                className="ml-auto w-screen max-w-none md:w-[max(66vw,958px)]"
                                src={bubbleUrl}
                                alt=""
                                height={data?.image?.height ?? 1}
                                width={data?.image?.width ?? 1}
                                priority
                            />
                        )}
                        <img
                            src="/svg/horproben_headset.svg"
                            alt=""
                            className="pointer-events-none absolute bottom-full left-[26%] hidden w-32 translate-y-10 xl:block"
                        />
                    </div>
                </div>

                <div className="absolute top-0 flex h-[100svh] w-full flex-col px-4 pt-[calc(22vw+4rem+4vh)] md:h-screen md:px-16 md:pt-[calc(360px+6vh)] min-[1452px]:pt-[calc(198px+11.2vw+6vh)] max-w-screen-xl mx-auto animate-fade-in">
                    <div
                        id="about_me"
                        className="grid grid-cols-[1fr_auto] items-end gap-x-4 gap-y-6 md:items-center md:gap-x-12 md:gap-y-4"
                    >
                        <div className="font-sans md:self-end">
                            {data?.title && <h2 className="!font-thin !text-4xl section-header">{data?.title}</h2>}
                        </div>
                        <div className="relative h-[148px] w-[148px] shrink-0 overflow-hidden rounded-full md:col-start-2 md:row-span-2 md:row-start-1 md:h-[200px] md:w-[200px]">
                            {profileUrl && (
                                <Image
                                    src={profileUrl}
                                    alt={data?.profilePicture?.alt || ""}
                                    fill
                                    className="object-cover rounded-full"
                                />
                            )}
                        </div>
                        <div className="col-span-2 flex flex-col gap-3 !text-left md:col-span-1 md:self-start md:text-justify">
                            {introText[0] && <p className="max-w-screen-md">{introText[0]}</p>}
                            {introText[1] && <p className="max-w-screen-md">{introText[1]}</p>}
                        </div>
                    </div>
                </div>
            </section>
            <Meanings data={data} />
        </>
    )
}
