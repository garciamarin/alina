'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

export const AnimatedSvg = ({ animation, interval = 250, fill, contain }: {
    animation: string[]
    interval?: number
    fill?: true
    contain?: true
}) => {
    const frames = animation.filter(Boolean)
    const [currentIndex, setCurrentIndex] = useState(0)
    const framesKey = frames.join("|")

    useEffect(() => {
        if (frames.length < 2) return
        const animationInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % frames.length)
        }, interval)
        return () => clearInterval(animationInterval)
    }, [framesKey, frames.length, interval])

    if (!frames.length) return null

    const fit = contain ? "object-contain" : fill ? "object-fill" : "object-contain"

    return (
        <div className="relative h-full w-full">
            {frames.map((src, index) => (
                <Image
                    key={`${src}-${index}`}
                    src={src}
                    alt=""
                    fill
                    className={`${fit} transition-opacity duration-150 ${index === 0 || index === currentIndex ? "opacity-100" : "opacity-0"}`}
                />
            ))}
        </div>
    )
}
