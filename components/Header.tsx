import { AllPageQuery } from "@/.graphql/datoTypes"
import Link from "next/link"
import Image from "next/image"

export default function Header({ data }: { data: AllPageQuery['header'] }) {
    if (!data) return;
    const animationArray = data.backgroundAnimation.map(image => image.url)

    return (
        <header className="
            max-w-screen-3xl w-screen h-fit absolute top-0
            mx-auto px-4 lg:px-10 
            flex-col flex md:flex-row justify-start md:justify-between items-start"
        >
            <div className="relative w-5/6 md:w-[50vw] h-[30vw] md:h-[20vw] max-h-[300px]">
                {animationArray.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Logo Animation Frame ${index + 1}`}
                        fill
                        className={`object-contain animate-logo-${index + 1}`}
                        style={{ objectPosition: 'top' } as React.CSSProperties}
                        priority
                    />
                )
                )}
            </div>
            <nav className="z-30 md:top-0 md:ml-auto md:pt-4 lg:pt-8 animate-fade-in">
                <ul className="-mt-4 md:mt-0 flex lg:space-x-8 md:space-x-2 space-x-1 font-medium font-mono">
                    {data?.navigationBar.map((navItem) => (
                        <li className="hover:opacity-80 rounded-lg hover:shadow-lg pb-2 md:p-2" key={navItem.id}>
                            <Link className="md:text-xl" href={"#" + navItem.section!}>{navItem.heading}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header >
    )
}
