import db from './db';

export async function getArticles(page = 1, pageSize = 9) {
  const offset = (page - 1) * pageSize;

  const { rows: articles } = await db.sql`
    SELECT id, title, slug, excerpt, author, published_at, cover_image
    FROM articles
    WHERE published = true
    ORDER BY published_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `;

  const { rows: [{ count }] } = await db.sql`SELECT COUNT(*) FROM articles WHERE published = true`;

  const totalPages = Math.ceil(Number(count) / pageSize);

  return {
    articles,
    totalPages
  };
}

export async function getArticleBySlug(slug: string) {
  const { rows } = await db.sql`
    SELECT id, title, slug, content, author, published_at, cover_image
    FROM articles
    WHERE slug = ${slug} AND published = true
  `;

  return rows[0];
}

export async function getArticleById(id: number) {
  const { rows } = await db.sql`
    SELECT id, title, slug, content, excerpt, author, cover_image
    FROM articles
    WHERE id = ${id}
  `;

  return rows[0];
}

export async function createArticle(articleData: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  cover_image: string;
}) {
  const { title, slug, content, excerpt, author, cover_image } = articleData;

  const { rows } = await db.sql`
    INSERT INTO articles (title, slug, content, excerpt, author, cover_image, published)
    VALUES (${title}, ${slug}, ${content}, ${excerpt}, ${author}, ${cover_image}, true)
    RETURNING id
  `;

  return rows[0];
}

export async function updateArticle(id: number, articleData: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  cover_image: string;
}) {
  const { title, slug, content, excerpt, author, cover_image } = articleData;

  await db.sql`
    UPDATE articles
    SET title = ${title}, slug = ${slug}, content = ${content}, excerpt = ${excerpt}, 
        author = ${author}, cover_image = ${cover_image}
    WHERE id = ${id}
  `;
}

