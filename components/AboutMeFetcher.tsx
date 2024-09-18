import { AboutMeDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import { Suspense } from "react";
import AboutMe from "./AboutMe";

export default async function AboutMeFetcher() {
    const { aboutMe } = await getDato(AboutMeDocument)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AboutMe data={aboutMe} />
        </Suspense>
    )
}