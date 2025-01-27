import { getDato } from "@/lib/datocms";
import AudioBlock from "./AudioBlockFetcher";
import { AudioBlockAnimationDocument } from "@/.graphql/datoTypes";

export default async function AudioBlockFetcher() {
    const { audioList } = await getDato(AudioBlockAnimationDocument)

    return (
        audioList &&
        <div className="my-8 md:my-16" id="#audioSamples">
            <AudioBlock audioList={audioList} />
        </div>
    )
}