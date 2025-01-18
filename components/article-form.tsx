'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ArticleFormProps {
  article?: {
    id: number
    title: string
    slug: string
    content: string
    excerpt: string
    author: string
    cover_image: string
  }
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    author: article?.author || '',
    cover_image: article?.cover_image || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = article ? `/api/articles/${article.id}` : '/api/articles'
    const method = article ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      // Handle error
      console.error('Failed to save article')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows={10} />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="cover_image">Cover Image URL</Label>
        <Input id="cover_image" name="cover_image" value={formData.cover_image} onChange={handleChange} />
      </div>
      <Button type="submit">{article ? 'Update' : 'Create'} Article</Button>
    </form>
  )
}

