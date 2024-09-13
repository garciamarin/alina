'use client'

import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowDropdown, IoIosArrowForward } from "react-icons/io"

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    const [currentMeaningIndex, setCurrentMeaningIndex] = useState<number | undefined>(0)
    const meaningsArray = data?.meanings?.meanings.map(meaning => meaning.description)!
    const meaningsArrayLength = meaningsArray?.length!
    const introText = data?.introText!.split("\n")!

    const [isFadingOut, setIsFadingOut] = useState(false);
    const [text, setText] = useState(meaningsArray[currentMeaningIndex!]);

    useEffect(() => {
        setIsFadingOut(true); // Start fade-out

        const timeout = setTimeout(() => {
            setText(meaningsArray[currentMeaningIndex!]); // Change the text after fade-out
            setIsFadingOut(false); // Start fade-in
        }, 300); // Duration matches the fade-out duration

        return () => clearTimeout(timeout);
    }, [currentMeaningIndex]);


    function handleMeaningNavigation(type: "next" | "prev") {
        if (currentMeaningIndex === undefined) {
            setCurrentMeaningIndex(0);
            return
        }


        const modifyIndex = (index: number) => type === "next" ?
            (currentMeaningIndex! + 1) % meaningsArrayLength :
            (currentMeaningIndex! - 1 + meaningsArrayLength!) % meaningsArrayLength!
        setCurrentMeaningIndex(currentMeaningIndex => modifyIndex(currentMeaningIndex!))
    }

    return (
        <section className="flex flex-col max-w-full">
            {/* Intro block */}
            <div
                className="flex flex-col items-center"
            >
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
                    <div className="h-[300px] md:mt-16"></div>
                    <div id="about_me" className="flex items-baseline justify-between relative w-full">
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
                    <div className="mt-4 md:mt-12 flex flex-col gap-4 mb-4">
                        {data?.introText && <p className="max-w-screen-md">{introText[0]}</p>}
                        {data?.introText && <p className="max-w-screen-md">{introText[1]}</p>}
                    </div>
                    <div className="relative z-40 flex mt-auto justify-self-end items-center md:mr-auto mb-6">
                        {data?.meanings?.heading &&
                            <a href="#meanings" className="flex items-center gap-2 cursor-pointer">
                                <h3 className="text-xl inline-block scroll-m-4" id="meanings"                                >
                                    {data?.meanings?.heading}...
                                </h3>
                                <IoIosArrowDropdown className="h-6 w-6 md:block hidden" />
                            </a>
                        }
                    </div>
                </div>
            </ div>
            {/* Meanings block */}
            <div
                className="flex flex-col gap-2 items-center justify-start md:h-[30vh]"
            >
                <div className="relative md:p-6">
                    <Image
                        className="p-16 md:p-4"
                        src={data?.meanings?.backgroundImage?.url!}
                        alt={data?.image?.alt!}
                        fill
                    />

                    <div className='flex md:-m-6 relative w-screen h-[350px] max-w-2xl text-center justify-between items-center'>
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:ring hover:ring-[#E6103490] transition duration-200 ease-in-out"
                            onClick={() => handleMeaningNavigation("prev")}
                            style={{
                                backgroundImage: `url(${data?.meanings?.backgroundImage?.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <IoIosArrowBack className="h-5 w-5" />
                        </button>
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:ring hover:ring-[#E6103490] transition duration-200 ease-in-out"
                            onClick={() => handleMeaningNavigation("next")}
                            style={{
                                backgroundImage: `url(${data?.meanings?.backgroundImage?.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transform: 'scaleY(-1)',
                            }}
                        >
                            <IoIosArrowForward className="h-5 w-5" />
                        </button>
                        <div className="absolute  top-1/2 left-1/2 w-[150px] -translate-y-1/2 -translate-x-1/2" >
                            <p className={`
                            transition-opacity duration-300 ease-in-out 
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
    )
}
