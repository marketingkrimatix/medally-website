// src/pages/BlogsPage.tsx
import { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom'
import { sanity, urlFor } from '../lib/sanity'
import { blogPostsQuery } from '../lib/queries'
import type { BlogPost } from '../types/blog'

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function BlogListItem({ post }: { post: BlogPost }) {
  return (
    <article className="group grid gap-5 border-t border-slate-200/80 py-7 md:grid-cols-[220px_1fr] md:gap-7">
      <Link
        to={`/blogs/${post.slug}`}
        className="overflow-hidden rounded-2xl bg-slate-100"
      >
        {post.featuredImage ? (
          <img
            src={urlFor(post.featuredImage).width(600).height(420).fit('crop').url()}
            alt={post.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-full"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-[#36b6b4] text-sm text-slate-500">
            No image available
          </div>
        )}
      </Link>

      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full border border-[#36b6b4] px-3 py-1 font-medium text-[#36b6b4]">
              {post.category}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readTime} min read</span>
            {post.author?.name && <span>By {post.author.name}</span>}
          </div>

          <Link to={`/blogs/${post.slug}`} className="block">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 transition group-hover:text-[#36b6b4]">
              {post.title}
            </h3>
          </Link>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-5">
          <Link
            to={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#36b6b4] transition hover:text-[#36b6b4]"
          >
            Read article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [search, setSearch] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await sanity.fetch<BlogPost[]>(blogPostsQuery)
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const categories = useMemo(() => {
  const uniqueCategories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  ).sort()

  return ['All', ...uniqueCategories]
}, [posts])
  
const categoryCounts = useMemo(() => {
  return posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {})
}, [posts])

useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All')
    }
  }, [categories, activeCategory])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory

      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [posts, search, activeCategory])

  const featuredPost = filteredPosts[0]
  const remainingPosts = filteredPosts.slice(1)

  return (
    <Layout>
    <main className="min-h-screen text-slate-900 mt-10">
      <section className="border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-4">
          <span className="inline-flex rounded-full border border-[#36b6b4] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#36b6b4]">
            MedAlly Journal
          </span>

          <div className="mt-6 max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Insights for modern clinical teams
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Perspectives on healthcare AI, physician workflows, clinical efficiency,
              and best practices for smarter care delivery.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search articles, topics, or tags"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#36b6b4] focus:bg-white"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = category === activeCategory

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? 'bg-[#36b6b4] text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-[#36b6b4] hover:text-[#36b6b4]'
                    }`}
                  >
                    {category} {category !== 'All' ? `(${categoryCounts[category] || 0})` : `(${posts.length})`}
                  </button>
                )
              })}
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {loading ? (
          <div className="grid gap-8">
            <div className="h-[420px] animate-pulse rounded-[2rem] bg-white" />
            <div className="space-y-6">
              <div className="h-40 animate-pulse rounded-3xl bg-white" />
              <div className="h-40 animate-pulse rounded-3xl bg-white" />
              <div className="h-40 animate-pulse rounded-3xl bg-white" />
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              No articles found
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Try a different keyword or choose another category.
            </p>
          </div>
        ) : (
          <>
            {featuredPost && (
              <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                  <Link
                    to={`/blogs/${featuredPost.slug}`}
                    className="block h-full overflow-hidden bg-slate-100"
                  >
                    {featuredPost.featuredImage ? (
                      <img
                        src={urlFor(featuredPost.featuredImage)
                          .width(1400)
                          .height(900)
                          .fit('crop')
                          .url()}
                        alt={featuredPost.title}
                        className="h-full min-h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex min-h-[420px] items-center justify-center bg-[#36b6b4] text-slate-500">
                        No image available
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="rounded-full border border-[#36b6b4] px-3 py-1 font-medium text-[#36b6b4]">
                          {featuredPost.category}
                        </span>
                        <span>{formatDate(featuredPost.publishedAt)}</span>
                        <span>{featuredPost.readTime} min read</span>
                        {featuredPost.author?.name && (
                          <span>By {featuredPost.author.name}</span>
                        )}
                      </div>

                      <Link to={`/blogs/${featuredPost.slug}`} className="block">
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl group-hover:text-[#36b6b4]">
                          {featuredPost.title}
                        </h2>
                      </Link>

                      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                        {featuredPost.excerpt}
                      </p>

                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {featuredPost.tags.slice(0, 4).map((tag) => (
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

                    <div className="mt-8">
                      <Link
                        to={`/blogs/${featuredPost.slug}`}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#36b6b4] px-6 text-sm font-semibold text-white transition hover:bg-teal-600 hover:text-white"
                      >
                        Read featured article
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )}

            <div className="mt-12">
              {remainingPosts.map((post) => (
                <BlogListItem key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
    </Layout>
  )
}