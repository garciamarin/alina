import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AnimatedSvg } from "./AnimateSvg";

const ContactAnchor = ({ animation }: { animation: { url: string }[] }) => {

    const subject = "Anfrage zu deinem Angebot";
    const body = "Liebe Alina,\n\nich mag deine Arbeit und Website sehr und möchte dich kontaktieren, um...";
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const email = "alina.salzer@gmx.net";
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    return (
        <a
            href={mailtoLink}
            target="_blank"
            rel="noopener noreferrer"
            className=" flex items-center p-4 
            bg-[#458F7C] text-white 
            font-semibold rounded-full hover:bg-[#458F7C80] transition duration-300"
        >
            <div className="relative w-[80px] h-[80px] md:w-[50px] md:h-[50px]">
                <AnimatedSvg animation={animation.map(animation => animation.url) || []} interval={250} contain />
            </div>
        </a>
    );
};

export default ContactAnchor;
