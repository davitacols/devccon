import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 EduShare. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

