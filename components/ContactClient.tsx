"use client"
import React, { useState } from "react";
import { AnimatedSvg } from "./AnimateSvg";
import Image from "next/image";
import { useT } from "@/app/i18n";

export default function ContactClient({
  imageUrl,
  animationUrls,
}: {
  imageUrl: string | undefined
  animationUrls: string[]
}) {
  const t = useT()
  const [isHover, setIsHover] = useState(false)
  const firstFrame = animationUrls?.[0]
  const subject = t("contact.email_subject");
  const body = t("contact.email_body");
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const email = "alina.salzer@gmx.net";
  const EMAIL_LINK = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

  return (
    <section id="contact" className="section mt-16 md:mt-32">
      <a
        href={EMAIL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="relative w-[80vw] h-[200px] sm:max-w-[600px] sm:w-[50vw] sm:h-[300px] flex items-center justify-center">
          {imageUrl ? (
            <Image
              alt={t("common.contact_bg_alt")}
              src={imageUrl}
              fill
              className="object-contain hover:opacity-80 "
            />
          ) : (
            <div className="relative w-full h-full">
              {firstFrame ? (
                isHover ? (
                  <AnimatedSvg animation={animationUrls || []} interval={250} contain />
                ) : (
                  <Image
                    alt="Contact Animation"
                    src={firstFrame}
                    fill
                    className="object-contain"
                  />
                )
              ) : null}
            </div>
          )}
        </div>
        {imageUrl && (
          <div
            className=" absolute flex items-center p-4 rounded-full z-10
                                  right-[25vw] sm:right-[13vw] bottom-5 sm:bottom-10 w-[100px] h-[100px] md:w-[150px] md:h-[150px]
                                text-white font-semibold 
                                  hover:opacity-80 group-hover:animate-bounce transition duration-100"
          >
            <div className="relative w-full h-full">
              {firstFrame ? (
                isHover ? (
                  <AnimatedSvg animation={animationUrls || []} interval={250} contain />
                ) : (
                  <Image
                    alt="Contact Animation"
                    src={firstFrame}
                    fill
                    className="object-contain"
                  />
                )
              ) : null}
            </div>
          </div>
        )}
      </a>
    </section >
  )
}
