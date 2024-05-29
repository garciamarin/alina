import { AllPageQuery } from "@/.graphql/datoTypes"
import image from '@/public/svg/dolmetschen_mund.svg'
import Image from 'next/image'


export default function Services({ data }: { data: AllPageQuery['servicesBlock'] }) {
    return (
        <section id="services" className="flex flex-col gap-4 text-center mt-8">
            {data?.basicContent?.heading &&
                <div
                    className="h-[100px] items-center flex"
                    style={{ background: `url(${data?.basicContent.backgroundImages[0].image?.url}) no-repeat center/cover` }}>
                    <h2 className="text-3xl font-bold" >
                        {data?.basicContent.heading}
                    </h2>
                </div>
            }
            <ul
                className="flex flex-col gap-4 items-center"
                style={{ background: `url(${data?.serviceList[0].animationImages[0].url}) no-repeat center/cover` }}
            >
                {
                    data?.serviceList.map((service) => (
                        <li key={service.id} className="flex items-center justify-center gap-4">
                            <span className="font-bold">{service.name}</span>
                            <Image src={image} alt="" width={50} height={50} />
                            <div className="w-[300px]">
                                <span>{service.description}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}