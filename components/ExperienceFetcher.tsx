import { ExperienceDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import { Suspense } from "react";
import Experience from "./Experience";

export default async function AboutMeFetcher() {
    const { trainingBlock } = await getDato(ExperienceDocument)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Experience data={trainingBlock} />
        </Suspense>
    )
}