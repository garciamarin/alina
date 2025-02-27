import { AllPageQuery } from "@/.graphql/datoTypes"
import Link from "next/link"
import Image from "next/image"
import logo from "@/public/images/logo.png"

export default function Header({ data }: { data: AllPageQuery['header'] }) {
    return (
        <header className="px-4 lg:px-10 flex-col flex md:flex-row justify-between items-start gap-4 absolute top-0">
            <div className="w-2/3 md:w-1/2">
                <Image
                    className=""
                    src={logo}
                    alt={"website's logo: a green tongue"}
                    width={logo.width || 100}
                    height={logo.height || 100} />
            </div>
            <nav className="z-30 top-0 md:ml-auto md:pt-4 lg:pt-8 animate-fade-in">
                <ul className=" flex lg:space-x-8 space-x-2 font-medium font-mono">
                    {data?.navigationBar.map((navItem) => (
                        <li className="hover:opacity-80 rounded-lg hover:shadow-lg p-2" key={navItem.id}>
                            <Link className="md:text-xl" href={"#" + navItem.section!}>{navItem.heading}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header >
    )
}