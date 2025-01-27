'use client'

import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


type AboutMeQuery = { data: AllPageQuery['aboutMe'] }

export default function AboutMe({ data }: AboutMeQuery) {
    const introText = data?.introText!.split("\n")!

    return (
        <>
            <section className="max-w-full">
                {/* Intro block */}
                <div className="flex flex-col items-center w-full">
                    <div className="h-screen absolute top-0 flex flex-col w-full pb-8 px-4 md:pb-0 md:px-16 max-w-screen-xl mx-auto">
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
                </ div>
                <div className="absolute top-[200px] right-0 -z-10 mt-16">
                    <Image
                        className="ml-auto"
                        src={data?.image?.url!}
                        alt={data?.image?.alt!}
                        height={data?.image?.height!}
                        width={data?.image?.width!}
                    />
                </div>
            </section>
            <InterpretingMeansForMe data={data} />
        </>
    )
}


const InterpretingMeansForMe = ({ data }: AboutMeQuery) => {
    const meaningsArray = data?.meanings?.meanings.map(meaning => meaning.description)!;
    const options = {
        type: 'loop',
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
        interval: 3000,
        speed: 2000,
    };

    return (
        <section className="max-w-full">
            <div className="flex flex-col gap-2 items-center justify-start my-8 md:my-16 relative">
                <div className="relative z-40 flex mt-auto justify-self-end items-end md:mr-auto xl:mb-8 mb-1">
                    {data?.meanings?.heading &&
                        <a href="#meanings" className="mt-auto flex items-center cursor-pointer  hover:opacity-70">
                            <h3 className="text:lg md:text-xl inline-block scroll-m-10" id="meanings"                                >
                                {data?.meanings?.heading}...
                            </h3>
                        </a>
                    }
                </div>
                <Splide className="w-screen" options={options} aria-label="Interpreting meanings" hasTrack={false}>
                    <div className="custom-wrapper relative">
                        <SplideTrack>

                            {
                                meaningsArray.map(meaning => {
                                    return (
                                        <SplideSlide key={meaning}>
                                            <div className="flex  justify-center" >
                                                <div style={{ backgroundImage: `url(${data?.meanings?.backgroundImage?.url!})` }}
                                                    className="flex items-center justify-center bg-no-repeat bg-cover bg-center w-[300px] h-[300px] md:w-[400px] md:h-[400px] text-center">
                                                    <p className="p-4 md:p-8 w-[250px]">
                                                        {meaning}
                                                    </p>
                                                </div>
                                            </div>
                                        </SplideSlide>
                                    )
                                })
                            }
                        </SplideTrack>
                        <div className="splide__arrows !hidden" />
                    </div>
                </Splide>
            </div>
        </section >
    )
}