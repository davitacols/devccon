import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.cover_image }],
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="mb-8">
        <Image 
          src={article.cover_image || '/placeholder.svg'} 
          alt={article.title} 
          width={1200} 
          height={600} 
          className="object-cover w-full h-[400px] rounded-lg"
        />
      </div>
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      <div className="mt-8 text-sm text-gray-600">
        By {article.author} • Published on {new Date(article.published_at).toLocaleDateString()}
      </div>
    </article>
  )
}

