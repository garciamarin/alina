import { ServicesDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import { Suspense } from "react";
import Services from "./Services";

export default async function AboutMeFetcher() {
    const { servicesBlock } = await getDato(ServicesDocument)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Services data={servicesBlock} />
        </Suspense>
    )
}