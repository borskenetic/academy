import { Head } from '@inertiajs/react'
import { LoginForm } from '../../components/AuthForms'

/**
 * Standalone auth screen (GET /login). The same LoginForm is also shown inside
 * the header's modal dialog, so both entry points behave identically.
 */
export default function Login() {
  return (
    <main className="bg-soft">
      <Head title="Admin Login" />
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[560px] flex-col justify-center px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xl sm:p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
