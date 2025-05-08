import React from "react";
import { AnimatedSvg } from "./AnimateSvg";
import { getDato } from "@/lib/datocms";
import { ContactDocument } from "@/.graphql/datoTypes";
import Image from "next/image";



async function Contact() {
    const { kontactBlock } = await getDato(ContactDocument)

    return (
        <section id="contact" className="section mt-16 md:mt-32">
            <a
                href={EMAIL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
            >
                <div className="relative w-[80vw] h-[200px] sm:max-w-[600px] sm:w-[50vw] sm:h-[300px] flex items-center justify-center">
                    <Image
                        alt="Contact Block background"
                        src={kontactBlock?.basicContent?.image?.url!}
                        fill
                        className="object-contain hover:opacity-80 "
                    />
                </div>
                <div
                    className=" absolute flex items-center p-4 rounded-full z-10
                                right-[25vw] sm:right-[10vw] bottom-5 sm:bottom-10 w-[100px] h-[100px]
                              text-white font-semibold 
                                hover:opacity-80 group-hover:animate-bounce transition duration-100"
                >
                    <AnimatedSvg animation={kontactBlock?.basicContent?.animation?.map(animation => animation.url) || []} interval={250} contain />
                </div>
            </a>
        </section >
    )
}

export default Contact;

const subject = "Anfrage zu deinem Angebot";
const body = "Liebe Alina,\n\nich mag deine Arbeit und Website sehr und möchte dich kontaktieren, um...";
const encodedSubject = encodeURIComponent(subject);
const encodedBody = encodeURIComponent(body);
const email = "alina.salzer@gmx.net";
const EMAIL_LINK = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
