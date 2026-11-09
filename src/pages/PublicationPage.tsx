import { Link, useParams } from 'react-router'
import { publicationsPage } from '@/content/pages/publications'
import { posts } from '@/content/posts'
import { formatDate } from '@/lib/format'
import { Seo } from '@/components/Seo'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function PublicationPage() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return <NotFoundPage />
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <article className="container section post">
        <Link to="/publicaciones" className="post__back">
          {publicationsPage.back}
        </Link>
        <h1>{post.title}</h1>
        <time className="post__date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <div className="post__body">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  )
}
