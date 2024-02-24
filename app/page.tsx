import { getDato } from "@/lib/datocms"
import Image from 'next/image'
import bubble from '@/public/bubble.svg'
import { AllPageDocument, AllPageQuery, HeaderRecord, RecordInterface } from '@/.graphql/datoTypes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alina Salzer',
}

export default async function Page() {
  const { header } = await getDato(AllPageDocument)

  if (!header) {
    return <div>Page not found</div>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header data={header} />
    </main>
  )
}

function Header({ data }: { data: AllPageQuery['header'] }) {
  return (
    <header className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">{data?.heading}</h1>
      {/* <Image src={bubble} alt={data?.backgroundAnimation.alt} width={data?.backgroundAnimation.width} height={data?.backgroundAnimation.height} /> */}
    </header>
  )
}