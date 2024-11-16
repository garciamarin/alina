"use client"
import { AllPageQuery } from "@/.graphql/datoTypes"
import { useState } from "react"
import { AnimatedSvg } from "./AnimateSvg"
import Image from "next/image"


export default function Services({ data }: { data: AllPageQuery['servicesBlock'] }) {
    const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined)
    return (
        <section id="services" className="!w-full section !gap-0">
            <div className="relative h-[150px] md:hidden my-8">
                <div className="absolute -left-8 w-screen h-[150px]">
                    <Image alt="Services header image" src={data?.basicContent?.image?.url!} fill className="object-contain" />
                </div>
            </div>
            <div className="relative hidden md:block w-[75vw] h-[250px] mx-auto my-8">
                <Image alt="Services header image" src={data?.basicContent?.image?.url!} fill className="object-contain" />
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2  justify-between">
                <ul className="flex md:flex-col gap-4 mx-auto justify-between">
                    {
                        data?.serviceList.map((service) => {
                            return (
                                <li
                                    onMouseLeave={() => setSelectedServiceId(undefined)}
                                    onMouseEnter={() => setSelectedServiceId(service.id)}
                                    key={service.id}
                                    className="md:grid md:grid-cols-1"
                                >
                                    <button
                                        onClick={() => setSelectedServiceId(service.id)}
                                        className="
                                        relative 
                                        hover:bg-slate-300 
                                        px-4 py-2 rounded-full
                                        flex flex-col md:flex-row items-center justify-around md:gap-1
                                        "
                                    >
                                        <div className="relative w-12 md:w-[calc(25vw/3)] h-12">
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
                    className="list-none my-auto mt-6 md:mt-auto md:w-1/2 md:h-auto transition-opacity duration-500 ease-in-out transform text-center">
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

