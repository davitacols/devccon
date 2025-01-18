import ArticleForm from '@/components/article-form'

export default function NewArticlePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
      <ArticleForm />
    </div>
  )
}

