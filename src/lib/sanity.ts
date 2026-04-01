// src/lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2026-03-30',
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

export const urlFor = (source: unknown) => builder.image(source)