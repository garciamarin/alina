'use client'

import type { AboutMeQuery } from "@/.graphql/datoTypes"
type AboutMeProps = { data: AboutMeQuery['aboutMe'] }
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function MeaningsBlock({ data }: AboutMeProps) {
    const meaningsArray = data?.meanings?.meanings?.map(meaning => meaning.description) || [];
    if (!meaningsArray.length) {
        return null;
    }
    const backgroundUrl = data?.meanings?.backgroundImage?.url
    const options = {
        type: 'loop',
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
        interval: 3000,
        speed: 2000,
    };

    return (
        <section id="meanings section" className="max-w-full">
            <div className="flex flex-col gap-2 items-center justify-start my-8 md:my-16 relative">
                <div className="relative z-40 flex mt-auto justify-self-end items-end md:mr-auto xl:mb-8 mb-1">
                    {data?.meanings?.heading &&
                        <a href="#meanings" className="mt-auto flex items-center cursor-pointer  hover:opacity-70">
                            <h3 className="text:lg md:text-xl inline-block scroll-m-10" id="meanings"                                >
                                {data?.meanings?.heading}
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
                                                <div style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined }}
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
