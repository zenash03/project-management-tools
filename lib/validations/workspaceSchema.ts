import { z } from 'zod'

export const workspaceCreateSchema = z.object({
  name: z.string().min(1),
})

export const workspaceUpdateSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
})
