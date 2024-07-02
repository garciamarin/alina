import { AllPageQuery } from "@/.graphql/datoTypes"
import Link from "next/link"
import Image from "next/image"
import logo from "@/public/images/logo.png"

export default function Header({ data }: { data: AllPageQuery['header'] }) {
    return (
        <header className="px-4 lg:px-10 flex justify-between items-start gap-4">
            <div className="md:w-2/3">
                <Image
                    className=""
                    src={logo}
                    alt={"website's logo"}
                    width={logo.width || 100}
                    height={logo.height || 100} />
            </div>
            <nav className="ml-auto md:pt-4 lg:pt-8">
                <ul className="flex lg:space-x-8 space-x-4 font-medium font-mono">
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