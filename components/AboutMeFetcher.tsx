import { AboutMeDocument } from "@/.graphql/datoTypes";
import { getDato } from "@/lib/datocms";
import { Suspense } from "react";
import AboutMe from "./AboutMe";
type Props = { locale: string }

export default async function AboutMeFetcher({ locale }: Props) {
    const { aboutMe: localizedAboutMe } = await getDato(AboutMeDocument, { locale })
    let aboutMe = localizedAboutMe

    // MVP fallback: preserve localized text, but borrow images from `de` only when image URLs are missing.
    if (locale !== "de") {
        const missingImages =
            !aboutMe?.image?.url ||
            !aboutMe?.profilePicture?.url ||
            !aboutMe?.meanings?.backgroundImage?.url

        if (missingImages) {
            const { aboutMe: deAboutMe } = await getDato(AboutMeDocument, { locale: "de" })

            aboutMe = {
                ...aboutMe,
                image: aboutMe?.image?.url ? aboutMe.image : deAboutMe?.image,
                profilePicture: aboutMe?.profilePicture?.url ? aboutMe.profilePicture : deAboutMe?.profilePicture,
                meanings: {
                    ...aboutMe?.meanings,
                    backgroundImage: aboutMe?.meanings?.backgroundImage?.url
                        ? aboutMe.meanings.backgroundImage
                        : deAboutMe?.meanings?.backgroundImage,
                },
            }
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AboutMe data={aboutMe} />
        </Suspense>
    )
}