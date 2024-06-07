import { AllPageQuery } from "@/.graphql/datoTypes"
import Link from "next/link"
import Image from "next/image"
import { bahnSchrift } from "@/app/layout"

export default function Header({ data }: { data: AllPageQuery['header'] }) {
    const lastAnimationImage = data?.backgroundAnimation.find((image) => image.title === "final")
    return (
        <header className={`px-4 lg:px-10 flex justify-between items-start ${bahnSchrift.className}`} >
            <div className="w-2/3">
                {lastAnimationImage &&
                    <Image
                        className=""
                        src={lastAnimationImage?.url}
                        alt={lastAnimationImage.alt || 'understand logo'}
                        width={lastAnimationImage?.width || 100}
                        height={lastAnimationImage?.height || 100} />
                }
            </div>
            <nav className="ml-auto">
                <ul className="flex space-x-4">
                    {data?.navigationBar.map((navItem) => (
                        <li key={navItem.id}>
                            <Link href={`#${navItem.section}`}>{navItem.heading}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header >
    )
}