import { Link, useParams } from 'react-router'
import { posts } from '@/content/posts'
import { site } from '@/content/site'
import { formatDate } from '@/lib/format'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return <NotFoundPage />
  }

  return (
    <>
      <title>{`${post.title} | ${site.name}`}</title>
      <article className="container section post">
        <h1>{post.title}</h1>
        <time className="post__date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <div className="post__body">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <Link to="/blog" className="post__back">
          ← Volver al blog
        </Link>
      </article>
    </>
  )
}
