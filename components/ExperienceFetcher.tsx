import { ExperienceDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import { Suspense } from "react";
import Experience from "./Experience";
type Props = { locale: string }

export default async function AboutMeFetcher({ locale }: Props) {
    const { trainingBlock: localizedTrainingBlock } = await getDato(ExperienceDocument, { locale })
    let trainingBlock = localizedTrainingBlock

    // MVP fallback: keep experience images consistent across locales
    if (locale !== "de" && !trainingBlock?.experience?.[0]?.backgroundImage?.url) {
        const { trainingBlock: deTrainingBlock } = await getDato(ExperienceDocument, { locale: "de" })
        trainingBlock = deTrainingBlock
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Experience data={trainingBlock} />
        </Suspense>
    )
}