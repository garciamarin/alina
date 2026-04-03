import React from "react";
import { getDato } from "@/lib/datocms";
import { ContactDocument } from "@/.graphql/datoTypes";
import ContactClient from "./ContactClient";
type Props = { locale: string }



async function Contact({ locale }: Props) {
    const { kontactBlock: localizedKontactBlock } = await getDato(ContactDocument, { locale })
    const kontactBlock = localizedKontactBlock
    return <ContactClient
        imageUrl={kontactBlock?.basicContent?.image?.url!}
        animationUrls={kontactBlock?.basicContent?.animation?.map(a => a.url) || []}
    />
}

export default Contact;
