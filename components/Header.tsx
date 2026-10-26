import type { HeaderQuery } from "@/.graphql/datoTypes"
import Link from "next/link"
import Image from "next/image"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header({ data }: { data: HeaderQuery['header'] }) {
    if (!data) return null
    const frames = data.backgroundAnimation.map((image) => image.url).filter(Boolean)

    return (
        <header className="absolute top-0 w-full">
            <div className="relative ml-4 mt-16 h-[40vw] w-[72%] max-h-[380px] md:mt-0 md:h-[26vw] md:w-[44vw] lg:ml-10">
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

            <img
                src="/svg/horproben_headset.svg"
                alt=""
                className="pointer-events-none absolute left-[47%] top-5 hidden w-28 xl:block xl:w-32"
            />

            <nav className="fixed inset-x-0 top-0 z-40 bg-[#edebec]/90 px-4 py-3.5 backdrop-blur-sm md:inset-x-auto md:right-10 md:top-8 md:bg-transparent md:p-0 md:backdrop-blur-none">
                <ul className="flex items-center justify-end gap-x-3 font-mono font-medium min-[400px]:gap-x-4 md:gap-x-5 lg:gap-x-8">
                    <li className="order-last">
                        <LanguageSwitcher />
                    </li>
                    {data.navigationBar.map((navItem) => (
                        <li key={navItem.id}>
                            <Link className="text-[13px] hover:opacity-80 min-[400px]:text-sm md:text-lg lg:text-xl" href={"#" + navItem.section!}>
                                {navItem.heading}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
