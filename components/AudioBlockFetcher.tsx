import { getDato } from "@/lib/datocms";
import AudioBlock from "./AudioBlock";
import { AudioBlockAnimationDocument } from "@/.graphql/datoTypes";
type Props = { locale: string }

export default async function AudioBlockFetcher({ locale }: Props) {
    const { audioList: localizedAudioList } = await getDato(AudioBlockAnimationDocument, { locale })
    let audioList = localizedAudioList

    // MVP fallback: keep audio sample animations consistent across locales
    if (locale !== "de" && (!audioList?.images?.[0]?.url || !audioList?.buttonAnimation?.[0]?.url)) {
        const { audioList: deAudioList } = await getDato(AudioBlockAnimationDocument, { locale: "de" })
        audioList = deAudioList
    }

    return (
        audioList &&
        <div className="mt-8" id="#audioSamples">
            <AudioBlock audioList={audioList} />
        </div>
    )
}
