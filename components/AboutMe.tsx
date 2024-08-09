'use client'

import { AllPageQuery } from "@/.graphql/datoTypes"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

export default function AboutMe({ data }: { data: AllPageQuery['aboutMe'] }) {
    const [currentMeaningIndex, setCurrentMeaningIndex] = useState<number | undefined>(undefined)
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
        console.log('curren', currentMeaningIndex)
    }

    return (
        <section id="about_me" className="section !gap-0">
            {/* Intro block */}
            <div
                className="flex flex-col gap-4 items-center justify-between h-fit"
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
                <div className="flex items-baseline justify-between relative w-full">
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
                <div className="mt-4 flex flex-col gap-4">
                    {data?.introText && <p className="max-w-screen-md">{introText[0]}</p>}
                    {data?.introText && <p className="max-w-screen-md">{introText[1]}</p>}
                </div>

            </ div>
            {/* Meanings block */}
            <div
                className="flex flex-col gap-2 items-center justify-center mt-32"
            >
                <div className="flex justify-self-start items-center md:mr-auto">
                    {data?.meanings?.heading &&
                        <h3 className="text-xl"
                        >
                            {data?.meanings?.heading}...
                        </h3>}
                </div>
                <div className="relative p-6">
                    <Image
                        className="p-16 md:p-4"
                        src={data?.meanings?.backgroundImage?.url!}
                        alt={data?.image?.alt!}
                        fill
                    />

                    <div className='flex md:-m-6 relative w-screen h-[350px] md:h-[350px] md:!w-[450px] text-center justify-between items-center'>
                        <button
                            className="flex items-center justify-center w-10 h-10  rounded-full hover:bg-slate-300  transition duration-200 ease-in-out"
                            onClick={() => handleMeaningNavigation("prev")}>
                            <IoIosArrowBack className="h-5 w-5" />
                        </button>
                        <button
                            className="flex items-center justify-center w-10 h-10  rounded-full hover:bg-slate-300  transition duration-200 ease-in-out"
                            onClick={() => handleMeaningNavigation("next")}>
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
