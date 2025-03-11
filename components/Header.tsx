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
            flex-col flex md:flex-row justify-between items-start"
        >
            <div className="relative w-5/6 md:w-[50vw] h-[30vw] md:h-[20vw] max-h-[300px]">
                {animationArray.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Logo Animation Frame ${index + 1}`}
                        fill
                        className={`object-contain ${index < 3 ? "animate-logo-slide-from-top" : "animate-logo-fade-in"}`}
                        style={{
                            objectPosition: 'top',
                            '--animation-delay': `${(index + 1) * 0.2}s`,
                        } as React.CSSProperties}
                        priority
                    />
                )
                )}
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
