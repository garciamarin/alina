import { getDato } from "@/lib/datocms";
import AudioBlock from "./AudioBlockFetcher";
import { AudioBlockAnimationDocument } from "@/.graphql/datoTypes";
import { AnimatedSvg } from "./AnimateSvg";

export default async function AudioBlockFetcher() {
    const { audioList } = await getDato(AudioBlockAnimationDocument)
    return (
        <div className="flex md:flex-row flex-col-reverse justify-start m-8 md:m-16 md:gap-16 md:justify-between" id="#audioSamples">
            <AudioBlock buttonAnimation={audioList?.buttonAnimation.map(button => button.url)!} />
            <div className="md:h-[600px] md:w-2/5 h-[350px] w-screen" >
                <div className="absolute right-0 flex items-center justify-center md:h-[600px] md:w-2/5 h-[400px] w-screen">
                    <AnimatedSvg contain animation={audioList?.images.map(image => image.url) || []} />
                </div>
            </div>
        </div>
    )
}