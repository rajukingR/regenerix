import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BANNER, BLOGS, CAREER, FAQS, JOB, JOBS, LEADS, PACKAGES, POLICIES, ROWS, SERVICES, SITE, STATS, STEPS, TEAM, TESTIMONIALS, WHY2, waLink } from '../data.js'
import { Accordion, ContactForm, Counter, Form, Heading, Reveal, TextReveal } from '../components/ui.jsx'
import { Newsletter, PillBtn } from '../components/Layout.jsx'
import { Arrow, ArrowUR, Brief, Check, Chevrons, Leaf, Mail, Phone, Pin } from '../components/icons.jsx'

const bannerBg = { backgroundImage: `linear-gradient(rgba(20,40,30,.25),rgba(20,40,30,.35)),url(${BANNER})` }
const Page = ({ title, children }) => (<>
  <section className="relative flex h-[380px] items-center justify-center bg-cover bg-center pt-10 text-center text-white lg:h-[525px] lg:pt-16" style={bannerBg}>
    <div><h1 className="a-up text-5xl font-bold leading-none md:text-[84px]">{title}</h1>
      <p className="a-up d1 mt-5 flex items-center justify-center gap-3 text-lg"><Link to="/">Home</Link><Chevrons className="h-3 w-3" />{title}</p></div>
    <Chevrons className="a-chev absolute right-[36%] top-[72%] hidden h-12 w-12 text-white/60 md:block" /></section>{children}</>)
const Sec = ({ children, className = '', id }) => <section id={id} className={`py-16 md:py-20 ${className}`}><Reveal className="wrap">{children}</Reveal></section>

function ServiceRows() {
  return (<div>{SERVICES.map((s, i) => (
    <Link key={s.slug} to={`/${s.slug}`} className="group grid items-center gap-6 border-b border-ink/10 py-10 md:grid-cols-3 md:gap-10">
      <div><Leaf className="h-10 w-10 text-teal transition-transform duration-500 group-hover:rotate-12" /><h3 className="mt-3 text-xl">{s.name}</h3></div>
      <div className="relative overflow-hidden rounded-lg"><img src={s.img} alt={s.name} loading="lazy" className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-110" />
        <span className="absolute bottom-0 left-0 rounded-tr-lg bg-ink/60 px-3 py-1 text-3xl text-white backdrop-blur">0{i + 1}.</span></div>
      <div><p className="text-sm text-ink/70">{ROWS[s.slug]}</p><span className="mt-4 inline-flex items-center gap-2 border-b border-ink/10 pb-1 text-sm text-teal">View Details <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
    </Link>))}</div>)
}
const ServicePanel = ({ title = 'Comprehensive Care for Every Stage' }) => (<section className="mx-3 rounded-2xl bg-mist py-16 md:mx-8"><Reveal className="wrap"><div className="mb-6 text-center"><p className="pill mb-4">Service Area</p><TextReveal text={title} className="text-3xl text-teal md:text-5xl" /></div><ServiceRows /></Reveal></section>)

const Packages = () => (<Sec><div className="mb-10 text-center"><h2 className="text-4xl font-bold uppercase text-teal md:text-5xl">Packages & Program</h2><p className="mt-1 text-2xl">Your Path to Better Health Starts Here</p></div>
  <div className="mx-auto grid max-w-4xl gap-0 md:grid-cols-3 md:items-center">{PACKAGES.map((p, i) => { const mid = i === 1; return (
    <div key={p.name} className={`flex flex-col border p-8 transition-transform duration-300 hover:-translate-y-2 ${mid ? 'border-teal bg-teal py-12 text-white' : 'border-ink/25 bg-white'}`}>
      <h3 className={`text-xl ${mid ? '' : 'text-teal'}`}>{p.name}</h3><p className="mt-2 text-sm font-medium">{p.sub}</p>{p.dur && <p className="mt-1 text-xs"><b>Duration:</b> {p.dur}</p>}
      <hr className={`my-4 ${mid ? 'border-white/40' : 'border-ink/60'}`} /><p className={`flex-1 text-sm ${mid ? 'text-white/90' : 'text-ink/60'}`}>{p.text}</p>
      <Link to="/contact-us#contact" className={`mt-6 self-start px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition hover:opacity-80 ${mid ? 'bg-white/40 text-white' : 'bg-teal text-white'}`}>Book now</Link></div>) })}</div></Sec>)

const Why = () => (<Sec><div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
  <div className="relative"><img src="/img/why.jpg" alt="Therapist guiding a stretch" loading="lazy" className="w-full rounded-bl-[999px] rounded-tr-[999px] object-cover [border-radius:0_0_0_999px/0_0_0_999px]" />
    <Leaf className="a-sway absolute -top-8 left-8 h-20 w-14 text-teal/50" /></div>
  <div><p className="pill mb-4">Why Choose Us</p><TextReveal text="Why Choose Us for Thoughtful Life Guidance" className="mb-8 text-3xl text-teal md:text-4xl" />
    <div className="grid gap-4 sm:grid-cols-2">{WHY2.map(([t, d, l]) => (<div key={t} className="rounded-xl bg-mist p-5 transition hover:-translate-y-1 hover:shadow-lg"><Leaf className="h-8 w-8 text-teal" /><h3 className="mt-3 text-lg">{t}</h3><p className="mt-1 text-sm text-ink/70">{d}</p>
      <ul className="mt-3 space-y-1 text-sm">{l.map((x) => <li key={x} className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-full bg-teal text-white"><Check className="h-3 w-3" /></span>{x}</li>)}</ul></div>))}</div></div></div></Sec>)

const Stats = () => (<section className="py-10"><div className="mx-3 flex items-center gap-4 md:mx-8"><span className="h-px flex-1 bg-ink/10" /><p className="text-teal">Our Experience Speaks for Itself</p><span className="h-px flex-1 bg-ink/10" /></div>
  <div className="wrap grid grid-cols-2 gap-8 py-10 text-center md:grid-cols-4">{STATS.map(([l, n, s]) => (<div key={l}><p className="text-5xl text-teal md:text-6xl"><Counter to={n} suffix={s} /></p><p className="mt-1 text-sm text-ink/70">{l}</p></div>))}</div>
  <div className="mx-3 h-px bg-ink/10 md:mx-8" /></section>)

const TeamGrid = () => (<div className="flex flex-wrap gap-5">{TEAM.map((m) => (
  <Link key={m.id} to={`/team-detail#${m.id}`} className="group relative block w-64 overflow-hidden rounded-tl-3xl rounded-br-[80px] bg-teal"><img src={m.img} alt={m.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-dark/95 to-transparent p-5 pt-16 text-white"><h3 className="text-lg">{m.name}</h3><p className="text-xs text-white/75">{LEADS[m.id]}</p></div></Link>))}</div>)

const BlogCard = ({ b }) => (<article className="group overflow-hidden rounded-xl border border-ink/10 bg-white"><div className="relative overflow-hidden"><img src={b.img} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-105" />
  <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-md bg-teal text-lg text-white">26</span></div>
  <div className="p-6"><h3 className="text-lg"><Link to={`/${b.slug}`}>{b.title}</Link></h3><p className="mt-2 text-sm text-ink/60">{b.excerpt}</p>
    <Link to={`/${b.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm text-teal">Read More <span className="grid h-6 w-6 place-items-center rounded-full bg-mist transition group-hover:bg-teal group-hover:text-white"><ArrowUR className="h-3 w-3" /></span></Link></div></article>)

const InfoCards = () => (<div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-3">{[[Pin, 'Address Line', SITE.address], [Phone, 'Phone Number', SITE.phone], [Mail, 'Mail Adress', SITE.email]].map(([I, t, d]) => (
  <div key={t} className="rounded-xl bg-white p-7 text-center shadow-[0_6px_30px_-10px_rgba(31,58,51,.2)] transition hover:-translate-y-1"><I className="mx-auto h-10 w-10 text-teal" /><h3 className="mt-3 text-base font-semibold">{t}</h3><p className="mt-2 break-words text-xs text-ink/60">{d}</p></div>))}</div>)

const BookPanel = () => (<div className="mx-auto grid max-w-4xl gap-8 rounded-[36px] bg-white p-6 shadow-[0_10px_50px_-15px_rgba(31,58,51,.25)] md:grid-cols-2 md:p-9">
  <iframe title="Regenerix location" loading="lazy" className="h-72 w-full rounded-2xl border-0 md:h-full md:min-h-[300px]" src={`https://www.google.com/maps?q=${encodeURIComponent('Neeladri Nagar, Electronic City Phase 1, Bangalore')}&output=embed`} />
  <div><p className="pill mb-3">Get IN Touch</p><h2 className="mb-5 text-3xl text-teal md:text-4xl">Book An Appointment</h2><ContactForm /></div></div>)

export function Home() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 6000); return () => clearInterval(t) }, [])
  const t = TESTIMONIALS[i]
  return (<>
    <section className="relative mx-5 flex min-h-[640px] items-end overflow-hidden rounded-[30px] bg-cover bg-top text-white lg:min-h-[calc(100vh-20px)]" style={{ backgroundImage: 'linear-gradient(180deg,rgba(10,20,15,0) 35%,rgba(10,20,15,.85) 100%),url(/img/hero.jpg)' }}>
      <div className="grid w-full items-end gap-8 px-6 pb-10 lg:grid-cols-[1.7fr_1fr] lg:px-8">
        <h1 className="a-up text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">Precision Care for Rehabilitation, Regeneration & Longevity</h1>
        <div className="a-up d2 lg:pb-3"><p className="max-w-sm text-base font-medium leading-8">Evidence-based physiotherapy and rehabilitation, tailored to your body, needs, and goals, beginning with a comprehensive assessment.</p>
          <PillBtn to="/contact-us#contact" className="mt-6 !py-2 !pl-7 !text-sm">Book Your Assessment</PillBtn></div></div></section>
    <Sec><div className="grid items-center gap-10 md:grid-cols-[.8fr_1fr]"><img src="/img/about.jpg" alt="Therapist guiding a core exercise" loading="lazy" className="max-h-[520px] w-full rounded-2xl object-cover" />
      <div><p className="pill mb-4">About Us</p><TextReveal text="We Look Beyond the Pain We find out why." className="text-3xl text-teal md:text-5xl" />
        <p className="mt-5 max-w-lg text-sm text-ink/70">At Regenerix, we go beyond treating symptoms. Through comprehensive assessment, movement analysis, and personalised musculoskeletal care, we identify the factors influencing your pain, movement, and physical performance.</p>
        <div className="mt-6 flex flex-wrap items-center gap-5"><Link to="/about" className="btn">Read More</Link><a href={`tel:+${SITE.tel}`} className="font-semibold">{SITE.phone}</a></div></div></div></Sec>
    <ServicePanel title="Advanced Care, Personalised for You" /><Why /><Stats />
    <Sec><Heading kicker="Our Testimonials" title="What Clients Say About Their Growth Journey" /><div key={i} className="a-in rounded-2xl bg-mist p-8 md:p-12"><blockquote className="text-2xl md:text-3xl">“{t.quote}”</blockquote>
      <p className="mt-4 font-semibold">{t.name} <span className="font-normal text-ink/60">· {t.role}</span></p>
      <div className="mt-6 flex gap-2">{TESTIMONIALS.map((x, n) => <button key={x.name} aria-label={`Testimonial ${n + 1}`} onClick={() => setI(n)} className={`h-2.5 rounded-full transition-all ${n === i ? 'w-8 bg-teal' : 'w-2.5 bg-ink/25'}`} />)}</div></div></Sec>
    <Packages />
    <section className="mx-3 rounded-2xl bg-teal py-16 text-white md:mx-8"><div className="wrap grid gap-10 md:grid-cols-2">
      <div><p className="mb-3 text-sm text-white/70">One System. Multiple Possibilities. Precision-Led Care.</p><h2 className="text-3xl md:text-4xl">Advanced Shock Wave Technology. Now at Regenerix.</h2>
        <p className="mt-4 text-white/85">Regenerix brings advanced extracorporeal shock wave therapy to its rehabilitation ecosystem with the DUOLITH® SD1 »ultra« by STORZ MEDICAL, combining radial and focused shock wave technologies in one modular platform.</p>
        <ul className="mt-5 flex flex-wrap gap-3">{['Radial Shock Wave', 'Focused Shock Wave', 'Modular Technology'].map((x) => <li key={x} className="rounded-full border border-white/40 px-4 py-1.5 text-sm">{x}</li>)}</ul></div>
      <div className="text-sm text-white/90"><h3 className="text-xl text-white">Why DUOLITH® SD1 »ultra«?</h3><p className="mt-2">Advanced rehabilitation demands more than one approach. The system brings radial and focused shock wave therapy together within a modular platform, with optional diagnostic ultrasound capabilities.</p>
        <h3 className="mt-6 text-xl text-white">What We Help You Achieve</h3><ul className="mt-2 space-y-1">{[['Restore Movement', 'Improve mobility and functional capacity.'], ['Recover Function', 'Address musculoskeletal conditions and post-surgical needs.'], ['Rebuild Strength', 'Develop physical capacity, resilience, and confidence.'], ['Return to Performance', 'Progress towards sport, work, and everyday activities.'], ['Support Longevity', 'Maintain strength, mobility, and independence over time.']].map(([a, b]) => <li key={a}><b>{a}</b>: {b}</li>)}</ul></div></div></section>
    <Sec><Heading kicker="How It Works" title="Your Journey at Regenerix" /><ol className="grid gap-6 md:grid-cols-5">{STEPS.map(([a, d], n) => (<li key={a} className="rounded-xl bg-mist p-5"><span className="text-sm text-teal">Step {n + 1}</span><h3 className="mt-1 text-lg">{a}</h3><p className="mt-2 text-sm text-ink/70">{d}</p></li>))}</ol></Sec>
    <Sec><Heading kicker="Our Experts" title="Meet our Doctors, You’re in Good Hands" /><TeamGrid /></Sec>
    <Sec><div className="grid gap-8 md:grid-cols-2"><BlogCard b={BLOGS[0]} /><div className="self-center"><Heading kicker="Our Blog" title="Check Out Latest News Update & Articles" /><Newsletter /></div></div></Sec>
    <Sec><Heading kicker="FAQs" title="Your Most Important Questions Answered Here" /><Accordion items={FAQS} /></Sec>
    <Sec id="contact"><BookPanel /></Sec>
  </>)
}

export const About = () => (<Page title="About">
  <Sec><p className="pill mb-4">About Us</p><div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end"><TextReveal text="Recovery. Performance. Longevity." className="max-w-xs text-4xl leading-tight text-teal md:text-5xl" />
    <p className="max-w-md text-sm text-ink/70">At Regenerix, we deliver precision-led, evidence-based rehabilitation tailored to your unique needs and long-term goals. Through comprehensive clinical assessment, individualised treatment, and progressive movement strategies, we aim to restore optimal function, elevate physical performance, and support lasting musculoskeletal health.</p></div></Sec>
  <Sec><div className="grid items-start gap-10 md:grid-cols-[.8fr_1fr]"><img src="/img/about.jpg" alt="Therapist guiding a core exercise" className="w-full rounded-2xl object-cover" />
    <div><p className="pill mb-4">About Us</p><TextReveal text="We Look Beyond the Pain We find out why." className="text-3xl text-teal md:text-5xl" />
      <p className="mt-5 text-sm text-ink/70">At Regenerix, we go beyond treating symptoms. Through comprehensive assessment, movement analysis, and personalised musculoskeletal care, we identify the factors influencing your pain, movement, and physical performance. This allows us to build evidence-informed care plans tailored to your needs, goals, and long-term health.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2"><div><h3 className="text-xl text-teal">Our Mission</h3><p className="mt-2 text-sm text-ink/70">To help people move better, perform at their best, and age well through evidence-based rehabilitation, personalised musculoskeletal care, and proactive health strategies.</p></div>
        <div><h3 className="text-xl text-teal">Our Vision</h3><p className="mt-2 text-sm text-ink/70">To redefine musculoskeletal healthcare by integrating rehabilitation, regeneration, and longevity-focused care, helping people live healthier lives at every stage.</p></div></div></div></div></Sec>
  <ServicePanel title="Comprehensive Care for Every Stage" /><Why /><Stats />
  <Sec><Heading kicker="Our Experts" title="Meet our Doctors, You’re in Good Hands" /><TeamGrid /></Sec></Page>)

export const Services = () => (<Page title="Service"><section className="mx-3 mt-16 rounded-2xl bg-mist py-6 md:mx-8"><Reveal className="wrap"><ServiceRows /></Reveal></section><Packages /></Page>)

export function ServiceDetail({ slug }) {
  const s = SERVICES.find((x) => x.slug === slug)
  return (<Page title={s.name}><Sec><div className="grid items-center gap-10 md:grid-cols-2"><div className="overflow-hidden rounded-2xl"><img src={s.img} alt={s.name} className="w-full transition duration-700 hover:scale-105" /></div>
    <div><p className="text-ink/70">{s.long}</p><h3 className="mb-3 mt-6 text-xl text-teal">What’s included</h3><ul className="space-y-2">{s.points.map((p) => <li key={p} className="flex items-center gap-2 text-sm"><span className="grid h-4 w-4 place-items-center rounded-full bg-teal text-white"><Check className="h-3 w-3" /></span>{p}</li>)}</ul>
      <PillBtn to="/contact-us#contact" className="mt-8 border border-ink/10">Book an assessment</PillBtn></div></div></Sec><Packages /></Page>)
}

export const Careers = () => (<Page title="Career">
  <section className="py-24 lg:py-32"><Reveal className="mx-auto w-full max-w-[1310px] px-5"><div className="w-full max-w-[420px] rounded-[36px] border border-ink/30 p-[30px] transition hover:-translate-y-1 hover:shadow-xl"><img src="/img/job.jpg" alt="Physiotherapist treating a patient" className="aspect-[3/2] w-full rounded-[30px] object-cover" />
    <h3 className="mt-6 text-center text-xl text-ink">{JOB.title}</h3><p className="mt-5 flex justify-center gap-6 text-base text-ink/60"><span className="flex items-center gap-2"><Brief className="h-4 w-4 text-ink" />{JOB.qual}</span><span className="flex items-center gap-2"><Pin className="h-4 w-4 text-ink" />{JOB.place}</span></p>
    <Link to="/career-form" className="mt-6 block rounded-sm bg-teal py-2.5 text-center text-base font-medium text-white transition hover:bg-teal-dark">Apply Now</Link></div></Reveal></section>
  <Sec id="apply"><div className="mx-auto max-w-2xl text-center"><h2 className="mb-8 text-4xl font-bold text-teal md:text-5xl">Connect With Us for Future Opportunities</h2>
    <Form type="career" square center button="Submit application" success="Application received. We’ll be in touch." fields={[
      { name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email Address', type: 'email', required: true }, { name: 'phone', label: 'Mobile Number', required: true },
      { name: 'exp', label: 'Years of Experience', type: 'select', options: ['0–1', '1–3', '3–5', '5–10', '10+'], required: true },
      { name: 'resume', label: 'Upload Resume (PDF only, maximum 5 MB)', type: 'file', wide: true, required: true }]} /></div></Sec></Page>)

export function Blogs() {
  const [q, setQ] = useState(''); const list = BLOGS.filter((b) => (b.title + b.excerpt).toLowerCase().includes(q.toLowerCase()))
  return (<Page title="Blogs"><Sec><div className="mx-auto max-w-3xl"><input className="input mb-8" placeholder="Search articles" aria-label="Search articles" value={q} onChange={(e) => setQ(e.target.value)} />
    {list.length ? <div className="space-y-8">{list.map((b) => <BlogCard key={b.slug} b={b} />)}</div> : <p>No articles match “{q}”. Try a different keyword.</p>}
    <div className="mt-12"><Newsletter /></div></div></Sec></Page>)
}

export function BlogPost({ slug }) {
  const b = BLOGS.find((x) => x.slug === slug)
  return (<Page title="Blogs"><Sec><article className="mx-auto max-w-2xl"><h2 className="mb-6 text-3xl text-teal">{b.title}</h2><img src={b.img} alt="" className="mb-8 w-full rounded-2xl" />{b.body.map((p) => <p key={p} className="mb-5 text-lg leading-relaxed text-ink/80">{p}</p>)}
    <Link to="/blogs" className="text-teal">← All articles</Link></article></Sec></Page>)
}

export const Contact = () => (<Page title="Contact Us"><Sec><InfoCards /></Sec><Sec id="contact"><BookPanel /></Sec></Page>)

export function Team() {
  return (<Page title="Our Team"><Sec><div className="space-y-12">{TEAM.map((m) => (<div key={m.id} id={m.id} className="grid scroll-mt-28 gap-8 md:grid-cols-[280px_1fr]"><img src={m.img} alt={m.name} className="w-full rounded-tl-3xl rounded-br-[80px]" />
    <div><h2 className="text-2xl text-teal">{m.name}</h2><p className="text-ink/70">{m.role}</p><p className="mt-3 text-ink/70">{m.bio}</p></div></div>))}</div></Sec></Page>)
}

export const FaqPage = () => (<Page title="Faqs"><Sec><Accordion items={FAQS} /></Sec></Page>)
export const Policy = ({ slug }) => { const [t, ps] = POLICIES[slug]; return <Page title={t}><Sec><div className="mx-auto max-w-2xl space-y-4 text-ink/80">{ps.map((p) => <p key={p}>{p}</p>)}</div></Sec></Page> }
export const NotFound = () => (<Page title="Page not found"><Sec><PillBtn to="/" className="border border-ink/10">Back to home</PillBtn></Sec></Page>)

const Tick = () => <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-ink text-ink"><Check className="h-3 w-3" /></span>
const List = ({ items }) => <ul className="mb-8 mt-3 space-y-3">{items.map((x) => <li key={x} className="flex items-start gap-3 text-sm text-ink/70"><Tick />{x}</li>)}</ul>

export const CareerForm = () => (<Page title="Career Form">
  <Sec><div className="mb-14 text-center"><h2 className="mx-auto max-w-md text-4xl font-bold leading-tight text-[#0F2E24] md:text-6xl">{CAREER.title}</h2>
    <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink/60"><Link to="/">Home</Link><Chevrons className="h-3 w-3" />Jobs</p></div>
    <div className="grid gap-12 md:grid-cols-[1.7fr_1fr]">
      <div><h3 className="text-base font-semibold">Job Description</h3><p className="mb-8 mt-2 text-sm leading-7 text-ink/70">{CAREER.intro[0]}<b className="text-ink">{CAREER.intro[1]}</b>{CAREER.intro[2]}</p>
        <h3 className="text-base font-semibold">Responsibility</h3><List items={CAREER.duties} /><h3 className="text-base font-semibold">Requirements</h3><List items={CAREER.reqs} /></div>
      <aside><h3 className="mb-4 text-sm font-semibold">Job Details</h3><dl className="space-y-4 text-sm">{CAREER.details.map(([k, v]) => (<div key={k} className="flex items-center justify-between gap-4"><dt className="flex items-center gap-3"><span className="h-3.5 w-3.5 rounded-sm border border-ink" />{k}:</dt><dd className="text-ink/60">{v}</dd></div>))}</dl></aside></div></Sec>
  <Sec id="apply"><div className="mx-auto max-w-3xl text-center"><h2 className="mb-8 text-4xl text-teal">Start Your Application</h2>
    <Form type="career-form" square center button="Submit application" success="Application received. We’ll be in touch." fields={[
      { name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email Address', type: 'email', required: true }, { name: 'phone', label: 'Mobile Number', required: true },
      { name: 'exp', label: 'Years of Experience', type: 'select', options: ['0–1', '1–3', '3–5', '5–10', '10+'], required: true },
      { name: 'resume', label: 'Upload Resume (PDF only, maximum 5 MB)', type: 'file', wide: true, required: true }]} /></div></Sec></Page>)
