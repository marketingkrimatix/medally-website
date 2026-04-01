// src/lib/sanity.ts
import { createClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2026-03-30',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanity)

export const urlFor = (source: SanityImageSource) => builder.image(source)