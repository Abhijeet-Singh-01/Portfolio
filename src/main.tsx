import { Component, type ErrorInfo, type ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { careerObjective, personalBio } from './data/education.ts'
import { sameAsLinks, siteLinks } from './data/socialLinks.ts'
import { experienceState } from './lib/experienceStore.ts'

experienceState.theme = document.documentElement.dataset.theme === 'night' ? 'night' : 'light'

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

class RootErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('RootErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#F8F6FF', background: '#0A0620', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h1 style={{ color: '#FF5FA8', fontSize: '1.5rem' }}>Portfolio Runtime Error</h1>
          <p style={{ color: '#B9B3E6' }}>{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <pre style={{ background: '#130A3B', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem' }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#7C6CFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
)
