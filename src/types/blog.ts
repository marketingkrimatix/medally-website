// src/types/blog.ts
export interface Author {
  name?: string
  image?: unknown
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content?: unknown[]
  featuredImage?: unknown
  category:
    | 'Industry News'
    | 'Technology'
    | 'Best Practices'
    | 'Company Updates'
    | 'Thought Leadership'
    | 'Tutorials'
  tags?: string[]
  readTime: number
  publishedAt: string
  author?: Author
}