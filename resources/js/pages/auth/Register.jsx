import { Head } from '@inertiajs/react'
import { RegisterForm } from '../../components/AuthForms'

/**
 * Standalone registration screen (GET /register). Mirrors the modal version of
 * the "Register for Skillsoft Access" dialog.
 */
export default function Register() {
  return (
    <main className="bg-soft">
      <Head title="Register for Skillsoft Access" />
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[560px] flex-col justify-center px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xl sm:p-8">
          <RegisterForm />
        </div>
      </div>
    </main>
  )
}
