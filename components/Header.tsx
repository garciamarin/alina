import type { HeaderQuery } from "@/.graphql/datoTypes"
import Image from "next/image"
import HeaderNav from "./HeaderNav"

export default function Header({ data }: { data: HeaderQuery['header'] }) {
    if (!data) return null
    const frames = data.backgroundAnimation.map((image) => image.url).filter(Boolean)

    return (
        <header className="absolute top-0 w-full">
            <div className="relative ml-4 h-[40vw] w-[72%] max-h-[380px] md:h-[26vw] md:w-[44vw] lg:ml-10">
                {frames.map((image, index) => (
                    <Image
                        key={image}
                        src={image}
                        alt=""
                        fill
                        priority={index === frames.length - 1}
                        className={`object-contain object-top animate-logo-${index + 1}`}
                    />
                ))}
            </div>

            <HeaderNav items={data.navigationBar} />
        </header>
    )
}
