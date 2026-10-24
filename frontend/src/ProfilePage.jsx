import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserRound, Mail, Building2, BriefcaseBusiness, Phone, FileText, Pencil, Save, X, ShieldCheck } from 'lucide-react'

const defaultProfile = {
  fullName: 'Anjali Saxena',
  email: '',
  role: 'Workspace Member',
  company: 'BrandLens',
  phone: '',
  bio: '',
}

function readProfile() {
  try {
    const saved = localStorage.getItem('brandlens-profile')
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile
  } catch {
    return defaultProfile
  }
}

const inputClass =
  'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

export default function ProfilePage() {
  const [profile, setProfile] = useState(readProfile)
  const [draft, setDraft] = useState(readProfile)
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState('')

  function update(field, value) {
    setDraft(current => ({ ...current, [field]: value }))
    setNotice('')
  }

  function save(event) {
    event.preventDefault()
    const cleaned = {
      ...draft,
      fullName: draft.fullName.trim(),
      email: draft.email.trim(),
      company: draft.company.trim(),
      phone: draft.phone.trim(),
      bio: draft.bio.trim(),
    }

    if (!cleaned.fullName) {
      setNotice('Please enter your full name.')
      return
    }

    setProfile(cleaned)
    setDraft(cleaned)
    localStorage.setItem('brandlens-profile', JSON.stringify(cleaned))
    setEditing(false)
    setNotice('Profile saved in this browser.')
  }

  function cancel() {
    setDraft(profile)
    setEditing(false)
    setNotice('')
  }

  const initials = profile.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('') || 'U'

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            <UserRound size={14} /> Account
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">My Profile</h1>
          <p className="mt-2 text-sm text-slate-500">View and update your personal and workspace details.</p>
        </div>
        {!editing && (
          <button
            onClick={() => { setDraft(profile); setEditing(true); setNotice('') }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Pencil size={16} /> Edit profile
          </button>
        )}
      </div>

      {notice && (
        <p role="status" className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.8fr_1.5fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600" />
          <div className="px-6 pb-6">
            <div className="-mt-11 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-sm">
              {initials}
            </div>
            <h2 className="mt-4 break-words text-xl font-bold text-slate-900">{profile.fullName || 'Your name'}</h2>
            <p className="mt-1 break-words text-sm text-slate-500">{profile.email || 'Add your email address'}</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              <ShieldCheck size={14} /> {profile.role}
            </span>
            <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 text-sm">
              <div className="flex items-start gap-3">
                <Building2 size={17} className="mt-0.5 text-slate-400" />
                <div><p className="text-xs text-slate-400">Company / workspace</p><p className="mt-1 font-medium text-slate-700">{profile.company || 'Not added'}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 text-slate-400" />
                <div><p className="text-xs text-slate-400">Phone</p><p className="mt-1 font-medium text-slate-700">{profile.phone || 'Not added'}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600"><FileText size={20} /></span>
            <div>
              <h2 className="font-bold text-slate-900">Personal information</h2>
              <p className="mt-1 text-xs text-slate-500">Keep your profile details up to date.</p>
            </div>
          </div>

          <form onSubmit={save} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Full name
                <input className={inputClass} value={editing ? draft.fullName : profile.fullName} readOnly={!editing} onChange={e => update('fullName', e.target.value)} maxLength={80} required />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Email address
                <span className="relative block">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" className={`${inputClass} pl-9`} value={editing ? draft.email : profile.email} readOnly={!editing} onChange={e => update('email', e.target.value)} maxLength={254} placeholder="you@example.com" />
                </span>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Role
                <select
                  className={inputClass}
                  value={editing ? draft.role : profile.role}
                  disabled={!editing}
                  onChange={e => update('role', e.target.value)}
                >
                  <option value="Workspace Member">Workspace Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Reviewer">Reviewer</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Company / workspace
                <span className="relative block">
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className={`${inputClass} pl-9`} value={editing ? draft.company : profile.company} readOnly={!editing} onChange={e => update('company', e.target.value)} maxLength={100} />
                </span>
              </label>
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Phone number
                <span className="relative block">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" className={`${inputClass} pl-9`} value={editing ? draft.phone : profile.phone} readOnly={!editing} onChange={e => update('phone', e.target.value)} maxLength={30} placeholder="Add phone number" />
                </span>
              </label>
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                About me
                <textarea className={inputClass} rows={4} value={editing ? draft.bio : profile.bio} readOnly={!editing} onChange={e => update('bio', e.target.value)} maxLength={500} placeholder="Write a short introduction about yourself..." />
                <span className="mt-1 block text-right text-xs font-normal text-slate-400">{(editing ? draft.bio : profile.bio).length}/500</span>
              </label>
            </div>

            {editing && (
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button type="button" onClick={cancel} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                  <X size={16} /> Cancel
                </button>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                  <Save size={16} /> Save changes
                </button>
              </div>
            )}
          </form>
        </section>
      </div>

      <p className="text-xs leading-5 text-slate-400">
        Prototype note: profile details are saved only in this browser using local storage. They are not yet connected to login, a server, or a shared database.
      </p>
    </motion.section>
  )
}
