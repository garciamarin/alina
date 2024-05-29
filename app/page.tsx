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
  const { header, aboutMe, trainingBlock, servicesBlock } = await getDato(AllPageDocument)
  if (!header) {
    return <div>Page not found</div>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <Header data={header} />
      <AboutMe data={aboutMe} />
      <Experience data={trainingBlock} />
      <Services data={servicesBlock} />
    </main>
  )
}

