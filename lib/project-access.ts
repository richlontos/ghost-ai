import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

export interface ProjectIdentity {
  userId: string | null
  primaryEmailAddress: string | null
}

export async function getCurrentProjectIdentity(): Promise<ProjectIdentity> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { userId: null, primaryEmailAddress: null }
  }

  return {
    userId: user.id,
    primaryEmailAddress: user.email?.trim().toLowerCase() ?? null,
  }
}

export async function getAccessibleProject(
  projectId: string,
  identity: ProjectIdentity
) {
  if (!identity.userId) return null

  return prisma.project.findFirst({
    where: {
      id: projectId,
      OR: identity.primaryEmailAddress
        ? [
            { ownerId: identity.userId },
            {
              collaborators: {
                some: {
                  email: {
                    equals: identity.primaryEmailAddress,
                    mode: "insensitive",
                  },
                },
              },
            },
          ]
        : [{ ownerId: identity.userId }],
    },
  })
}

export async function userHasProjectAccess(
  projectId: string,
  identity: ProjectIdentity
) {
  const project = await getAccessibleProject(projectId, identity)
  return Boolean(project)
}
