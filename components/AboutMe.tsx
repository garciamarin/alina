import type { AboutMeQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'
import Meanings from "@/components/MeaningsBlock"

type AboutMeProps = { data: AboutMeQuery['aboutMe']; locale: string }

export default function AboutMe({ data, locale }: AboutMeProps) {
    const introText = (data?.introText || "").split("\n")
    const bubbleUrl = data?.image?.url
    const profileUrl = data?.profilePicture?.url
    const textDrop = locale === "de" || locale === "en" ? "mt-14 md:mt-20" : "mt-8 md:mt-14"

    return (
        <>
            <section id="intro" className="flex flex-col items-center w-full max-w-full">

                <div className="absolute top-[14vh] right-0 -z-10 animate-slide-from-right md:top-[140px]">
                    {bubbleUrl && (
                        <Image
                            className="ml-auto w-[92vw] max-w-none md:w-auto"
                            src={bubbleUrl}
                            alt=""
                            height={data?.image?.height ?? 1}
                            width={data?.image?.width ?? 1}
                            priority
                        />
                    )}
                </div>

                <div className="absolute top-0 flex w-full flex-col px-4 pt-40 md:px-16 md:pt-56 max-w-screen-xl mx-auto animate-fade-in">
                    <div id="about_me" className="flex items-center justify-between gap-4">
                        <div className="font-sans">
                            {data?.title && <h2 className="!font-thin !text-3xl md:!text-4xl section-header">{data?.title}</h2>}
                        </div>
                        <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full sm:h-[110px] sm:w-[110px] md:h-[200px] md:w-[200px]">
                            {profileUrl && (
                                <Image
                                    src={profileUrl}
                                    alt={data?.profilePicture?.alt || ""}
                                    fill
                                    className="object-cover rounded-full"
                                />
                            )}
                        </div>
                    </div>
                    <div className={`${textDrop} flex flex-col gap-4 !text-left md:text-justify`}>
                        {introText[0] && <p className="max-w-screen-md">{introText[0]}</p>}
                        {introText[1] && <p className="max-w-screen-md">{introText[1]}</p>}
                    </div>
                </div>
            </section>
            <Meanings data={data} />
        </>
    )
}
