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
    <section id="contact" className="section mt-16 md:mt-44">
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
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-10 flex justify-center sm:-bottom-4">
            <div className="relative right-6 h-[150px] w-[170px] transition duration-100 group-hover:animate-bounce sm:right-10 sm:h-[230px] sm:w-[260px]">
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
