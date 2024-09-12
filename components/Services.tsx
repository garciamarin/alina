"use client"
import { AllPageQuery, ServicesFragmentFragment } from "@/.graphql/datoTypes"
import bubble from '@/public/svg/bubble.svg'
import Image from 'next/image'
import { useState } from "react"
import { IoIosArrowDropdown } from "react-icons/io"


export default function Services({ data }: { data: AllPageQuery['servicesBlock'] }) {
    const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined)

    return (
        <section id="services" className="!w-full section !gap-0">
            {data?.basicContent?.heading &&
                <div className="relative h-[300px] !bg-no-repeat !bg-center"
                    style={{ background: `url(${data?.basicContent.image?.url!})` }}
                >
                </div>
            }
            <div className="relative">
                <div className="flex flex-col md:flex-row items-center justify-around h-[200px] ">
                    <ul className="flex md:flex-col gap-4 mx-auto">
                        {
                            data?.serviceList.map((service) => {
                                if (service.name === "SPRECHPROBEN") return
                                return (
                                    <li key={service.id} className="">
                                        <button onClick={() => setSelectedServiceId(service.id)} className="flex flex-col md:flex-row items-center justify-start md:gap-8 w-full">
                                            <span className="font-bold">{service.name}</span>
                                            <Image src={service.animationImages[4].url} alt="" width={50} height={50} />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="list-disc md:w-1/2 h-[150px] md:h-auto my-4 md:mt-auto">
                        {(data?.serviceList.find(service => service.id === selectedServiceId)?.description as string)?.split(",").map(
                            (text) => <li key={text}>{text}</li>
                        )}
                    </ul>
                </div>
                <div className="mt-8">
                    <AudioSamples audioSamples={data?.serviceList.find(service => service.name === "SPRECHPROBEN")!} />
                </div>
            </div>
        </section>
    )
}

function AudioSamples({ audioSamples }: { audioSamples: ServicesFragmentFragment['serviceList'][0] }) {
    const [hasSamples, setHasSamples] = useState(false)
    return (
        <div>
            <div className="flex items-center justify-center">
                <h2 className="section-header">{audioSamples.name}</h2>
                <button onClick={() => { setHasSamples(!hasSamples) }} className="relative flex align-middle cursor-pointer z-10 h-fit w-fit">
                    <Image className="cursor-pointer" src={bubble} width={75} height={75} alt={""} />
                    <IoIosArrowDropdown className=" cursor-pointer self-center p-1 absolute text-3xl/8 ml-5" />
                </button>
            </div>

            <ul className="mt-6 flex gap-4 justify-between h-[80px]">
                {hasSamples && audioSamples.audioList.map(sample => {
                    return (
                        <li className="flex flex-col items-center  justify-center gap-1" key={sample.displayName}>
                            <p className="font-bold">{sample.displayName}</p>
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
