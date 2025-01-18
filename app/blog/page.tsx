import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getArticles } from '@/lib/articles'

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1
  const { articles, totalPages } = await getArticles(currentPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col">
            <CardHeader>
              <Image 
                src={article.cover_image || '/placeholder.svg'} 
                alt={article.title} 
                width={400} 
                height={200} 
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardTitle className="mt-4">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">By {article.author} • {new Date(article.published_at).toLocaleDateString()}</p>
              <p>{article.excerpt}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline">
                <Link href={`/blog/${article.slug}`}>Read more</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button 
            key={page} 
            variant={currentPage === page ? "default" : "outline"}
            asChild
          >
            <Link href={`/blog?page=${page}`}>{page}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

