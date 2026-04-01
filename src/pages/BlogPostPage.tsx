// src/pages/BlogPostPage.tsx
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout';
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { sanity, urlFor } from '../lib/sanity'
import { blogPostBySlugQuery, relatedPostsQuery } from '../lib/queries'
import { portableTextComponents } from '../components/PortableTextComponents'
import type { BlogPost } from '../types/blog'
import ShareArticleSection from '@/components/ShareArticleSection'

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/blogs/${post.slug}`} className="block overflow-hidden bg-slate-100">
        {post.featuredImage ? (
          <img
            src={urlFor(post.featuredImage).width(900).height(600).fit('crop').url()}
            alt={post.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-[#36b6b4] text-sm text-slate-500">
            No image available
          </div>
        )}
      </Link>

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full border border-[#36b6b4] px-3 py-1 font-medium text-[#36b6b4]">
            {post.category}
          </span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>

        <Link to={`/blogs/${post.slug}`} className="block">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 transition group-hover:text-[#36b6b4]">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
          <span>{post.readTime} min read</span>
        <Link to={`/blogs/${post.slug}`}>
          <span className="font-medium text-[#36b6b4]">Read article</span>
        </Link>
        </div>
      </div>
    </article>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false)
        return
      }

      try {
        const postData = await sanity.fetch<BlogPost | null>(blogPostBySlugQuery, { slug })
        setPost(postData)

        if (postData?.category) {
          const related = await sanity.fetch<BlogPost[]>(relatedPostsQuery, {
            category: postData.category,
            slug,
          })
          setRelatedPosts(related)
        }
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
    <Layout>
      <main className="min-h-screen px-4 py-10 text-slate-900 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-5xl">
          <div className="h-6 w-32 animate-pulse rounded-full bg-white" />
          <div className="mt-6 h-16 w-full max-w-3xl animate-pulse rounded-3xl bg-white" />
          <div className="mt-4 h-6 w-full max-w-2xl animate-pulse rounded-2xl bg-white" />
          <div className="mt-10 h-[420px] animate-pulse rounded-[2rem] bg-white" />
          <div className="mt-10 space-y-4">
            <div className="h-5 animate-pulse rounded bg-white" />
            <div className="h-5 animate-pulse rounded bg-white" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-white" />
          </div>
        </div>
      </main>
    </Layout>
    )
  }

  if (!post) {
    return (
    <Layout>
      <main className="min-h-screen px-4 py-20 text-slate-900 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#36b6b4]">
            404
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Article not found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            The article you are looking for may have been moved or is no longer available.
          </p>
          <Link
            to="/blogs"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#36b6b4] px-6 text-sm font-semibold text-white transition hover:bg-teal-600 hover:text-white"
          >
            Back to blog
          </Link>
        </div>
      </main>
      </Layout>
    )
  }

  return (
    <Layout>
    <main className="min-h-screen text-slate-900 mt-10">
      <section className="border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-4">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#36b6b4]"
          >
            <span aria-hidden="true">←</span>
            Back to all articles
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full border border-[#36b6b4] bg-white px-3 py-1 font-medium text-[#36b6b4]">
                {post.category}
              </span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>{post.readTime} min read</span>
              {post.author?.name && <span>By {post.author.name}</span>}
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {post.excerpt}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {post.featuredImage && (
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <img
              src={urlFor(post.featuredImage).width(1600).height(920).fit('crop').url()}
              alt={post.title}
              className="h-full max-h-[600px] w-full object-cover"
            />
          </div>
        )}

        <div className={`mx-auto ${post.featuredImage ? 'mt-12' : 'mt-0'} grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_280px]`}>
          <article className="min-w-0">
            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-[#36b6b4]">
              <PortableText
                value={post.content || []}
                components={portableTextComponents}
              />
            </div>
          </article>

         <aside className="lg:sticky lg:top-24 lg:self-start">
  <div className="space-y-6">
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#36b6b4]">
        Article info
      </p>

      <dl className="mt-5 space-y-4 text-sm">
        <div className="border-b border-slate-100 pb-4">
          <dt className="text-slate-500">Published</dt>
          <dd className="mt-1 font-medium text-slate-900">
            {formatDate(post.publishedAt)}
          </dd>
        </div>

        <div className="border-b border-slate-100 pb-4">
          <dt className="text-slate-500">Reading time</dt>
          <dd className="mt-1 font-medium text-slate-900">
            {post.readTime} minutes
          </dd>
        </div>

        <div className="border-b border-slate-100 pb-4">
          <dt className="text-slate-500">Category</dt>
          <dd className="mt-1 font-medium text-slate-900">
            {post.category}
          </dd>
        </div>

        {post.author?.name && (
          <div>
            <dt className="text-slate-500">Author</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {post.author.name}
            </dd>
          </div>
        )}
      </dl>
    </div>

    <ShareArticleSection title={post.title} excerpt={post.excerpt} />

    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-900">
        Want more healthcare AI insights?
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Explore more articles from the MedAlly Journal.
      </p>
      <Link
        to="/blogs"
        className="mt-4 inline-flex text-sm font-semibold text-[#36b6b4] transition hover:text-teal-600"
      >
        Browse all posts →
      </Link>
    </div>
  </div>
</aside>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200/80 bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#36b6b4]">
                Continue reading
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Related articles
              </h2>
              <p className="mt-3 text-slate-600">
                More insights in {post.category.toLowerCase()}.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
    </Layout>
  )
}