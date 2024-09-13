import React from "react";

const ContactAnchor = () => {

    const subject = "Anfrage zu deinem Angebot";
    const body = "Liebe Alina,\n\nich mag deine Arbeit und Website sehr und möchte dich kontaktieren, um...";
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const email = "tell_mee@web.de";
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    return (
        <a
            href={mailtoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center px-6 py-3 bg-[#458F7C] text-white font-semibold rounded-lg hover:bg-[#458F7C80] transition duration-300"
        >
            Melde dich bei mir
            <span
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                →
            </span>
        </a>
    );
};

export default ContactAnchor;
