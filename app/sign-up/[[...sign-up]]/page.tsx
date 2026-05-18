"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BrainCircuit, Share2, ScrollText } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const features = [
  {
    icon: BrainCircuit,
    title: "AI Architecture Generation",
    description:
      "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: ScrollText,
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.session) {
      router.push("/editor")
      router.refresh()
      return
    }

    setMessage("Check your email to confirm your account, then sign in.")
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 flex-col bg-bg-surface border-r border-border-default">
        <div className="px-12 pt-10">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-accent-primary flex items-center justify-center shrink-0">
              <span
                className="text-bg-base font-bold text-xs leading-none"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                G
              </span>
            </div>
            <span className="text-sm font-semibold text-text-primary">Ghost AI</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-12 py-16">
          <h1 className="text-4xl font-bold text-text-primary leading-tight tracking-tight mb-5">
            Design systems at the
            <br />
            speed of thought.
          </h1>
          <p className="text-text-secondary text-base leading-relaxed mb-12 max-w-sm">
            Describe your architecture in plain English. Ghost AI maps it to a shared canvas
            your whole team can refine in real time.
          </p>

          <ul className="space-y-7">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-accent-primary-dim flex items-center justify-center">
                  <Icon className="h-5 w-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary leading-snug">{title}</p>
                  <p className="text-sm text-text-muted mt-1 leading-snug">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-12 pb-10">
          <p className="text-xs text-text-faint">© 2026 Ghost AI. All rights reserved.</p>
        </div>
      </div>

      <div className="flex flex-1 lg:w-1/2 items-center justify-center p-8 bg-bg-base">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              Create an account
            </h2>
            <p className="text-sm text-text-muted">
              Enter your email and choose a password to get started.
            </p>
          </div>

          {message ? (
            <div className="rounded-lg border border-border-default bg-bg-surface p-4">
              <p className="text-sm text-text-primary">{message}</p>
              <Link
                href="/sign-in"
                className="mt-2 inline-block text-sm text-accent-primary hover:underline underline-offset-4"
              >
                Go to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text-primary">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-text-primary">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>
              {error && (
                <p className="text-sm" style={{ color: "var(--color-state-error)" }}>
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Create account"}
              </Button>
            </form>
          )}

          <p className="text-sm text-center text-text-muted">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
