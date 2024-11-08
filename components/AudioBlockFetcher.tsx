'use client'
import { useState, Suspense } from "react"
import { AudioSamples } from "./AudioSamples"
import Image from 'next/image'
import { FaCircleNotch } from "react-icons/fa6"
import { AnimatedSvg } from "./AnimateSvg"

export default function AudioBlock({ buttonAnimation }: { buttonAnimation: string[] }) {
    const [showAudios, setShowAudios] = useState(false)
    return (
        <div className="flex justify-center content-center">
            {!showAudios && <div className="flex items-center justify-center">
                <button
                    onClick={() => { setShowAudios(!showAudios) }}
                    className="hover:opacity-80 hover:bg-slate-300 rounded-full relative flex align-middle cursor-pointer h-fit w-fit p-2 group"
                >
                    <div className="relative w-24 md:w-[calc(25vw/3)] h-24">
                        <div className="hidden group-hover:block">
                            <AnimatedSvg animation={buttonAnimation} interval={350} fill />
                        </div>
                        <Image alt={`Animation of headphones`} src={buttonAnimation[0]} fill className="object-contain group-hover:hidden" />
                    </div>
                </button>
            </div>}
            <Suspense fallback={
                <div className="flex items-center justify-center mt-6">
                    <FaCircleNotch className="animate-spin h-10 w-10 text-[#ce6375]" />
                </div>
            }
            >
                {showAudios && <AudioSamples />}
            </Suspense>
        </div>
    )
}