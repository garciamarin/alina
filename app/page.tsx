import { getDato } from "@/lib/datocms"
import { AllPageDocument } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMe"
import Experience from "@/components/Experience"

import Services from "@/components/Services"
export const metadata: Metadata = {
  title: 'Alina Salzer',
}

export default async function Page() {
  const { header, aboutMe, trainingBlock, servicesBlock, kontactBlock, footer } = await getDato(AllPageDocument)
  if (!header) {
    return <div>Page not found</div>
  }
  return (
    <>
      <Header data={header} />
      <main className="mx-auto flex min-h-screen flex-col items-center content-center px-4 lg:px-14 overflow-hidden max-w-screen-md">
        <AboutMe data={aboutMe} />
        <Experience data={trainingBlock} />
        <Services data={servicesBlock} />
      </main>
      <footer className="flex items-center justify-center w-full h-20 bg-gray-800 text-white mt-8">
        {footer?.title && <p>{footer?.title}</p>}
      </footer>
    </>

  )
}
