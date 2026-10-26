"use client"
import { useRef, useState } from "react"

export type AudioClip = {
    displayName: string
    audioUrl?: string | null
    imageUrl?: string | null
}

export function AudioSamples({ samples }: { samples: AudioClip[] }) {
    return (
        <ul className="grid grid-cols-2 gap-6 md:gap-16">
            {samples.map((sample) => (
                <AudioSample key={sample.displayName} sample={sample} />
            ))}
        </ul>
    )
}

function AudioSample({ sample }: { sample: AudioClip }) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const toggleAudio = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) audio.pause()
        else audio.play()
        setIsPlaying(!isPlaying)
    }

    return (
        <li>
            <button
                type="button"
                onClick={toggleAudio}
                aria-label={sample.displayName}
                className="h-36 w-36 cursor-pointer bg-contain bg-center bg-no-repeat md:h-48 md:w-48"
                style={{ backgroundImage: sample.imageUrl ? `url(${sample.imageUrl})` : undefined }}
            >
                {sample.audioUrl && (
                    <audio ref={audioRef} onEnded={() => setIsPlaying(false)}>
                        <source src={sample.audioUrl} type="audio/mpeg" />
                    </audio>
                )}
            </button>
        </li>
    )
}
