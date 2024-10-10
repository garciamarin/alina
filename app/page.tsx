import { getDato } from "@/lib/datocms"
import { FooterDocument, HeaderDocument } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMeFetcher"
import Experience from "@/components/ExperienceFetcher"
import Services from "@/components/ServicesFetcher"
import ContactAnchor from "@/components/ContactAnchor"
import Audios from "@/components/AudioBlock"
import ReactMarkdown from "react-markdown"


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

function Contact() {
  return (
    <section id="contact" className="section flex flex-col items-center justify-center m-16">
      <div className="font-sans">
        <h2 className="!font-thin !text-4xl section-header" >Kontakt</h2>
      </div>
      <ContactAnchor />
    </section>
  )
}

async function Footer() {
  const { footer } = await getDato(FooterDocument)
  return (
    < footer className="flex flex-col gap-1 items-center justify-center w-full bg-gray-800 text-[#edebec] mt-8 py-12 text-lg font-sans" >
      <p className="text-2xl">{footer?.title}</p>
      <ReactMarkdown>{footer?.content}</ReactMarkdown>
    </footer>
  )
}