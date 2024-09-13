import { getDato } from "@/lib/datocms"
import { AllPageDocument, AllPageQuery } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMe"
import Experience from "@/components/Experience"
import Services from "@/components/Services"
import ContactAnchor from "@/components/ContactAnchor"

export const metadata: Metadata = {
  title: 'Alina Salzer',
}

export default async function Page() {
  const { header, aboutMe, trainingBlock, servicesBlock, kontactBlock, footer } = await getDato(AllPageDocument)
  if (!header) {
    return <div>Page not found</div>
  }
  return (
    <div className="relative">
      <div className="h-screen relative" />
      <Header data={header} />
      <main className="mx-auto flex min-h-screen flex-col items-center content-center px-4 md:px-16 max-w-screen-lg">
        <AboutMe data={aboutMe} />
        <Experience data={trainingBlock} />
        <Services data={servicesBlock} />
        <Contact data={kontactBlock} />
      </main>
      <footer className="flex flex-col gap-2 items-center justify-center w-full bg-gray-800 text-[#edebec] mt-8 p-6 text-lg font-mono">
        {footer?.title && <p>{footer?.title}</p>}
        <div>beeidigte Dolmetscherin & Übersetzerin </div>
        <div>
          Deutsch · Spanisch · Portugiesisch ·  Englisch
        </div>
      </footer>
    </div>

  )
}

function Contact({ data }: { data: AllPageQuery['kontactBlock'] }) {
  return (
    <section id="contact" className="section flex flex-col items-center justify-center mb-16">
      <div className="font-sans">
        <h2 className="!font-thin !text-4xl section-header" >Kontact</h2>
      </div>
      <ContactAnchor />
    </section>
  )
}