import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { UIProvider } from './context/UIContext'
import Layout from './components/Layout'
import '../css/app.css'
import '../css/styles.css'

const appName = 'Skillsoft | Area 51'

createInertiaApp({
  title: (title) => (title ? `${title} | ${appName}` : appName),
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./${name}.jsx`,
      import.meta.glob('./pages/**/*.jsx')
    )
    // Every page shares the same chrome: header, footer, modals and toasts.
    page.default.layout = page.default.layout || ((child) => <Layout>{child}</Layout>)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <UIProvider>
          <App {...props} />
        </UIProvider>
      </React.StrictMode>
    )
  },
  progress: { color: '#007D79' }
})
