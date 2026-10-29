import { ExperienceDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import { Suspense } from "react";
import Experience from "./Experience";
type Props = { locale: string }

const HAT_FILES = [
    "ausbildung_bachelorpng.svg",
    "ausbildung_bachelor2png.svg",
    "ausbildung_bachelor3png.svg",
]

const HAT_QUERY = /* GraphQL */ `
    query HatFrames {
        allUploads(
            first: 10
            filter: { filename: { matches: { pattern: "ausbildung_bachelor", caseSensitive: false } } }
        ) {
            filename
            url
        }
    }
`

export default async function AboutMeFetcher({ locale }: Props) {
    const { trainingBlock: localizedTrainingBlock } = await getDato(ExperienceDocument, { locale })
    let trainingBlock = localizedTrainingBlock

    // MVP fallback: keep experience images consistent across locales
    if (locale !== "de" && !trainingBlock?.experience?.[0]?.backgroundImage?.url) {
        const { trainingBlock: deTrainingBlock } = await getDato(ExperienceDocument, { locale: "de" })
        trainingBlock = deTrainingBlock
    }

    const hats = await getDato<{ allUploads: { filename: string; url: string }[] }>(HAT_QUERY)
    const byName = new Map(hats.allUploads.map((upload) => [upload.filename.toLowerCase(), upload.url]))
    const hatFrames = HAT_FILES.map((name) => byName.get(name)).filter((url): url is string => !!url)

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Experience data={trainingBlock} hatFrames={hatFrames} locale={locale} />
        </Suspense>
    )
}