// src/components/PortableTextComponents.tsx
import type { ReactNode } from 'react'
import type { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '../lib/sanity'

type LinkMarkValue = {
  href?: string
}

type ImageValue = {
  asset?: unknown
  alt?: string
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-3xl font-semibold tracking-tight text-slate-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-2xl font-semibold tracking-tight text-slate-900">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-6 text-[17px] leading-8 text-slate-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-teal-600 pl-5 text-lg leading-8 text-slate-700 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-3 pl-6 text-[17px] leading-8 text-slate-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-6 text-[17px] leading-8 text-slate-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-950">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({
      children,
      value,
    }: {
      children?: ReactNode
      value?: LinkMarkValue
    }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="font-medium text-teal-700 underline decoration-teal-300 underline-offset-4 transition hover:text-teal-800"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null

      return (
        <figure className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
          <img
            src={urlFor(value).width(1400).fit('max').auto('format').url()}
            alt={value.alt || 'Blog content image'}
            className="w-full object-cover"
          />
        </figure>
      )
    },
  },
}