import { AudioListDocument } from "@/.graphql/datoTypes"
import { getDato } from "@/lib/datocms"
import { cache } from "react";

const getAudios = cache(
    async () => {
        const { audioList } = await getDato(AudioListDocument)
        return audioList;
    }
);

export async function AudioSamples() {
    const audioList = await getAudios();

    return (
        <ul className="mt-8 grid grid-cols-2 gap-4 justify-between">
            {audioList?.audio.map(sample => {
                return (
                    <li className="flex flex-col items-center  justify-center gap-1" key={sample.displayName}>
                        <p className="font-bold">{sample.displayName}</p>
                        <audio controls>
                            <source src={sample.audio?.url} type="audio/mpeg" />
                        </audio>
                    </li>
                )
            })}
        </ul >
    )
}
