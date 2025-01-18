import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to EduShare</h1>
      <p className="text-xl mb-8">Learn, collaborate, and find your perfect career path.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/blog">Explore Articles</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/career-match">Career Match</Link>
        </Button>
      </div>
    </div>
  )
}

