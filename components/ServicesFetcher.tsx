import { ServicesDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import { Suspense } from "react";
import Services from "./Services";
type Props = { locale: string }

export default async function AboutMeFetcher({ locale }: Props) {
    const { servicesBlock: localizedServicesBlock } = await getDato(ServicesDocument, { locale })
    let servicesBlock = localizedServicesBlock

    // MVP fallback: preserve localized text, but borrow images from `de` only when image URLs are missing.
    if (locale !== "de") {
        const hasMainImage = !!servicesBlock?.basicContent?.image?.url
        const hasAnyAnimationImage = !!servicesBlock?.serviceList?.some(
            (s: any) => !!s?.animationImages?.[0]?.url
        )

        if (!hasMainImage || !hasAnyAnimationImage) {
            const { servicesBlock: deServicesBlock } = await getDato(ServicesDocument, { locale: "de" })

            if (!servicesBlock) {
                servicesBlock = deServicesBlock
            } else if (deServicesBlock) {
                const localizedBasicContent = servicesBlock.basicContent
                const deBasicContent = deServicesBlock.basicContent

                const basicContent =
                    localizedBasicContent?.image?.url
                        ? localizedBasicContent
                        : localizedBasicContent && deBasicContent
                            ? {
                                ...localizedBasicContent,
                                image: deBasicContent.image,
                            }
                            : deBasicContent

                servicesBlock = {
                    ...servicesBlock,
                    basicContent,
                    serviceList: servicesBlock.serviceList.map((service: any) => {
                        const hasIcons = !!service?.animationImages?.[0]?.url
                        if (hasIcons) return service
                        const deService = deServicesBlock.serviceList.find((s: any) => s.id === service.id)
                        return {
                            ...service,
                            animationImages: deService?.animationImages ?? service.animationImages,
                        }
                    }),
                }
            }
        }
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Services data={servicesBlock} />
        </Suspense>
    )
}