'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareerMatchPage() {
  const [interests, setInterests] = useState('')
  const { messages, append, isLoading } = useChat({
    api: '/api/career-match',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    append({ role: 'user', content: interests })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Career Matching</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Describe your interests, skills, and educational background..."
          className="mb-4"
          rows={5}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Find Career Matches'}
        </Button>
      </form>
      {messages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Career Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.map((message, index) => (
              <p key={index} className={message.role === 'user' ? 'mb-4' : 'mb-4 font-bold'}>
                {message.content}
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

