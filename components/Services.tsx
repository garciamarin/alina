"use client"
import { AllPageQuery, ServicesFragmentFragment } from "@/.graphql/datoTypes"
import bubble from '@/public/svg/bubble.svg'
import Image from 'next/image'
import { useState } from "react"


export default function Services({ data }: { data: AllPageQuery['servicesBlock'] }) {
    const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined)
    const translateServiceId = data?.serviceList.find(service => service.name === "DOLMETSCHEN")?.id
    return (
        <section id="services" className="!w-full section !gap-0">
            {data?.basicContent?.heading &&
                <div className="relative h-[300px] !bg-no-repeat !bg-center"
                    style={{ background: `url(${data?.basicContent.image?.url!})` }}
                >
                </div>
            }
            <div className="relative  !bg-no-repeat !bg-center h-[480px] !bg-contain
            ">
                <div className="absolute top-0 left-0 w-full h-full !bg-no-repeat !bg-center !bg-cover -z-10"
                // style={{ background: `url(${data?.})` }}
                />
                <div>
                    <ul className="absolute top-1/3 w-[150px] -translate-y-1/2 flex flex-col gap-4">
                        {
                            data?.serviceList.map((service) => {
                                if (service.name === "SPRECHPROBEN") return
                                return (
                                    <li key={service.id} className="">
                                        <button onClick={() => setSelectedServiceId(service.id)} className="flex items-center justify-start gap-8 w-full">
                                            <span className="font-bold">{service.name}</span>
                                            <Image src={service.animationImages[4].url} alt="" width={50} height={50} />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="absolute top-1/3 left-1/2 w-1/2 -translate-y-1/2 -translate-x-4">
                        {data?.serviceList.find(service => service.id === selectedServiceId)?.description}

                    </div>
                    <div className="absolute top-1/2 left-1/2 w-1/2 -translate-y-8 -translate-x-4">
                        {selectedServiceId === translateServiceId
                            &&
                            <AudioSamples audioSamples={data?.serviceList.find(service => service.name === "SPRECHPROBEN")!} />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

function AudioSamples({ audioSamples }: { audioSamples: ServicesFragmentFragment['serviceList'][0] }) {
    return (
        <div>
            <div className="flex items-center justify-center">
                <Image src={bubble} width={50} height={50} alt={""} />
                <h2 className="section-header">{audioSamples.name}</h2>
            </div>
            <ul>
                {audioSamples.audioList.map(sample => {
                    return (
                        <li className="flex items-center  justify-center" key={sample.displayName}>
                            <span>{sample.displayName}</span>
                            <audio controls>
                                <source src={sample.audio?.url} type="audio/mpeg" />
                            </audio>
                        </li>
                    )
                })}
            </ul >
        </div >
    )
}
