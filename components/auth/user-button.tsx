"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useSupabaseUser } from "@/components/providers/supabase-user-provider"

export function UserButton() {
  const router = useRouter()
  const user = useSupabaseUser()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/sign-in")
    router.refresh()
  }

  const initials = user?.email ? user.email.charAt(0).toUpperCase() : "?"

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-xs font-semibold text-bg-base hover:opacity-90 transition-opacity"
        aria-label="User menu"
      >
        {initials}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 min-w-48 rounded-lg border border-border-default bg-bg-surface p-1 shadow-lg">
            {user?.email && (
              <div className="px-3 py-2 text-xs text-text-muted truncate border-b border-border-subtle mb-1">
                {user.email}
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-text-primary hover:bg-bg-elevated transition-colors"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
