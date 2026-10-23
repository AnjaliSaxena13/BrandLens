
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FileCheck2, ShieldCheck, BookOpen,
  Settings, Bell, Search, Plus, ArrowUpRight,
  ArrowRight, Clock3, CheckCircle2, AlertTriangle,
  FileText, Menu, X, ChevronDown, Sparkles,
  MessageSquare, CircleHelp, TrendingUp, XCircle
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Content Reviews', icon: FileCheck2 },
  { label: 'Brand Kit', icon: BookOpen },
  { label: 'Approvals', icon: ShieldCheck },
]

const initialReviews = [
  { title: 'October product launch', type: 'Social media', status: 'Needs review', score: 76, time: '12 min ago', color: 'amber' },
  { title: 'Customer success newsletter', type: 'Email campaign', status: 'Approved', score: 96, time: '1 hour ago', color: 'green' },
  { title: 'New feature announcement', type: 'Website copy', status: 'In progress', score: 88, time: '3 hours ago', color: 'blue' },
  { title: 'Autumn campaign headlines', type: 'Ad copy', status: 'Approved', score: 98, time: 'Yesterday', color: 'green' },
]

const statusStyles = {
  'Needs review': 'bg-amber-50 text-amber-700 ring-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'In progress': 'bg-blue-50 text-blue-700 ring-blue-200',
}


const readBrandData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function BrandVoiceForm() {
  const [brand, setBrand] = useState(() =>
    readBrandData('brandlens-voice', {
      name: '',
      audience: '',
      tone: '',
      style: '',
    })
  )
  const [saved, setSaved] = useState(false)

  const update = (field, value) => {
    setBrand((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const save = (event) => {
    event.preventDefault()
    localStorage.setItem('brandlens-voice', JSON.stringify(brand))
    setSaved(true)
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400'

  return (
    <form onSubmit={save} className="mt-5 space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Brand name
        <input
          className={inputClass}
          value={brand.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. BrandLens"
          required
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Target audience
        <input
          className={inputClass}
          value={brand.audience}
          onChange={(e) => update('audience', e.target.value)}
          placeholder="e.g. Young professionals"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Brand tone
        <select
          className={inputClass}
          value={brand.tone}
          onChange={(e) => update('tone', e.target.value)}
          required
        >
          <option value="">Select tone</option>
          <option value="Professional">Professional</option>
          <option value="Friendly">Friendly</option>
          <option value="Confident">Confident</option>
          <option value="Playful">Playful</option>
          <option value="Empathetic">Empathetic</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Writing guidelines
        <textarea
          className={inputClass}
          rows={3}
          value={brand.style}
          onChange={(e) => update('style', e.target.value)}
          placeholder="Describe how your brand should communicate..."
        />
      </label>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Save brand voice
      </button>

      {saved && (
        <p role="status" className="text-sm text-emerald-700">
          Brand voice saved in this browser.
        </p>
      )}
    </form>
  )
}

function BrandRulesForm() {
  const [rules, setRules] = useState(() =>
    readBrandData('brandlens-rules', {
      approved: '',
      avoid: '',
      claims: '',
    })
  )
  const [saved, setSaved] = useState(false)

  const update = (field, value) => {
    setRules((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const save = (event) => {
    event.preventDefault()
    localStorage.setItem('brandlens-rules', JSON.stringify(rules))
    setSaved(true)
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400'

  return (
    <form onSubmit={save} className="mt-5 space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Approved terms
        <textarea
          className={inputClass}
          rows={3}
          value={rules.approved}
          onChange={(e) => update('approved', e.target.value)}
          placeholder="Enter approved words or phrases"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Words to avoid
        <textarea
          className={inputClass}
          rows={3}
          value={rules.avoid}
          onChange={(e) => update('avoid', e.target.value)}
          placeholder="Enter restricted or discouraged words"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Approved claims and supporting sources
        <textarea
          className={inputClass}
          rows={3}
          value={rules.claims}
          onChange={(e) => update('claims', e.target.value)}
          placeholder="Add approved facts and their source URLs or references"
        />
      </label>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Save brand rules
      </button>

      {saved && (
        <p role="status" className="text-sm text-emerald-700">
          Brand rules saved in this browser.
        </p>
      )}
    </form>
  )
}


function runBrandCheck(content) {
  const savedRules = (() => {
    try {
      return JSON.parse(localStorage.getItem('brandlens-rules')) || {}
    } catch {
      return {}
    }
  })()

  const savedVoice = (() => {
    try {
      return JSON.parse(localStorage.getItem('brandlens-voice')) || {}
    } catch {
      return {}
    }
  })()

  const avoidWords = (savedRules.avoid || '')
    .split(',')
    .map(word => word.trim())
    .filter(Boolean)

  const approvedWords = (savedRules.approved || '')
    .split(',')
    .map(word => word.trim())
    .filter(Boolean)

  const issues = []

  avoidWords.forEach(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const matches = content.match(new RegExp(`\\b${escaped}\\b`, 'gi'))

    if (matches) {
      issues.push({
        type: 'Restricted word',
        text: word,
        reason: `The word "${word}" appears in your content but is listed in the Brand Kit's avoid words.`,
      })
    }
  })

  approvedWords.forEach(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const matches = content.match(new RegExp(`\\b${escaped}\\b`, 'gi'))

    if (!matches) {
      issues.push({
        type: 'Approved terminology',
        text: word,
        reason: `Consider using "${word}", which is listed as approved terminology in your Brand Kit.`,
      })
    }
  })

  const tone = savedVoice.tone || ''

  return {
    issues,
    tone,
    checkedAt: new Date().toLocaleString(),
    message: 'Rule-based prototype check only. Tone is displayed for context; it is not automatically evaluated.',
  }
}


function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showComposer, setShowComposer] = useState(false)
  const [content, setContent] = useState('')
  const [goal, setGoal] = useState('Social media')
  const [reviews, setReviews] = useState(initialReviews)
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')

  
  function startReview() {
    if (!content.trim()) {
      setNotice('Please enter some content before starting a review.')
      return
    }

    const result = runBrandCheck(content.trim())

    const newReview = {
      title: content.trim().split('\n')[0].slice(0, 48) || 'New content review',
      type: goal,
      status: result.issues.length > 0 ? 'Needs review' : 'In progress',
      score: null,
      time: 'Just now',
      color: result.issues.length > 0 ? 'amber' : 'blue',
      submittedContent: content.trim(),
      findings: result.issues,
      brandTone: result.tone,
      checkedAt: result.checkedAt,
      reviewMessage: result.message,
    }

    setReviews(previous => [newReview, ...previous])
    setShowComposer(false)
    setActivePage('Content Reviews')
    setNotice(
      `Prototype check complete: ${result.issues.length} finding(s). This is a rule-based check, not an AI review.`
    )
    setContent('')
  }


  const filteredReviews = reviews.filter(review =>
    `${review.title} ${review.type} ${review.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  function navigate(page) {
    setActivePage(page)
    setMobileOpen(false)
    setNotice('')
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800">
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close navigation overlay"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200/80 bg-white px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-1">
          <button onClick={() => navigate('Dashboard')} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <ShieldCheck size={23} strokeWidth={2.2} />
            </span>
            <span>
              <span className="block text-xl font-bold tracking-tight text-slate-900">BrandLens</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Brand governance</span>
            </span>
          </button>
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-500 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="mt-10">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
          <nav className="space-y-1">
            {navigation.map(({ label, icon: Icon }) => {
              const selected = activePage === label
              return (
                <button
                  key={label}
                  onClick={() => navigate(label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${selected ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <Icon size={19} />
                  <span>{label}</span>
                  {label === 'Approvals' && (
                    <span className="ml-auto rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">6</span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mt-9">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Preferences</p>
          <button onClick={() => navigate('Settings')} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-slate-50 ${activePage === 'Settings' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'}`}>
            <Settings size={19} /> Settings
          </button>
          <button onClick={() => setNotice('Help centre: brand reviews should be checked by a human before publication.')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50">
            <CircleHelp size={19} /> Help & support
          </button>
        </div>

        <div className="mt-auto">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Sparkles size={19} />
            </span>
            <p className="mt-3 text-sm font-semibold">Your brand, consistent.</p>
            <p className="mt-1 text-xs leading-5 text-indigo-100">Keep every message aligned with your brand guidelines.</p>
            <button onClick={() => navigate('Brand Kit')} className="mt-4 flex items-center gap-2 text-xs font-semibold text-white hover:gap-3 transition-all">
              Explore Brand Kit <ArrowRight size={14} />
            </button>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 px-1 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">AS</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">Anjali Saxena</p>
              <p className="text-xs text-slate-400">Workspace member</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
              <Menu size={21} />
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs text-slate-400">Workspace / <span className="text-slate-600">{activePage}</span></p>
              <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">BrandLens Workspace</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Workspace active
            </span>
            <button onClick={() => setNotice('You are all caught up with this demo workspace.')} className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100" aria-label="Notifications">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
            </button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">AS</div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
          <AnimatePresence>
            {notice && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800"
              >
                <span>{notice}</span>
                <button onClick={() => setNotice('')} aria-label="Dismiss message"><X size={17} /></button>
              </motion.div>
            )}
          </AnimatePresence>

          {activePage === 'Dashboard' && (
            <>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    <Sparkles size={13} /> Your brand command centre
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Good afternoon <span aria-hidden="true">✦</span>
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Here's what's happening with your brand content. Let's keep every message on-brand.</p>
                </div>
                <button onClick={() => setShowComposer(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0">
                  <Plus size={18} /> New content review
                </button>
              </motion.div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Brand health score', value: '92%', note: 'Demo metric', icon: ShieldCheck, tint: 'bg-indigo-50 text-indigo-600', trend: 'Strong consistency' },
                  { label: 'Total reviews', value: '24', note: 'Sample workspace data', icon: FileText, tint: 'bg-blue-50 text-blue-600', trend: 'Across content types' },
                  { label: 'Needs attention', value: String(reviews.filter(r => r.status === 'Needs review').length + 5), note: 'Sample metric', icon: AlertTriangle, tint: 'bg-amber-50 text-amber-600', trend: 'Requires a closer look' },
                  { label: 'Approved content', value: '18', note: 'Sample workspace data', icon: CheckCircle2, tint: 'bg-emerald-50 text-emerald-600', trend: 'Human-reviewed content' },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.35 }} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.tint}`}><stat.icon size={20} /></span>
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-2">
                      <p className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</p>
                      <span className="mb-1 flex items-center gap-1 text-xs font-medium text-emerald-600"><TrendingUp size={13} /> Overview</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{stat.note}</p>
                    <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">{stat.trend}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">
                <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Recent content reviews</h2>
                      <p className="mt-1 text-xs text-slate-400">Track content through the review workflow</p>
                    </div>
                    <button onClick={() => navigate('Content Reviews')} className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                      View all <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                    <div className="relative flex-1">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search content..." className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    <span className="text-xs text-slate-400">{filteredReviews.length} reviews shown</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[540px] text-left">
                      <thead className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <tr>
                          <th className="px-6 py-3">Content</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Score</th>
                          <th className="px-6 py-3">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredReviews.map((review, i) => (
                          <tr key={`${review.title}-${i}`} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><FileText size={17} /></span>
                                <div className="min-w-0">
                                  <p className="max-w-[200px] truncate text-sm font-semibold text-slate-800">{review.title}</p>
                                  <p className="mt-1 text-xs text-slate-400">{review.type}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4"><span className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[review.status] || statusStyles['In progress']}`}>{review.status}</span></td>
                            <td className="px-4 py-4 text-sm font-semibold text-slate-700">{review.score === null ? '—' : `${review.score}%`}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-400">{review.time}</td>
                          </tr>
                        ))}
                        {filteredReviews.length === 0 && <tr><td colSpan="4" className="px-6 py-10 text-center text-sm text-slate-400">No matching reviews found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <p className="border-t border-slate-100 px-6 py-3 text-[11px] text-slate-400">Illustrative data for the MVP preview — not live AI results.</p>
                </section>

                <div className="flex flex-col gap-6">
                  <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-slate-900">Review activity</h2>
                        <p className="mt-1 text-xs text-slate-400">Your workflow at a glance</p>
                      </div>
                      <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600"><Clock3 size={19} /></span>
                    </div>
                    <div className="mt-6 space-y-5">
                      {[
                        { icon: CheckCircle2, tint: 'bg-emerald-50 text-emerald-600', title: 'Content approved', desc: 'Customer success newsletter', time: '1 hour ago' },
                        { icon: MessageSquare, tint: 'bg-blue-50 text-blue-600', title: 'Review in progress', desc: 'New feature announcement', time: '3 hours ago' },
                        { icon: AlertTriangle, tint: 'bg-amber-50 text-amber-600', title: 'Needs attention', desc: 'October product launch', time: '12 min ago' },
                      ].map(item => (
                        <div key={item.title} className="flex gap-3">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.tint}`}><item.icon size={17} /></span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                            <p className="mt-1 truncate text-xs text-slate-500">{item.desc}</p>
                            <p className="mt-1.5 text-[11px] text-slate-400">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white">
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-500/20 blur-2xl" />
                    <div className="relative">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Sparkles size={20} className="text-indigo-300" /></span>
                      <h2 className="mt-4 text-lg font-bold">Ready for a brand check?</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-300">Review your next piece of content against your brand standards.</p>
                      <button onClick={() => setShowComposer(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-indigo-50">
                        Start a review <ArrowRight size={16} />
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}

          {activePage === 'Content Reviews' && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Content reviews</h1>
                  <p className="mt-2 text-sm text-slate-500">Manage submissions and track their review status.</p>
                </div>
                <button onClick={() => setShowComposer(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"><Plus size={18} /> New review</button>
              </div>
              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                {reviews.map((review, i) => (
                  <div key={`${review.title}-${i}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600"><FileText size={20} /></span>
                      <span className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[review.status] || statusStyles['In progress']}`}>{review.status}</span>
                    </div>
                    <h2 className="mt-4 break-words font-bold text-slate-900">{review.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{review.type}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                      <span>{review.time}</span>
                      <span>{review.score === null ? 'Awaiting review' : `Score ${review.score}%`}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">Sample records only. Actual brand-check findings will come from the connected review API.</p>
            </motion.section>
          )}


          {activePage === 'Brand Kit' && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Brand Kit</h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage your brand identity, approved terminology and content rules.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <BookOpen size={21} />
                  </span>
                  <h2 className="mt-4 font-bold text-slate-900">Brand voice & tone</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Tell your team how the brand should sound and who it speaks to.
                  </p>

                  <BrandVoiceForm />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={21} />
                  </span>
                  <h2 className="mt-4 font-bold text-slate-900">Claims & approved facts</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Save approved claims and words that your brand should avoid.
                  </p>

                  <BrandRulesForm />
                </div>
              </div>
            </motion.section>
          )}


          {activePage === 'Approvals' && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Approvals</h1>
              <p className="mt-2 text-sm text-slate-500">Human review remains part of every publication decision.</p>
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="rounded-xl bg-amber-50 p-3 text-amber-600"><Clock3 size={22} /></span>
                  <div>
                    <h2 className="font-bold text-slate-900">Pending approvals</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Approval actions and reviewer comments will be connected to the backend workflow. Sample records are not actual approval requests.</p>
                    <button onClick={() => navigate('Content Reviews')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">View content reviews <ArrowRight size={16} /></button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activePage === 'Settings' && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Settings</h1>
              <p className="mt-2 text-sm text-slate-500">Workspace preferences and account configuration.</p>
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="font-bold text-slate-900">Workspace details</h2>
                <p className="mt-2 text-sm text-slate-500">BrandLens Workspace</p>
                <p className="mt-1 text-xs text-slate-400">Authentication and role-based permissions are not configured yet.</p>
              </div>
            </motion.section>
          )}

          <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-200/80 py-5 text-xs text-slate-400 sm:flex-row sm:items-center">
            <p>© 2026 BrandLens · Built by Orbital Minds</p>
            <p className="flex items-center gap-1.5"><ShieldCheck size={14} /> Human oversight matters</p>
          </footer>
        </main>
      </div>

      <AnimatePresence>
        {showComposer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) setShowComposer(false) }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="my-auto w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Sparkles size={21} /></span>
                  <h2 className="mt-4 text-xl font-bold text-slate-900">Start a brand review</h2>
                  <p className="mt-1 text-sm text-slate-500">Add your draft and choose where it will be used.</p>
                </div>
                <button onClick={() => setShowComposer(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100" aria-label="Close review form"><X size={20} /></button>
              </div>
              <form onSubmit={e => { e.preventDefault(); startReview() }} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="content-goal" className="mb-2 block text-sm font-semibold text-slate-700">Content type</label>
                  <select id="content-goal" value={goal} onChange={e => setGoal(e.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                    <option>Social media</option>
                    <option>Email campaign</option>
                    <option>Website copy</option>
                    <option>Ad copy</option>
                    <option>Blog article</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="review-content" className="mb-2 block text-sm font-semibold text-slate-700">Your content</label>
                  <textarea id="review-content" value={content} onChange={e => setContent(e.target.value)} rows={7} placeholder="Paste your content here..." className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                  <p className="mt-2 text-xs text-slate-400">{content.length} characters</p>
                </div>

                <p className="text-xs leading-5 text-slate-500">
                  Your draft will be added to the review list. Automated brand analysis
                  will be enabled when the review service is connected.
                </p>

                <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                  <button type="button" onClick={() => setShowComposer(false)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"><Sparkles size={16} /> Create demo review</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
