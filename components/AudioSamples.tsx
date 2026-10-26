"use client"
import { useEffect, useRef, useState } from "react"

export type AudioClip = {
    displayName: string
    audioUrl?: string | null
    imageUrl?: string | null
}

export function AudioSamples({ samples }: { samples: AudioClip[] }) {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null)

    return (
        <ul className="grid grid-cols-2 gap-6 md:gap-16">
            {samples.map((sample, index) => (
                <AudioSample
                    key={`${sample.displayName}-${index}`}
                    sample={sample}
                    playing={playingIndex === index}
                    onToggle={() => setPlayingIndex(playingIndex === index ? null : index)}
                    onEnded={() => setPlayingIndex(null)}
                />
            ))}
        </ul>
    )
}

function AudioSample({
    sample,
    playing,
    onToggle,
    onEnded,
}: {
    sample: AudioClip
    playing: boolean
    onToggle: () => void
    onEnded: () => void
}) {
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        if (playing) {
            audio.play().catch(() => {})
        } else {
            audio.pause()
        }
    }, [playing])

    return (
        <li>
            <button
                type="button"
                onClick={onToggle}
                aria-label={sample.displayName}
                aria-pressed={playing}
                className="h-36 w-36 cursor-pointer bg-contain bg-center bg-no-repeat md:h-48 md:w-48"
                style={{ backgroundImage: sample.imageUrl ? `url(${sample.imageUrl})` : undefined }}
            >
                {sample.audioUrl && (
                    <audio
                        ref={audioRef}
                        onEnded={() => {
                            if (audioRef.current) audioRef.current.currentTime = 0
                            onEnded()
                        }}
                    >
                        <source src={sample.audioUrl} type="audio/mpeg" />
                    </audio>
                )}
            </button>
        </li>
    )
}
