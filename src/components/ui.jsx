import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, className = '', as: Tag = 'div', ...r }) {
  const ref = useRef(null); const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(ref.current); return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} {...r}>{children}</Tag>
}

export function TextReveal({ text, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null); const [on, setOn] = useState(false)
  useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.3 }); io.observe(ref.current); return () => io.disconnect() }, [])
  return <Tag ref={ref} aria-label={text} className={className}>{text.split(' ').map((w, i) => (
    <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom"><span className={`inline-block transition-all duration-700 ${on ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: `${i * 90}ms` }}>{w}&nbsp;</span></span>))}</Tag>
}

export const Heading = ({ kicker, title, children, center }) => (
  <div className={`mb-10 ${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
    {kicker && <p className="pill mb-4">{kicker}</p>}
    <TextReveal text={title} className="text-3xl text-teal md:text-5xl" />
    {children && <p className="mt-4 text-ink/70">{children}</p>}
  </div>
)

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null); const [n, setN] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect(); let i = 0; const t = setInterval(() => { i++; setN(Math.round((to * i) / 40)); if (i >= 40) clearInterval(t) }, 30)
    }); io.observe(ref.current); return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button className="flex w-full items-center justify-between py-5 text-left font-display text-lg font-semibold" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {q}<span className="ml-4 text-2xl text-teal">{open === i ? '–' : '+'}</span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="overflow-hidden pr-10 opacity-80"><span className="block pb-5">{a}</span></p></div>
        </div>
      ))}
    </div>
  )
}

export function useSubmit(type) {
  const [status, setStatus] = useState('idle')
  const submit = async (data) => {
    setStatus('sending')
    try {
      const url = import.meta.env.VITE_SHEETS_URL
      if (url) await fetch(url, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ type, ...data, at: new Date().toISOString() }) })
      setStatus('done'); return true
    } catch { setStatus('error'); return false }
  }
  return [status, submit]
}

const validate = (v, fields) => {
  const e = {}
  fields.forEach((f) => {
    if (f.type === 'file') { const x = v[f.name]; if (f.required && !x) e[f.name] = 'Upload your resume as a PDF.'; else if (x && (x.type !== 'application/pdf' || x.size > 5 * 1024 * 1024)) e[f.name] = 'Resume must be a PDF under 5 MB.' }
    else if (f.required && !v[f.name]?.trim()) e[f.name] = `${f.label} is required.` })
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (v.phone && !/^[+\d][\d\s-]{7,14}$/.test(v.phone)) e.phone = 'Enter a valid phone number.'
  return e
}

export function Form({ type, fields, button = 'Send request', success = 'Thanks! Our team will contact you shortly.', square, center }) {
  const [v, setV] = useState({}); const [err, setErr] = useState({}); const [status, submit] = useSubmit(type)
  const on = async (ev) => {
    ev.preventDefault(); const e = validate(v, fields); setErr(e)
    if (!Object.keys(e).length) await submit(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x instanceof File ? x.name : x])))
  }
  if (status === 'done') return <div role="status" className="rounded-xl bg-mist p-6 font-semibold text-teal-dark">{success}</div>
  const set = (n) => (e) => setV({ ...v, [n]: e.target.value })
  return (
    <form onSubmit={on} noValidate className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className={f.wide ? 'sm:col-span-2' : ''}>
          {f.type === 'file' && <span className="mb-1 block text-center text-xs text-ink/60">{f.label}</span>}
          {f.type === 'textarea' ? <textarea rows="4" placeholder={f.label} aria-label={f.label} className={`input ${center ? 'text-center' : ''}`} value={v[f.name] || ''} onChange={set(f.name)} />
            : f.type === 'file' ? <input type="file" accept="application/pdf" aria-label={f.label} className="input text-sm file:mr-3 file:rounded file:border-0 file:bg-teal file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white" onChange={(e) => setV({ ...v, [f.name]: e.target.files[0] })} />
            : f.type === 'select' ? (
              <select aria-label={f.label} className={`input ${center ? 'text-center' : ''}`} value={v[f.name] || ''} onChange={set(f.name)}>
                <option value="">{f.label}{f.required ? ' *' : ''}</option>{f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : <input type={f.type || 'text'} placeholder={f.label + (f.required ? ' *' : '')} aria-label={f.label} className={`input ${center ? 'text-center' : ''}`} value={v[f.name] || ''} onChange={set(f.name)} />}
          {err[f.name] && <span className="text-sm text-red-600">{err[f.name]}</span>}
        </label>
      ))}
      <p className="text-xs opacity-60 sm:col-span-2">Your information will be securely sent to and stored in Google Sheets for the purpose of processing your form submission.</p>
      {status === 'error' && <p className="text-sm text-red-600 sm:col-span-2">Could not send. Check your connection and try again.</p>}
      <button className={`btn sm:col-span-2 ${square ? '!rounded-none' : ''} ${center ? 'sm:justify-self-center' : 'sm:justify-self-start'}`} disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : button}</button>
    </form>
  )
}

export const CONTACT_FIELDS = [
  { name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', required: true },
  { name: 'service', label: 'Select Service', type: 'select', options: ['Rehabilitation', 'Regenerative Care', 'Longevity', 'Strength, Conditioning & Human Performance'], required: true },
  { name: 'subject', label: 'Subject', wide: true }, { name: 'message', label: 'Message', type: 'textarea', wide: true },
]
export const ContactForm = () => <Form type="contact" fields={CONTACT_FIELDS} button="Submit now" />
