'use client'
import { useState } from "react"
import { AnimatedSvg } from "./AnimateSvg"
import { AudioSamples, type AudioClip } from "./AudioSamples"

export default function AudioBlock({ images, samples }: {
    images: string[]
    samples: AudioClip[]
}) {
    const [showAudios, setShowAudios] = useState(false)

    return (
        <div className={`relative flex w-screen items-center justify-center ${showAudios ? "min-h-[28rem] py-8 md:min-h-[22rem]" : "h-[300px] md:h-[400px]"}`}>
            {!showAudios && (
                <button
                    onClick={() => setShowAudios(true)}
                    type="button"
                    aria-label="Sprechproben"
                    className="absolute right-0 h-[300px] w-screen hover:opacity-80 sm:h-[300px] sm:w-[60vw] md:h-[400px] md:max-w-[600px]"
                >
                    <AnimatedSvg contain animation={images} />
                </button>
            )}
            {showAudios && (
                <div className="mt-4">
                    <AudioSamples samples={samples} />
                </div>
            )}
        </div>
    )
}
