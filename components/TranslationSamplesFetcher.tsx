import { TranslationSamplesDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import TranslationSamples from "./TranslationSamples";

export default async function TranslationSamplesFetcher({ locale }: { locale: string }) {
    const { translationSamplesBlock } = await getDato(TranslationSamplesDocument, { locale })

    return (
        <TranslationSamples
            locale={locale}
            title={translationSamplesBlock?.title}
            samples={translationSamplesBlock?.samples}
        />
    )
}
