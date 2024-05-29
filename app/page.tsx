import { getDato } from "@/lib/datocms"
import { AllPageDocument } from '@/.graphql/datoTypes'
import { Metadata } from 'next'
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: 'Alina Salzer',
}

export default async function Page() {
  const { header } = await getDato(AllPageDocument)

  if (!header) {
    return <div>Page not found</div>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <Header data={header} />
      <div id='about_me'>About me Section</div>
      <div id="services">Services Section</div>
      <div id="contact">Contact Section</div>
    </main>
  )
}
