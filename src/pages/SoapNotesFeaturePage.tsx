// src/pages/SoapNotesFeaturePage.tsx
import { useEffect, useState, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  HeartPulse,
  Layers3,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Workflow,
} from 'lucide-react'
import Layout from '@/components/Layout'
import { SEO } from '@/components/SEO'

type SoapItem = {
  letter: 'S' | 'O' | 'A' | 'P'
  title: string
  short: string
  description: string
  bullets: string[]
  icon: ComponentType<{ className?: string }>
  gradient: string
  softBg: string
  iconWrap: string
  borderGlow: string
  letterColor: string
  bulletIcon: string
}

type FaqItem = {
  question: string
  answer: string
}

const soapItems: SoapItem[] = [
  {
    letter: 'S',
    title: 'Subjective',
    short: 'Patient symptoms, history, and concerns',
    description:
      'Captures the patient’s symptoms, history, concerns, and symptom progression in their own words.',
    bullets: [
      'Symptoms and complaint history',
      'Pain description and timing',
      'Relevant medical history',
      'Patient perspective and concerns',
    ],
    icon: FileText,
    gradient: 'from-violet-500/15 via-fuchsia-500/10 to-transparent',
    softBg: 'bg-violet-50/80',
    iconWrap: 'bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white',
    borderGlow: 'hover:border-violet-300',
    letterColor: 'text-violet-200',
    bulletIcon: 'text-violet-600',
  },
  {
    letter: 'O',
    title: 'Objective',
    short: 'Measurable clinical findings',
    description:
      'Includes measurable findings that support accurate and verifiable medical documentation.',
    bullets: [
      'Vitals and measurements',
      'Physical exam findings',
      'Lab and imaging results',
      'Observable clinical signs',
    ],
    icon: Microscope,
    gradient: 'from-cyan-500/15 via-sky-500/10 to-transparent',
    softBg: 'bg-cyan-50/80',
    iconWrap: 'bg-gradient-to-br from-sky-600 to-cyan-500 text-white',
    borderGlow: 'hover:border-cyan-300',
    letterColor: 'text-cyan-200',
    bulletIcon: 'text-cyan-600',
  },
  {
    letter: 'A',
    title: 'Assessment',
    short: 'Diagnosis or clinical interpretation',
    description:
      'Summarizes the clinician’s evaluation, diagnosis, and clinical reasoning based on the encounter.',
    bullets: [
      'Primary diagnosis',
      'Differential diagnosis',
      'Clinical interpretation',
      'Reasoning behind findings',
    ],
    icon: Stethoscope,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    softBg: 'bg-amber-50/80',
    iconWrap: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
    borderGlow: 'hover:border-amber-300',
    letterColor: 'text-amber-200',
    bulletIcon: 'text-amber-600',
  },
  {
    letter: 'P',
    title: 'Plan',
    short: 'Treatment, medications, and next steps',
    description:
      'Documents medications, investigations, referrals, follow-up, and patient instructions.',
    bullets: [
      'Treatment decisions',
      'Prescriptions and tests',
      'Follow-up instructions',
      'Referrals and next actions',
    ],
    icon: ClipboardList,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    softBg: 'bg-rose-50/80',
    iconWrap: 'bg-gradient-to-br from-rose-500 to-pink-500 text-white',
    borderGlow: 'hover:border-rose-300',
    letterColor: 'text-rose-200',
    bulletIcon: 'text-rose-600',
  },
]

const benefits = [
  {
    text: 'Improve clarity and consistency in clinical records',
    icon: ShieldCheck,
    tone: 'from-violet-500/15 to-fuchsia-500/10',
    iconWrap: 'bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white',
  },
  {
    text: 'Support better clinical decision-making',
    icon: Workflow,
    tone: 'from-cyan-500/15 to-sky-500/10',
    iconWrap: 'bg-gradient-to-br from-sky-600 to-cyan-500 text-white',
  },
  {
    text: 'Enable better communication between providers',
    icon: Activity,
    tone: 'from-emerald-500/15 to-teal-500/10',
    iconWrap: 'bg-gradient-to-br from-emerald-600 to-teal-500 text-white',
  },
  {
    text: 'Reduce errors in medical documentation',
    icon: FileText,
    tone: 'from-amber-500/20 to-orange-500/10',
    iconWrap: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
  },
  {
    text: 'Ensure clinical documentation compliance',
    icon: Sparkles,
    tone: 'from-rose-500/20 to-pink-500/10',
    iconWrap: 'bg-gradient-to-br from-rose-500 to-pink-500 text-white',
  },
]

const careSettings = [
  { name: 'Hospitals',
    tone: 'from-violet-500/10 to-transparent',
   },
  { name: 'Clinics',
    tone: 'from-cyan-500/10 to-transparent',
   },
  { name: 'Outpatient settings',
    tone: 'from-amber-500/10 to-transparent' }
];

const challenges = [
  {
    title: 'Time-consuming manual documentation',
    accent: 'from-violet-500/15 to-fuchsia-500/10',
  },
  {
    title: 'Missing or incomplete information',
    accent: 'from-cyan-500/15 to-sky-500/10',
  },
  {
    title: 'Variation across clinicians',
    accent: 'from-amber-500/20 to-orange-500/10',
  },
  {
    title: 'Administrative workload and time pressure',
    accent: 'from-rose-500/15 to-pink-500/10',
  },
]

const aiBenefits = [
  'Automatically structure notes into SOAP format',
  'Reduce repetitive typing and admin load',
  'Improve consistency across encounters',
  'Help clinicians stay focused on patient care',
]

const bestPractices = [
  'Be concise and clinically relevant',
  'Use standardized medical terminology',
  'Focus on relevant clinical details',
  'Keep objective data measurable',
  'Follow compliance standards',
]

const compareItems = [
  {
    title: 'Progress notes',
    href: '/clinical-documentation/progress-notes/',
    body: 'Useful for tracking changes over time across ongoing care encounters.',
    accent: 'from-violet-500/15 to-fuchsia-500/10',
  },
  {
    title: 'Discharge summaries',
    href: '/clinical-documentation/progress-notes/',
    body: 'Used to summarize inpatient treatment, outcomes, and follow-up instructions.',
    accent: 'from-cyan-500/15 to-sky-500/10',
  },
  {
    title: 'General documentation',
    href: '/clinical-documentation/progress-notes/',
    body: 'Covers broader clinical documentation structures used across different care settings.',
    accent: 'from-amber-500/15 to-orange-500/10',
  },
]

const faqItems: FaqItem[] = [
  {
    question: 'What are SOAP notes?',
    answer:
      'SOAP notes are a structured clinical documentation format used to record patient encounters using Subjective, Objective, Assessment, and Plan.',
  },
  {
    question: 'What is the purpose of SOAP notes?',
    answer:
      'They organize medical documentation into a format that is easier to review, communicate, and act on.',
  },
  {
    question: 'Are SOAP notes still used today?',
    answer:
      'Yes. They remain one of the most widely used formats across modern healthcare settings.',
  },
  {
    question: 'Can AI be used to create SOAP notes?',
    answer:
      'Yes. AI clinical documentation tools can help structure SOAP notes while clinicians retain review and control.',
  },
]

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'framework', label: 'SOAP format' },
  { id: 'example', label: 'Example' },
  { id: 'importance', label: 'Importance' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'ai', label: 'AI support' },
  { id: 'best-practices', label: 'Best practices' },
  { id: 'faq', label: 'FAQ' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-3xl"
    >
      <span className="inline-flex rounded-full border border-violet-200/80 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-700 shadow-sm backdrop-blur">
        {eyebrow}
      </span>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />

      <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </motion.div>
  )
}

function FaqCard({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-hidden rounded-[1.5rem] border border-gray-300 bg-white/90 shadow-[0_12px_40px_rgba(89,54,140,0.08)] backdrop-blur"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="text-base font-semibold text-slate-900 sm:text-lg">
          {item.question}
        </span>

        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
            open
              ? 'rotate-180 border-violet-200 bg-violet-50 text-violet-700'
              : 'border-slate-200 bg-slate-50 text-slate-500'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="border-t border-slate-100 bg-gradient-to-r from-violet-50/50 via-white to-cyan-50/50 px-5 py-5 text-sm leading-7 text-slate-600 sm:px-6 sm:text-base">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SoapNotesFeaturePage() {
  const [activeSection, setActiveSection] = useState(navItems[0].id)

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          )[0]

        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: '-96px 0px -60% 0px',
        threshold: [0, 0.15, 0.3, 0.6],
      }
    )

    sections.forEach((section) => observer.observe(section))

    const syncFromHash = () => {
      const id = window.location.hash.replace('#', '')
      if (id) setActiveSection(id)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncFromHash)
    }
  }, [])

  return (
    <Layout>
          <SEO 
      title="SOAP Notes in Clinical Documentation: Meaning, Format & Examples | Medally"
      description="Learn what SOAP notes are in clinical documentation, including format, examples, and templates. Understand how doctors use SOAP notes and how AI simplifies medical documentation workflows."
      url="https://www.medally.ai/clinical-documentation/soap-notes/"
    />
    <main className="min-h-screen text-slate-900 mt-10">
      <section className="relative overflow-hidden border-b border-white/60">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(84,44,140,0.22),transparent_22%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.12),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.2))]" /> */}
        {/* <div className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" /> */}
        {/* <div className="absolute right-0 top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" /> */}

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 shadow-sm backdrop-blur">
              <HeartPulse className="h-4 w-4" />
              Clinical documentation
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              SOAP Notes in Clinical Documentation
              {/* <span className="mt-2 block bg-gradient-to-r from-[#542c8c] via-[#7c3aed] to-[#0891b2] bg-clip-text text-transparent">
                Clinical Documentation
              </span> */}
              <span className="mt-2 block text-xl font-medium text-slate-600 sm:text-2xl lg:text-3xl bg-gradient-to-r from-[#542c8c] via-[#7c3aed] to-[#0891b2] bg-clip-text text-transparent">
                Meaning, Format, Examples, and Template
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              SOAP notes in clinical documentation are a standardized method used by
              healthcare professionals to record patient information in a structured,
              consistent, and clinically useful format.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              This guide explains what SOAP notes are, their full form, detailed SOAP
              notes format, real SOAP note examples, and how AI clinical documentation is
              improving workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#framework"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#542c8c] via-[#6d28d9] to-[#0891b2] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(84,44,140,0.24)] transition hover:translate-y-[-1px]"
              >
                Explore the format
              </a>

              <a
                href="#example"
                className="inline-flex h-12 items-center justify-center rounded-full border border-violet-200/70 bg-white/85 px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-700"
              >
                See example and template
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Core framework',
                  value: 'S · O · A · P',
                  tint: 'from-violet-500/15 via-fuchsia-500/10 to-transparent',
                },
                {
                  label: 'Primary use',
                  value: 'Structured patient encounters',
                  tint: 'from-cyan-500/15 via-sky-500/10 to-transparent',
                },
                {
                  label: 'Modern fit',
                  value: 'AI-assisted documentation',
                  tint: 'from-amber-500/20 via-orange-500/10 to-transparent',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-[1.5rem] border border-white/70 bg-gradient-to-br ${item.tint} p-5 shadow-sm backdrop-blur`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_60px_rgba(84,44,140,0.12)] backdrop-blur sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                    SOAP framework
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    Structured for clear medical documentation
                  </h2>
                </div>

                <div className="rounded-full border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-3 text-violet-700 shadow-sm">
                  <Layers3 className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                {soapItems.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.letter}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.14 + index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/70 ${item.softBg} p-5 shadow-sm transition ${item.borderGlow}`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-100`}
                      />

                      <div className="relative flex items-start justify-between gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconWrap} shadow-sm`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <span
                          className={`text-3xl font-semibold tracking-tight ${item.letterColor}`}
                        >
                          {item.letter}
                        </span>
                      </div>

                      <div className="relative">
                        <h3 className="mt-5 text-lg font-semibold text-slate-950">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.short}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-dashed border-violet-200/70 bg-gradient-to-r from-violet-50/90 via-white to-cyan-50/80 p-5">
                <p className="text-sm font-medium text-slate-900">
                  A good SOAP note makes clinical thinking easier to read, easier to review,
                  and easier to act on.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-[0_12px_40px_rgba(84,44,140,0.08)] backdrop-blur">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
              On this page
            </p>

            <nav className="mt-5 space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setActiveSection(item.id)}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-50 to-cyan-50 text-violet-700'
                        : 'text-slate-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-cyan-50 hover:text-violet-700'
                    }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className={`h-3.5 w-3.5 transition ${isActive ? 'text-violet-700 opacity-100' : 'opacity-40 group-hover:translate-x-0.5 group-hover:opacity-100'}`} />
                </a>
              )
})}
            </nav>
          </div>
        </aside>

        <div className="space-y-20">
          <section id="overview">
            <SectionIntro
              eyebrow="Meaning"
              title="What are SOAP notes?"
              description="SOAP notes are a structured format of clinical documentation used to record patient encounters using four key sections: Subjective, Objective, Assessment, and Plan."
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
            >

              <div className="rounded-[2rem] border border-white/70 bg-gradient-to-br from-violet-50/80 via-white to-cyan-50/70 p-7 shadow-[0_12px_40px_rgba(84,44,140,0.08)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                  Soap Notes Full form
                </p>

                <div className="mt-5 space-y-4">
                  {soapItems.map((item) => (
                    <div
                      key={item.letter}
                      className="flex items-start gap-4 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm"
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconWrap} text-sm font-semibold shadow-sm`}
                      >
                        {item.letter}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-950">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.short}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-7 shadow-[0_12px_40px_rgba(84,44,140,0.08)] backdrop-blur">
                <p className="text-lg leading-8 text-slate-700">
                  SOAP notes are a standardized clinical documentation method used by
                  healthcare professionals to capture patient information in a clear and
                  organized format.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: 'Consistent',
                      cls: 'border-violet-200 bg-violet-50 text-violet-700',
                    },
                    {
                      label: 'Easy to review',
                      cls: 'border-cyan-200 bg-cyan-50 text-cyan-700',
                    },
                    {
                      label: 'Clinically accurate',
                      cls: 'border-amber-200 bg-amber-50 text-amber-700',
                    },
                    {
                      label: 'Useful for ongoing patient care',
                      cls: 'border-rose-200 bg-rose-50 text-rose-700',
                    },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${item.cls}`}
                    >
                      <CheckCircle2 className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${item.cls}`} />
                      <span className="text-sm leading-7">{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          <section id="framework">
            <SectionIntro
              eyebrow="Structure"
              title="SOAP Notes Format Explained"
              description="Each part of the SOAP notes format has a specific role in making clinical documentation structured, consistent, and easier to review."
            />

            <div className="mt-10 space-y-6">
              {soapItems.map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.letter}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_12px_40px_rgba(84,44,140,0.08)] backdrop-blur lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6 lg:p-8`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-100`}
                    />

                    <div className={`relative flex flex-col justify-between rounded-[1.5rem] ${item.softBg} p-5`}>
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconWrap} shadow-sm`}>
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="mt-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Section {index + 1}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                          {item.letter} — {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.short}</p>
                      </div>
                    </div>

                    <div className="relative mt-6 flex flex-col justify-center lg:mt-0">
                      <p className="text-base leading-8 text-slate-700">{item.description}</p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {item.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm"
                          >
                            <CheckCircle2
                              className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${item.bulletIcon}`}
                            />
                            <span className="text-sm leading-7 text-slate-700">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    {/* {item.letter === 'S' && (
                        <a
                          href="/clinical-documentation/hpi/"
                          className={`mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold ${item.bulletIcon} transition hover:text-violet-800`}
                        >
                          Related: HPI
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      )} */}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>

          <section id="example">
            <SectionIntro
              eyebrow="Real-world view"
              title="SOAP Notes Example and Template"
              description="A real example and a reusable template make the SOAP notes format easier to understand and apply in day-to-day clinical documentation."
            />

<div className="mt-8 grid gap-6 lg:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_16px_50px_rgba(84,44,140,0.09)] backdrop-blur"
            >
              <div className="border-b border-white/70 bg-gradient-to-r from-violet-50/80 via-white to-cyan-50/70 px-6 py-5 sm:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                    Example
                  </span>
                  <span className="text-sm text-slate-500">Chest pain encounter</span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                  A SOAP note structure in practice
                </h3>
              </div>

              <div className="grid gap-0 md:grid-cols-2">
                {[
                  {
                    title: 'Subjective',
                    content:
                      'Patient reports chest pain for 2 days, worsens with exertion, relieved by rest.',
                    tone: 'from-violet-500/10 to-transparent',
                    text: 'text-violet-700',
                  },
                  {
                    title: 'Objective',
                    content:
                      'BP 140/90, HR 92 bpm, ECG shows mild abnormalities.',
                    tone: 'from-cyan-500/10 to-transparent',
                    text: 'text-cyan-700',
                  },
                  {
                    title: 'Assessment',
                    content: 'Possible angina.',
                    tone: 'from-amber-500/12 to-transparent',
                    text: 'text-amber-700',
                  },
                  {
                    title: 'Plan',
                    content:
                      'Medication prescribed, rest advised, cardiology follow-up scheduled.',
                    tone: 'from-rose-500/10 to-transparent',
                    text: 'text-rose-700',
                  },
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className={`bg-gradient-to-br ${item.tone} p-6 sm:p-8 ${
                      idx < 2 ? 'border-b border-white/70 md:border-b' : ''
                    } ${idx % 2 === 0 ? 'md:border-r md:border-white/70' : ''}`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${item.text}`}>
                      {item.title}
                    </p>
                    <p className="mt-4 text-base leading-8 text-slate-700">{item.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
                          <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_16px_50px_rgba(84,44,140,0.09)] backdrop-blur"
                          >
                            <div className="border-b border-white/70 bg-gradient-to-r from-violet-50/80 via-white to-cyan-50/70 px-6 py-5 sm:px-8">
                              <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                                Template
                              </span>
                              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                                SOAP note template
                              </h3>
                            </div>
            
                            <div className="space-y-0">
                              {[
                                {
                                  title: 'Subjective',
                                  content: '[Patient symptoms and history]',
                                                      tone: 'from-violet-500/10 to-transparent',
                    text: 'text-violet-700',
                                },
                                {
                                  title: 'Objective',
                                  content: '[Clinical findings]',
                                                      tone: 'from-cyan-500/10 to-transparent',
                    text: 'text-cyan-700',
                                },
                                {
                                  title: 'Assessment',
                                  content: '[Diagnosis]',
                                                      tone: 'from-amber-500/12 to-transparent',
                    text: 'text-amber-700',
                                },
                                {
                                  title: 'Plan',
                                  content: '[Treatment plan]',
                                                      tone: 'from-rose-500/10 to-transparent',
                    text: 'text-rose-700',
                                },
                              ].map((item, idx) => (
                                <div
                                  key={item.title}
                                  className={`bg-gradient-to-br ${item.tone} px-6 py-6 sm:px-8 ${idx < 3 ? 'border-b border-white/70' : ''}`}
                                >
                                  <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${item.text}`}>
                                    {item.title}
                                  </p>
                                  <p className="mt-3 text-base leading-8 text-slate-700">{item.content}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                          </div>
          </section>

          <section id="importance">
            <SectionIntro
              eyebrow="Why it matters"
              title="Why SOAP Notes Are Important In Clinical Documentation"
              description="SOAP notes are essential because they improve clarity, communication, clinical reasoning, and consistency across patient care documentation."
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {benefits.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.text}
                    className={`rounded-[1.5rem] border border-white/70 bg-gradient-to-br ${item.tone} p-5 shadow-sm backdrop-blur`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconWrap} shadow-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">{item.text}</p>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-6 rounded-[2rem] border border-white/70 bg-gradient-to-r from-violet-50/80 via-white to-cyan-50/70 p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Used across
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Common care settings include hospitals, clinics, and private practices — anywhere
                structured medical documentation improves continuity of care.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {careSettings.map((item) => (
                  <span
                    key={item.name}
                    className={`rounded-full border border-white/70 bg-gradient-to-br ${item.tone} px-4 py-2 text-sm font-medium text-slate-700`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="comparison">
            <SectionIntro
              eyebrow="comparison"
              title="SOAP Notes vs Other Clinical Documentation Formats"
              description="SOAP is popular because it stays simple and structured, but it is part of a broader ecosystem of documentation formats used across different care settings."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {compareItems.map((item) => (
                <motion.div
                  key={item.title}
                  // href={item.href}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`group rounded-[1.5rem] border border-white/70 bg-gradient-to-br ${item.accent} p-6 shadow-sm backdrop-blur hover:border-x-stone-200 hover:shadow-md`}
                >
                  <div className='flex flex-col h-full'>
                  <p className="text-lg font-semibold tracking-tight text-slate-950">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                    Read more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="challenges">
            <SectionIntro
              eyebrow="Challenges"
              title="Common Challenges in Writing SOAP Notes"
              description="Common SOAP note issues often come from broader clinical documentation challenges, especially when manual work and administrative pressure increase."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {challenges.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`rounded-[1.5rem] border border-white/70 bg-gradient-to-br ${item.accent} p-6 shadow-sm backdrop-blur`}
                >
                  <p className="text-base font-medium text-slate-900">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="ai">
            <SectionIntro
              eyebrow="AI workflows"
              title="How AI Is Improving SOAP Notes"
              description="AI clinical documentation can reduce repetitive work while preserving the structure clinicians rely on. The best experience is assistive, fast, and reviewable."
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.28)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.35),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.22),transparent_22%)]" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-violet-300 backdrop-blur">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    AI clinical documentation
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Medally assist in creating structured SOAP notes while
                  maintaining clinician control.
                  </p>
                <a
                  href="/clinical-documentation/ai/"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
                >
                  Related: AI clinical documentation
                  <ArrowRight className="h-4 w-4" />
                </a>
                </div>
              </div>

              <div className="grid gap-4">
                {aiBenefits.map((item, index) => {
                  const accents = [
                    'from-violet-500/14 to-fuchsia-500/8',
                    'from-cyan-500/14 to-sky-500/8',
                    'from-emerald-500/14 to-teal-500/8',
                    'from-rose-500/14 to-pink-500/8',
                  ]
                  return (
                    <div
                      key={item}
                      className={`flex items-start gap-4 rounded-[1.5rem] border border-gray-300 bg-gradient-to-br ${accents[index]} p-5 shadow-sm`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gray-300 bg-white text-violet-700 shadow-sm">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="text-sm leading-10 text-slate-700">{item}</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </section>

          <section id="best-practices">
            <SectionIntro
              eyebrow="Best practices"
              title="Best Practices for Writing SOAP Notes"
              description="Good SOAP notes should be clear, concise, clinically relevant, accurate, and aligned with documentation compliance standards."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {bestPractices.map((item, index) => {
                const tones = [
                  'from-violet-500/14 to-fuchsia-500/8',
                  'from-cyan-500/14 to-sky-500/8',
                  'from-amber-500/18 to-orange-500/8',
                  'from-emerald-500/14 to-teal-500/8',
                  'from-rose-500/14 to-pink-500/8',
                ]
                return (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className={`rounded-[1.5rem] border border-gray-300 bg-gradient-to-br ${tones[index]} p-5 shadow-sm`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-violet-700" />
                    <p className="mt-4 text-sm leading-7 text-slate-700">{item}</p>
                  </motion.div>
                )
              })}
            </div>
            
                        <motion.div
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.2 }}
                          className="mt-6"
                        >
                          <a
                            href="/clinical-documentation/best-practices/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
                          >
                            Related: Clinical documentation best practices
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </motion.div>
          </section>

          <section id="faq">
            <SectionIntro
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              // description="Answering common questions directly helps the page work for both readers and search-driven discovery."
              description=""
            />

            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <FaqCard key={item.question} item={item} />
              ))}
            </div>
          </section>

          <section>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-8 text-white shadow-[0_20px_70px_rgba(15,23,42,0.3)] sm:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.32),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.2),transparent_24%),radial-gradient(circle_at_center,rgba(244,114,182,0.08),transparent_30%)]" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-2xl">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300">
                    Simplifying SOAP notes with AI
                  </span>

                  <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Creating SOAP notes does not have to be time-consuming.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-slate-300">
                    Help clinicians document faster, stay structured, and maintain quality without
                    adding friction to the patient encounter.
                  </p>
                </div>

                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400 px-6 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(34,211,238,0.22)] transition hover:translate-y-[-1px] hover:text-slate-950"
                >
                  Explore how Medally supports clinical documentation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
    </Layout>
  )
}