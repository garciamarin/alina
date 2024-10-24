'use client'

import { useState, Suspense } from "react"
import { IoIosArrowDropdown } from "react-icons/io"
import { AudioSamples } from "./AudioSamples"
import Image from 'next/image'
import bubble from '@/public/svg/bubble.svg'
import { FaCircleNotch } from "react-icons/fa6"

export default function AudioBlock() {
    const [hasSamples, setHasSamples] = useState(false)

    return (
        <div className="m-8 md:m-16">
            <div id="#audioSamples" className="flex items-center justify-center">
                <a href="#audioSamples">
                    <h2 className="section-header">Sprechproben</h2>
                </a>
                <button onClick={() => { setHasSamples(!hasSamples) }} className="hover:opacity-80 relative flex align-middle cursor-pointer z-10 h-fit w-fit">
                    <Image className="cursor-pointer" src={bubble} width={75} height={75} alt={""} />
                    <IoIosArrowDropdown className="hover:opacity-80 cursor-pointer self-center p-1 absolute text-3xl/8 ml-5" />
                </button>
            </div>
            <Suspense fallback={
                <div className="flex items-center justify-center mt-6">
                    <FaCircleNotch className="animate-spin h-7 w-7 text-[#ce6375]" />
                </div>
            }
            >
                {hasSamples && <AudioSamples />}
            </Suspense>
        </div>
    )
}