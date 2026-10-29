"use client"
import { useEffect, useRef, useState } from "react"

export type AudioClip = {
    displayName: string
    audioUrl?: string | null
    imageUrl?: string | null
}

const DRIFT = [
    "mt-2 md:mt-2",
    "mt-8 md:mt-8",
    "mt-1 md:mt-14",
    "mt-11 md:mt-20",
]

export function AudioSamples({ samples }: { samples: AudioClip[] }) {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null)

    return (
        <ul className="mx-auto flex max-w-sm flex-wrap items-start justify-center md:max-w-none md:gap-x-6">
            {samples.map((sample, index) => (
                <li key={`${sample.displayName}-${index}`} className={DRIFT[index % DRIFT.length]}>
                    <AudioSample
                        sample={sample}
                        playing={playingIndex === index}
                        onToggle={() => setPlayingIndex(playingIndex === index ? null : index)}
                        onEnded={() => setPlayingIndex(null)}
                    />
                </li>
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
