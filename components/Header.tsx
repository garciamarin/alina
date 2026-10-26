import type { HeaderQuery } from "@/.graphql/datoTypes"
import Link from "next/link"
import Image from "next/image"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header({ data }: { data: HeaderQuery['header'] }) {
    if (!data) return null
    const frames = data.backgroundAnimation.map((image) => image.url).filter(Boolean)

    return (
        <header className="absolute top-0 w-full">
            <div className="relative ml-2 mt-1 h-[40vw] w-[68%] max-h-[380px] md:ml-8 md:h-[26vw] md:w-[44vw]">
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
                className="pointer-events-none absolute left-[40%] top-28 hidden w-40 lg:block xl:left-[44%] xl:w-48"
            />

            <nav className="fixed top-3 right-3 z-40 md:top-6 md:right-10">
                <ul className="flex max-w-[70vw] flex-wrap items-center justify-end gap-x-5 gap-y-2 font-mono font-medium md:max-w-none md:gap-x-8">
                    <li className="order-first flex w-full justify-end md:order-last md:w-auto">
                        <LanguageSwitcher />
                    </li>
                    {data.navigationBar.map((navItem) => (
                        <li key={navItem.id}>
                            <Link className="text-sm hover:opacity-80 md:text-xl" href={"#" + navItem.section!}>
                                {navItem.heading}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
