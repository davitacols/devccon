import { NextResponse } from 'next/server';
import { updateArticle } from '@/lib/articles';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const articleData = await request.json();
  const id = parseInt(params.id, 10);

  try {
    await updateArticle(id, articleData);
    return NextResponse.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Failed to update article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

