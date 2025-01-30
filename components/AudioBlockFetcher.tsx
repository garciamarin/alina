'use client'
import { useState, Suspense } from "react"
import { AudioSamples } from "./AudioSamples"
import { FaCircleNotch } from "react-icons/fa6"
import { AnimatedSvg } from "./AnimateSvg"


export default function AudioBlock({ audioList }: {
    audioList: {
        images: Array<{
            __typename?: "FileField";
            url: string;
            id: string;
        }>;
        buttonAnimation: Array<{
            __typename?: "FileField";
            url: string;
            id: string;
        }>;
    }
}) {
    const [showAudios, setShowAudios] = useState(false)

    return (
        <div className="flex relative items-center justify-center h-[300px] md:h-[400px] w-screen">
            {!showAudios && (
                <button
                    onClick={() => { setShowAudios(!showAudios) }}
                    type="button"
                    className="hover:opacity-60 rounded-full 
                            absolute right-0 
                            sm:h-[300px] sm:w-[60vw]
                            md:h-[400px] md:max-w-[600px] 
                            h-[300px] w-screen
                            ">
                    <AnimatedSvg contain animation={audioList?.images.map(image => image.url) || []} />
                </button>
            )
            }
            <Suspense fallback={
                <div className="flex items-center justify-center mt-6">
                    <FaCircleNotch className="animate-spin h-20 w-10 text-[#ce6375]" />
                </div>
            }
            >
                <div className="mt-4">
                    {showAudios && <AudioSamples />}
                </div>
            </Suspense>
        </div>
    )
}