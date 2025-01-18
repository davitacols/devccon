import { NextResponse } from 'next/server';
import { createArticle } from '@/lib/articles';

export async function POST(request: Request) {
  const articleData = await request.json();

  try {
    const newArticle = await createArticle(articleData);
    return NextResponse.json({ message: 'Article created successfully', id: newArticle.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

