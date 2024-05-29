import { getDato } from "@/lib/datocms"
import { AllPageDocument, AllPageQuery } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMe"
import Experience from "@/components/Experience"

export const metadata: Metadata = {
  title: 'Alina Salzer',
}

export default async function Page() {
  const { header, aboutMe, trainingBlock } = await getDato(AllPageDocument)
  if (!header) {
    return <div>Page not found</div>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <Header data={header} />
      <AboutMe data={aboutMe} />
      <Experience data={trainingBlock} />
      <div id="services">Services Section</div>
      <div id="contact">Contact Section</div>
    </main>
  )
}
