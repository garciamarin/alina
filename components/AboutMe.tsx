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

                <div className="absolute top-[calc(4rem+40vw+20vh-4.5rem)] right-0 -z-10 animate-slide-from-right md:top-[140px]">
                    {bubbleUrl && (
                        <Image
                            className="ml-auto w-[96vw] max-w-none md:w-auto"
                            src={bubbleUrl}
                            alt=""
                            height={data?.image?.height ?? 1}
                            width={data?.image?.width ?? 1}
                            priority
                        />
                    )}
                </div>

                <div className="absolute top-0 flex h-[90vh] w-full flex-col md:h-screen px-4 pt-[calc(4rem+40vw+20vh)] md:justify-center md:px-16 md:pb-[6vh] md:pt-[320px] max-w-screen-xl mx-auto animate-fade-in">
                    <div
                        id="about_me"
                        className="grid grid-cols-[1fr_auto] items-end gap-x-4 gap-y-5 md:items-center md:gap-x-12 md:gap-y-4"
                    >
                        <div className="font-sans md:self-end">
                            {data?.title && <h2 className="!font-thin !text-3xl md:!text-4xl section-header">{data?.title}</h2>}
                        </div>
                        <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-full md:col-start-2 md:row-span-2 md:row-start-1 md:h-[200px] md:w-[200px]">
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
