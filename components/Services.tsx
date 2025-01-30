"use client"
import { AllPageQuery } from "@/.graphql/datoTypes"
import { useState } from "react"
import { AnimatedSvg } from "./AnimateSvg"
import Image from "next/image"


export default function Services({ data }: { data: AllPageQuery['servicesBlock'] }) {
    const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined)
    return (
        <section id="services" className="!w-full section !gap-0 mb-10">
            {/* Mobile Section Header */}
            <>
                <div className="h-[170px] md:hidden" />
                <div className="absolute left-0 h-[130px] md:hidden my-8 w-screen overflow-hidden flex justify-center">
                    <div className="relative w-[100vw] h-[130px]">
                        <Image alt="Services header image" src={data?.basicContent?.image?.url!} fill className="object-cover" />
                    </div>
                </div>
            </>

            {/* Desktop Section Header */}
            <>
                <div className="relative hidden md:block w-[75vw] h-[250px] mx-auto mb-12">
                    <Image alt="Services header image" src={data?.basicContent?.image?.url!} fill className="object-contain" />
                </div>
            </>

            {/* Services List */}
            <div className="flex flex-col md:grid md:grid-cols-2  justify-between">
                <ul className="flex md:flex-col gap-8 mx-auto justify-between">
                    {
                        data?.serviceList.map((service) => {
                            return (
                                <li
                                    onMouseLeave={() => setSelectedServiceId(undefined)}
                                    onMouseEnter={() => setSelectedServiceId(service.id)}
                                    key={service.id}
                                    className="md:grid md:grid-cols-1 mt-4"
                                >
                                    <button
                                        onClick={() => setSelectedServiceId(service.id)}
                                        type="button"
                                        className="
                                        relative 
                                        px-4 py-2 rounded-full
                                        flex flex-col md:flex-row items-center justify-around md:gap-1
                                        transition-all duration-300 ease-in-out
                                        hover:scale-110 shadow focus:scale-110
                                        "
                                    >
                                        <div className="relative w-14 h-14 md:w-[calc(25vw/4)] md:h-[calc(25vw/4)]">
                                            {selectedServiceId === service.id
                                                ? <AnimatedSvg animation={service.animationImages.map(image => image.url)} interval={350} contain />
                                                : <Image alt={`{${service.name} animation icon`} src={service.animationImages[0].url} fill className="object-contain" />
                                            }
                                        </div>
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul
                    className="mt-6 list-none md:w-1/2 md:h-auto transition-opacity duration-500 ease-in-out transform text-center justify-self-start">
                    <li className="font-bold text-2xl pb-2">
                        {
                            (data?.serviceList.find(
                                service => service.id === selectedServiceId)?.name)
                        }
                    </li>
                    {(data?.serviceList.find(
                        service => service.id === selectedServiceId)
                        ?.description as string)
                        ?.split(",").map(
                            (text) => <li key={text}>{text}</li>
                        )}
                </ul>
            </div>
        </section>
    )
}

