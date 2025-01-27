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
        <div className="flex justify-center content-center h-[300px]  md:h-[600px]  md:w-2/5 ">
            {!showAudios && (
                <div className="flex items-center justify-center">
                    <div className="h-[400px] w-screen md:h-[600px] md:w-2/5" >
                        <button
                            onClick={() => { setShowAudios(!showAudios) }}
                            type="button"
                            className=" hover:opacity-60 rounded-full absolute right-0 flex items-center justify-center md:h-[600px] md:w-2/5 h-[400px] w-screen">
                            <AnimatedSvg contain animation={audioList?.images.map(image => image.url) || []} />
                        </button>
                    </div>
                </div>
            )
            }
            <Suspense fallback={
                <div className="flex items-center justify-center mt-6">
                    <FaCircleNotch className="animate-spin h-20 w-10 text-[#ce6375]" />
                </div>
            }
            >
                {showAudios && <AudioSamples />}
            </Suspense>
        </div>
    )
}