import { AllPageQuery, ServicesFragmentFragment } from "@/.graphql/datoTypes"
import { bahnSchrift } from "@/app/layout"
import image from '@/public/svg/dolmetschen_mund.svg'
import Image from 'next/image'


export default function Services({ data }: { data: AllPageQuery['servicesBlock'] }) {
    return (
        <section id="services" className="section">
            {data?.basicContent?.heading &&
                <div
                    className="items-center flex"
                    style={{ background: `url(${data?.basicContent.backgroundImages[0].image?.url}) no-repeat center/cover` }}>
                    <h2 className={`section-header ${bahnSchrift.className}`} >
                        {data?.basicContent.heading}
                    </h2>
                </div>
            }
            <ul
                className="flex flex-col gap-4 items-center"
                style={{ background: `url(${data?.serviceList[0].animationImages[0].url}) no-repeat center/cover` }}
            >
                {
                    data?.serviceList.map((service) => {
                        if (service.name === "SPRECHPROBEN") return
                        return <li key={service.id} className="flex items-center justify-center gap-4">
                            <span className="font-bold">{service.name}</span>
                            <Image src={image} alt="" width={50} height={50} />
                            <div className="w-[300px]">
                                <span>{service.description}</span>
                            </div>
                        </li>
                    })
                }
            </ul>
            <AudioSamples audioSamples={data?.serviceList.find(service => service.name === "SPRECHPROBEN")!} />
        </section>
    )
}

function AudioSamples({ audioSamples }: { audioSamples: ServicesFragmentFragment['serviceList'][0] }) {
    return (
        <div className="section">
            <h2 className={`section-header ${bahnSchrift.className}`}>{audioSamples.name}</h2>
            <ul>
                {audioSamples.audioList.map(sample => {
                    return (
                        <li className="flex items-center gap-4 justify-center" key={sample.displayName}>
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
