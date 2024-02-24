import { performRequest } from "@/lib/datocms"
import Image from 'next/image';
import bubble from '@/public/bubble.svg'

const PAGE_CONTENT_QUERY = `
query MyQuery {
  header {
    heading
    id
    navigationBar {
      id
      heading
    }
    backgroundAnimation {
      alt
      size
      height
      width
      title
      tags
    }
  }
}`


export default async function Home() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  console.log(data, data)
  const { header } = data

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header data={header} />
    </main>
  );
}

export function Header({ data }: { data: any }) {
  return (
    <header className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">{data.heading}</h1>
      <Image src={bubble} alt={data.backgroundAnimation.alt} width={data.backgroundAnimation.width} height={data.backgroundAnimation.height} />
    </header>
  )
}