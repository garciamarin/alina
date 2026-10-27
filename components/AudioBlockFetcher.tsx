import { getDato } from "@/lib/datocms"
import AudioBlock from "./AudioBlock"
import { AudioBlockAnimationDocument, AudioListDocument } from "@/.graphql/datoTypes"
import type { AudioClip } from "./AudioSamples"

type Props = { locale: string }

export default async function AudioBlockFetcher({ locale }: Props) {
    let [{ audioList: animation }, { audioList: clips }] = await Promise.all([
        getDato(AudioBlockAnimationDocument, { locale }),
        getDato(AudioListDocument, { locale }),
    ])

    if (locale !== "de" && !animation?.images?.[0]?.url) {
        const de = await getDato(AudioBlockAnimationDocument, { locale: "de" })
        animation = de.audioList
    }

    if (locale !== "de" && !clips?.audio?.length) {
        const de = await getDato(AudioListDocument, { locale: "de" })
        clips = de.audioList
    }

    if (!animation) return null

    const samples: AudioClip[] = (clips?.audio ?? []).map((sample) => ({
        displayName: sample.displayName ?? "",
        audioUrl: sample.audio?.url,
        imageUrl: sample.animationImages?.[0]?.url,
    }))

    return (
        <div className="mt-8 md:mt-16" id="audioSamples">
            <AudioBlock
                images={(animation.images ?? []).map((image) => image.url).filter(Boolean)}
                samples={samples}
            />
        </div>
    )
}
