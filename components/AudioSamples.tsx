import {
    AudioListDocument, AudioListQuery
} from "@/.graphql/datoTypes"
import { getDato } from "@/lib/datocms"
import { cache, useRef, useState } from "react";

const getAudios = cache(
    async () => {
        const { audioList } = await getDato(AudioListDocument)
        return audioList;
    }
);

export async function AudioSamples() {
    const audioList = await getAudios();

    return (
        <ul className="mt-8 grid grid-cols-2 gap-6 md:gap-16">
            {
                audioList?.audio.map(sample => <AudioSample key={sample.displayName} sample={sample} />)
            }
        </ul >
    )
}

function AudioSample({ sample }: { sample: NonNullable<AudioListQuery['audioList']>['audio'][number] }) {
    const audioRef = useRef<null | HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <li>
            <button
                onClick={(toggleAudio)}
                className="border-4 border-red-500 relative w-full h-auto cursor-pointer bg-contain bg-no-repeat bg-center border-none p-0 flex items-center justify-center outline-none"
                style={{ backgroundImage: `url(${sample.animationImages[0].url})` }}
            >
                <div className="text-white text-xl p-16 opacity-30 hover:opacity-80" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    {isPlaying ? '⏸️' : '▶️'}
                </div>
                <audio ref={audioRef}>
                    <source src={sample.audio?.url} type="audio/mpeg" />
                </audio>
            </button>
        </li>
    )
}