import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getArticles } from '@/lib/articles'

export default async function DashboardPage() {
  const { articles } = await getArticles(1, 100) // Fetch all articles for simplicity

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Article Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/new">Create New Article</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                By {article.author} • {new Date(article.published_at).toLocaleDateString()}
              </p>
              <div className="flex space-x-2 mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/edit/${article.id}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/blog/${article.slug}`}>View</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

