import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages: [
      { role: 'system', content: 'You are a career advisor. Based on the user\'s interests, skills, and educational background, suggest suitable career paths.' },
      ...messages,
    ],
  })
  return result.toDataStreamResponse()
}

