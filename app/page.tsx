import { getDato } from "@/lib/datocms"
import { FooterDocument, HeaderDocument } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMeFetcher"
import Experience from "@/components/ExperienceFetcher"
import Services from "@/components/ServicesFetcher"
import Contact from "@/components/Contact"
import Audios from "@/components/AudioBlock"
import ReactMarkdown from "react-markdown"

export const metadata: Metadata = {
  title: 'Alina Salzer',
}

export default async function Page() {
  const { header } = await getDato(HeaderDocument)

  return (
    <div className="relative">
      <div className="h-screen -z-10" />
      <Header data={header} />
      <main className="mx-auto flex min-h-screen flex-col items-center content-center px-8 md:px-16 max-w-screen-xl">
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
