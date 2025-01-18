import { notFound } from 'next/navigation'
import ArticleForm from '@/components/article-form'
import { getArticleById } from '@/lib/articles'

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(Number(params.id))

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      <ArticleForm article={article} />
    </div>
  )
}

