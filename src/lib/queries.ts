// src/lib/queries.ts
export const blogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    featuredImage,
    category,
    tags,
    readTime,
    publishedAt,
    author->{
      name,
      image
    }
  }
`

export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    featuredImage,
    category,
    tags,
    readTime,
    publishedAt,
    author->{
      name,
      image
    }
  }
`

export const relatedPostsQuery = `
  *[
    _type == "blogPost" &&
    category == $category &&
    slug.current != $slug
  ] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    category,
    readTime,
    publishedAt,
    author->{
      name
    }
  }
`