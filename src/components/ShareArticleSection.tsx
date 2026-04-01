// src/components/ShareArticleSection.tsx
import { useMemo, useState } from 'react'
import {
  Copy,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  Check,
} from 'lucide-react'

type ShareArticleSectionProps = {
  title: string
  excerpt?: string
}

export default function ShareArticleSection({
  title,
  excerpt,
}: ShareArticleSectionProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [])

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(excerpt || title)

  const links = {
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const handleNativeShare = async () => {
    if (!navigator.share) return

    try {
      await navigator.share({
        title,
        text: excerpt || title,
        url: shareUrl,
      })
    } catch (error) {
      console.error('Share cancelled or failed:', error)
    }
  }

  const iconBtn =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-[#36b6b4] hover:text-[#36b6b4]'

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#36b6b4]">
        Share article
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy article link"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:border-[#36b6b4] hover:text-[#36b6b4]"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied' : 'Copy link'}</span>
        </button>

        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Share article"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#36b6b4] px-4 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className={iconBtn}
        >
          <Twitter size={18} />
        </a>

        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={iconBtn}
        >
          <Linkedin size={18} />
        </a>

        <a
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className={iconBtn}
        >
          <Facebook size={18} />
        </a>

        <a
          href={links.email}
          aria-label="Share via email"
          className={iconBtn}
        >
          <Mail size={18} />
        </a>
      </div>
    </section>
  )
}