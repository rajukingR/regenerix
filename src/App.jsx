import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { Home, About, Services, ServiceDetail, Careers, CareerForm, Blogs, BlogPost, Contact, Team, Policy, FaqPage, NotFound } from './pages/pages.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/career-form" element={<CareerForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/team-detail" element={<Team />} />
        <Route path="/faqs" element={<FaqPage />} />
        {['privacy-policy', 'terms-and-condition', 'refund-and-returns-policy'].map((p) => <Route key={p} path={`/${p}`} element={<Policy slug={p} />} />)}
        <Route path="/:slug" element={<SlugRouter />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

import { useParams } from 'react-router-dom'
import { SERVICES, BLOGS } from './data.js'
function SlugRouter() {
  const { slug } = useParams()
  if (SERVICES.some((s) => s.slug === slug)) return <ServiceDetail slug={slug} />
  if (BLOGS.some((b) => b.slug === slug)) return <BlogPost slug={slug} />
  return <NotFound />
}
