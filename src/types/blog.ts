// src/types/blog.ts
import type { TypedObject } from '@portabletext/types'
import type { SanityImageObject } from '@sanity/image-url'

export interface Author {
  name?: string
  image?: unknown
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content?: TypedObject[]
  featuredImage?: SanityImageObject | null
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