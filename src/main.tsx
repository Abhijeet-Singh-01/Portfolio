import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { careerObjective, personalBio } from './data/education.ts'
import { sameAsLinks, siteLinks } from './data/socialLinks.ts'

const personSchema = document.createElement('script')
personSchema.type = 'application/ld+json'
personSchema.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalBio.name,
  jobTitle: personalBio.role,
  description: careerObjective,
  email: siteLinks.email.handle,
  url: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,
  sameAs: sameAsLinks,
})
document.head.append(personSchema)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
