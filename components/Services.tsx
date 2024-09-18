"use client"
import { AllPageQuery, AudioListDocument, ServicesFragmentFragment } from "@/.graphql/datoTypes"
import Image from 'next/image'
import { useState } from "react"



export default function Services({ data }: { data: AllPageQuery['servicesBlock'] }) {
    const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined)
    return (
        <section id="services" className="!w-full section !gap-0">
            {data?.basicContent?.heading &&
                <a href="#services" className="relative h-[200px] md:h-[300px] !bg-no-repeat !bg-center"
                    style={{ background: `url(${data?.basicContent.image?.url!})` }}
                >
                </a>
            }
            <div className="relative">
                <div className="flex flex-col md:flex-row items-center justify-around md:h-[200px] ">
                    <ul className="flex md:flex-col gap-4 mx-auto">
                        {
                            data?.serviceList.map((service) => {
                                return (
                                    <li key={service.id} className="">
                                        <button onMouseEnter={() => setSelectedServiceId(service.id)} onClick={() => setSelectedServiceId(service.id)} className="flex flex-col md:flex-row items-center justify-start md:gap-8 w-full">
                                            <span className="font-bold">{service.name}</span>
                                            <Image src={service.animationImages[4].url} alt="" width={50} height={50} />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="my-auto mt-6 md:mt-auto list-disc md:w-1/2 md:h-auto transition-opacity duration-500 ease-in-out transform text-left">
                        {(data?.serviceList.find(service => service.id === selectedServiceId)?.description as string)?.split(",").map(
                            (text) => <li key={text}>{text}</li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    )
}

