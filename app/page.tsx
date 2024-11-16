import { getDato } from "@/lib/datocms"
import { ContactDocument, FooterDocument, HeaderDocument } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMeFetcher"
import Experience from "@/components/ExperienceFetcher"
import Services from "@/components/ServicesFetcher"
import ContactAnchor from "@/components/ContactAnchor"
import Audios from "@/components/AudioBlock"
import ReactMarkdown from "react-markdown"
import { AnimatedSvg } from "@/components/AnimateSvg"
import Image from "next/image"

export const metadata: Metadata = {
  title: 'Alina Salzer',
}

export default async function Page() {
  const { header } = await getDato(HeaderDocument)

  return (
    <div className="relative">
      <div className="relative h-screen -z-10" />
      <Header data={header} />
      <main className="mx-auto flex min-h-screen flex-col items-center content-center px-8 md:px-16 max-w-screen-lg">
        <AboutMe />
        <Experience />
        <Services />
        <Audios />
        <Contact />
      </main>
      <Footer />
    </div>

  )
}

async function Contact() {
  const { kontactBlock } = await getDato(ContactDocument)

  return (
    <section id="contact" className="section flex flex-col items-center justify-center !my-8">
      <div className="relative w-[80vw] h-[200px] md:w-[60vw] md:h-[300px]">
        <Image alt="Contact Block Header" src={kontactBlock?.basicContent?.image?.url!} fill className="object-contain" />
      </div>
      <ContactAnchor animation={kontactBlock?.basicContent?.animation!} />
    </section>
  )
}

async function Footer() {
  const { footer } = await getDato(FooterDocument)
  return (
    <footer
      className="flex flex-col gap-1 items-center justify-center w-full bg-no-repeat bg-cover pt-16 text-lg font-sans p-4 mt-8"
      style={{ backgroundImage: `url(${footer?.backgroundImage?.image?.url})`, backgroundPosition: 'center calc(100% + 1rem)' }}
    >
      <p className="text-2xl">{footer?.title}</p>
      <ReactMarkdown>{footer?.content}</ReactMarkdown>
    </footer>
  )
}
