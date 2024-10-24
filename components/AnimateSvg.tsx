'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

export const AnimatedSvg = ({ animation, interval = 250, size = "default" }: {
    animation: string[]
    interval?: number
    size?: "fill" | "default"
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === animation.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(animationInterval);
    }, [animation, interval]);
    const imageProps = size === "fill" ? { layout: "fill" } : { width: 500, height: 300 };
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="transition-transform duration-700 ease-in-out">
                <Image
                    src={animation[currentIndex]}
                    alt="Contact Animation"
                    className="object-fill"
                    {...imageProps}
                />
            </div>
        </div>
    );
};