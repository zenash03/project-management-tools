import { z } from 'zod'

export const projectCreateSchema = z.object({
  name: z.string().min(1),
  workspaceId: z.string().cuid(),
})

export const projectUpdateSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  workspaceId: z.string().cuid().optional(),
})
