"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import LanguageSwitcher from "./LanguageSwitcher"

type NavItem = { id: string; heading?: string | null; section?: string | null }

export default function HeaderNav({ items }: { items: NavItem[] }) {
    const sentinel = useRef<HTMLDivElement>(null)
    const [stuck, setStuck] = useState(false)

    useEffect(() => {
        const el = sentinel.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => {
            setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const position = stuck
        ? "fixed inset-x-0 top-0 bg-[#edebec]/90 py-3 backdrop-blur-sm"
        : "absolute inset-x-0 top-[calc(22vw+1.5rem)]"

    return (
        <>
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
