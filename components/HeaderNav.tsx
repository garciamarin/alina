"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import LanguageSwitcher from "./LanguageSwitcher"

type NavItem = { id: string; heading?: string | null; section?: string | null }

export default function HeaderNav({ items }: { items: NavItem[] }) {
    const sentinel = useRef<HTMLDivElement>(null)
    const [stuck, setStuck] = useState(false)
    const [pastFirstScreen, setPastFirstScreen] = useState(false)

    useEffect(() => {
        const el = sentinel.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => {
            setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const update = () => setPastFirstScreen(window.scrollY > window.innerHeight * 0.85)
        update()
        window.addEventListener("scroll", update, { passive: true })
        window.addEventListener("resize", update)
        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
        }
    }, [])

    const position = stuck
        ? "fixed inset-x-0 top-0 bg-[#edebec]/80 py-3 backdrop-blur-md"
        : "absolute inset-x-0 top-[calc(22vw+1.5rem)]"

    return (
        <>
            <div
                aria-hidden
                className={`pointer-events-none fixed inset-x-0 top-0 z-30 hidden h-24 bg-[#edebec]/60 backdrop-blur-md transition-opacity duration-500 [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:block ${
                    pastFirstScreen ? "opacity-100" : "opacity-0"
                }`}
            />
            <div ref={sentinel} aria-hidden className="pointer-events-none absolute inset-x-0 top-[calc(22vw+1.5rem)] h-px md:hidden" />
            <nav
                className={`${position} z-40 px-4 md:fixed md:inset-x-auto md:right-10 md:top-8 md:bg-transparent md:p-0 md:backdrop-blur-none`}
            >
                <ul className="flex items-center gap-x-3 font-mono font-medium min-[400px]:gap-x-4 md:justify-end md:gap-x-5 lg:gap-x-8">
                    {items.map((item) => (
                        <li key={item.id}>
                            <Link
                                className="text-[13px] hover:opacity-80 min-[400px]:text-sm md:text-lg lg:text-xl"
                                href={"#" + item.section!}
                            >
                                {item.heading}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <LanguageSwitcher />
                    </li>
                </ul>
            </nav>
        </>
    )
}
