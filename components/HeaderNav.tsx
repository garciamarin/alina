"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import LanguageSwitcher from "./LanguageSwitcher"

type NavItem = { id: string; heading?: string | null; section?: string | null }

export default function HeaderNav({ items }: { items: NavItem[] }) {
    const [pastFirstScreen, setPastFirstScreen] = useState(false)
    const [open, setOpen] = useState(false)
    const wrapper = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (!open) return
        const onPointer = (e: PointerEvent) => {
            if (!wrapper.current?.contains(e.target as Node)) setOpen(false)
        }
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        document.addEventListener("pointerdown", onPointer)
        document.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("pointerdown", onPointer)
            document.removeEventListener("keydown", onKey)
        }
    }, [open])

    return (
        <>
            <div
                aria-hidden
                className={`pointer-events-none fixed inset-x-0 top-0 z-30 hidden h-24 bg-[#edebec]/60 backdrop-blur-md transition-opacity duration-500 [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:block ${
                    pastFirstScreen ? "opacity-100" : "opacity-0"
                }`}
            />
            <div
                ref={wrapper}
                className="fixed right-4 top-3 z-40 flex items-center gap-2 md:right-10 md:top-8 md:gap-5 lg:gap-8"
            >
                <nav className="hidden md:block">
                    <ul className="flex items-center font-mono font-medium md:gap-x-5 lg:gap-x-8">
                        {items.map((item) => (
                            <li key={item.id}>
                                <Link className="text-lg hover:opacity-80 lg:text-xl" href={"#" + item.section!}>
                                    {item.heading}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <LanguageSwitcher />
                <button
                    type="button"
                    aria-label="Menu"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((v) => !v)}
                    className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md border border-[#1f9994]/40 bg-[#edebec] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1f9994]/50 focus:ring-offset-1 focus:ring-offset-[#edebec] md:hidden"
                >
                    <span
                        className={`h-[2px] w-[18px] rounded-full bg-[#1f9994] transition-transform duration-300 ${
                            open ? "translate-y-[7px] rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`h-[2px] w-[18px] rounded-full bg-[#1f9994] transition-opacity duration-200 ${
                            open ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`h-[2px] w-[18px] rounded-full bg-[#1f9994] transition-transform duration-300 ${
                            open ? "-translate-y-[7px] -rotate-45" : ""
                        }`}
                    />
                </button>

                <nav
                    id="mobile-menu"
                    aria-hidden={!open}
                    className={`absolute right-0 top-full mt-2 w-56 origin-top-right rounded-[1.75rem_0.5rem_1.75rem_1.75rem] border border-[#1f9994]/30 bg-[#edebec]/90 px-6 py-5 shadow-md backdrop-blur-md transition duration-300 md:hidden ${
                        open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0"
                    }`}
                >
                    <ul className="flex flex-col gap-4 font-mono font-medium uppercase tracking-wide">
                        {items.map((item) => (
                            <li key={item.id}>
                                <Link
                                    className="block text-lg text-black hover:text-[#1f9994]"
                                    href={"#" + item.section!}
                                    onClick={() => setOpen(false)}
                                    tabIndex={open ? 0 : -1}
                                >
                                    {item.heading}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}
