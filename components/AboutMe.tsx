'use client'

import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { IoIosArrowDropdown } from "react-icons/io"

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {

    const [currentMeaningIndex, setCurrentMeaningIndex] = useState<number>(0);
    const meaningsArray = data?.meanings?.meanings.map(meaning => meaning.description)!;
    const meaningsArrayLength = meaningsArray?.length!;
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [text, setText] = useState(meaningsArray[currentMeaningIndex]);
    const introText = data?.introText!.split("\n")!

    useEffect(() => {
        const switchTextInterval = setInterval(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setCurrentMeaningIndex((prevIndex) => (prevIndex + 1) % meaningsArrayLength);
                setIsFadingOut(false);
            }, 300);
        }, 3000);

        return () => clearInterval(switchTextInterval);
    }, [meaningsArrayLength]);

    useEffect(() => {
        setText(meaningsArray[currentMeaningIndex]);
    }, [currentMeaningIndex, meaningsArray]);

    return (
        <>
            <section className="max-w-full">
                {/* Intro block */}
                <div className="flex flex-col items-center">
                    <div className="absolute top-[200px] right-0 -z-10 mt-16">
                        <Image
                            className="ml-auto"
                            src={data?.image?.url!}
                            alt={data?.image?.alt!}
                            height={data?.image?.height!}
                            width={data?.image?.width!}
                        />
                    </div>
                    <div className="h-screen absolute top-0 flex flex-col">
                        <div className="h-24 md:h-[200px] 2xl:mt-8"></div>
                        <div id="about_me" className="flex items-center md:items-baseline justify-between relative w-full">
                            <div className="font-sans">
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
                        <div className="mt-4 md:mt-12 flex flex-col gap-4 md:mb-4 !text-left md:text-justify">
                            {data?.introText && <p className="max-w-screen-md">{introText[0]}</p>}
                            {data?.introText && <p className="max-w-screen-md">{introText[1]}</p>}
                        </div>
                    </div>
                </ div>
            </section>
            <section className="flex flex-col max-w-full h-[50vh]">
                {/* Meanings block */}
                <div
                    className="flex flex-col gap-2 items-center justify-start md:my-16"
                >
                    <div className="relative z-40 flex mt-auto justify-self-end items-end md:mr-auto xl:mb-8  mb-1">
                        {data?.meanings?.heading &&
                            <a href="#meanings" className="mt-auto flex items-center gap-2 cursor-pointer  hover:opacity-70">
                                <h3 className="text:lg md:text-xl inline-block scroll-m-10" id="meanings"                                >
                                    {data?.meanings?.heading}...
                                </h3>
                                <IoIosArrowDropdown className="h-6 w-6 md:block hidden" />
                            </a>
                        }
                    </div>
                    <div className="relative md:p-6">
                        <Image
                            className="p-16 md:p-4"
                            src={data?.meanings?.backgroundImage?.url!}
                            alt={data?.image?.alt!}
                            fill
                        />

                        <div className='flex md:-m-6 relative w-screen h-[300px] max-w-2xl text-center justify-between items-center'>
                            <div className="absolute  top-1/2 left-1/2 w-[150px] -translate-y-1/2 -translate-x-1/2" >
                                <p className={`
                                transition-opacity duration-500 ease-in-out 
                                ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    {text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-screen"></div>
            </section >
        </>
    )
}
