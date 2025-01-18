import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">EduShare</Link>
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link href="/blog">Blog</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/collaborate">Collaborate</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/career-match">Career Match</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

