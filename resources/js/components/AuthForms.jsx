import { useForm } from '@inertiajs/react'

/** Shared labelled field used by the auth dialogs. */
export function Field({ label, htmlFor, children }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-bold text-navy" htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}

function ErrorText({ children }) {
  if (!children) return null
  return <span className="text-xs font-semibold text-red-600">{children}</span>
}

/**
 * Student login. Posts to Fortify's /login endpoint; Laravel validation errors
 * come back through Inertia and are rendered under each field.
 */
export function LoginForm({ onDone }) {
  const form = useForm({ email: '', password: '', remember: false })

  const submit = (event) => {
    event.preventDefault()

    form.post('/login', {
      preserveScroll: true,
      onSuccess: () => {
        form.reset('password')
        onDone?.()
      }
    })
  }

  return (
    <>
      <h2 className="font-heading font-bold text-navy text-lg">Admin Login</h2>
      <form className="grid gap-3.5 mt-4" onSubmit={submit}>
        <p className="text-sm text-muted">Sign in with your Area 51 admin account to manage course inquiries.</p>
        <Field label="Email" htmlFor="login-email">
          <input
            className="input"
            id="login-email"
            type="text"
            required
            autoComplete="username"
            placeholder="e.g. user@area51.ph"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
          />
          <ErrorText>{form.errors.email}</ErrorText>
        </Field>
        <Field label="Password" htmlFor="login-password">
          <input
            className="input"
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
          />
          <ErrorText>{form.errors.password}</ErrorText>
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-muted">
            <input
              type="checkbox"
              className="accent-teal-700"
              checked={form.data.remember}
              onChange={(e) => form.setData('remember', e.target.checked)}
            />
            Remember me
          </label>
          <a href="#" className="font-bold text-teal hover:underline">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="w-full px-5 py-3 rounded-xl text-sm font-bold bg-teal text-white hover:bg-teal-dark disabled:opacity-70"
          disabled={form.processing}
        >
          {form.processing ? 'Signing in…' : 'Login to Admin Dashboard'}
        </button>
      </form>
    </>
  )
}

/**
 * Registration doubles as the Skillsoft access request: it creates the learner
 * account through Fortify (App\Actions\Fortify\CreateNewUser) with the role
 * selected here.
 */
export function RegisterForm({ onDone }) {
  const form = useForm({
    name: '',
    email: '',
    role: 'student',
    password: '',
    password_confirmation: ''
  })

  const submit = (event) => {
    event.preventDefault()

    form.post('/register', {
      preserveScroll: true,
      onSuccess: () => {
        form.reset('password', 'password_confirmation')
        onDone?.()
      }
    })
  }

  return (
    <>
      <h2 className="font-heading font-bold text-navy text-lg">Register for Skillsoft Access</h2>
      <form className="grid gap-3.5 mt-4" onSubmit={submit}>
        <p className="text-sm text-muted">Create your learner account to access 22,000+ courses and certifications.</p>
        <Field label="Full Name" htmlFor="reg-name">
          <input
            className="input"
            id="reg-name"
            type="text"
            required
            placeholder="Enter your full name"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.target.value)}
          />
          <ErrorText>{form.errors.name}</ErrorText>
        </Field>
        <Field label="Institutional or Personal Email" htmlFor="reg-email">
          <input
            className="input"
            id="reg-email"
            type="email"
            required
            placeholder="name@example.com"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
          />
          <ErrorText>{form.errors.email}</ErrorText>
        </Field>
        <Field label="I am a" htmlFor="reg-role">
          <select
            id="reg-role"
            required
            className="input bg-white"
            value={form.data.role}
            onChange={(e) => form.setData('role', e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty Member</option>
            <option value="professional">Working Professional</option>
            <option value="institution">Institutional Administrator</option>
          </select>
          <ErrorText>{form.errors.role}</ErrorText>
        </Field>
        <Field label="Password" htmlFor="reg-password">
          <input
            className="input"
            id="reg-password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
          />
          <ErrorText>{form.errors.password}</ErrorText>
        </Field>
        <Field label="Confirm Password" htmlFor="reg-password-confirmation">
          <input
            className="input"
            id="reg-password-confirmation"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={form.data.password_confirmation}
            onChange={(e) => form.setData('password_confirmation', e.target.value)}
          />
        </Field>
        <button
          type="submit"
          className="w-full px-5 py-3 rounded-xl text-sm font-bold bg-teal text-white hover:bg-teal-dark disabled:opacity-70"
          disabled={form.processing}
        >
          {form.processing ? 'Submitting…' : 'Submit Registration'}
        </button>
      </form>
    </>
  )
}
