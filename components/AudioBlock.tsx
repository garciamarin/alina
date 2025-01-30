import { getDato } from "@/lib/datocms";
import AudioBlock from "./AudioBlockFetcher";
import { AudioBlockAnimationDocument } from "@/.graphql/datoTypes";

export default async function AudioBlockFetcher() {
    const { audioList } = await getDato(AudioBlockAnimationDocument)

    return (
        audioList &&
        <div className="mt-8" id="#audioSamples">
            <AudioBlock audioList={audioList} />
        </div>
    )
}