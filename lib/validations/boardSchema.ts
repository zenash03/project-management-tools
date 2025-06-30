import { z } from 'zod'

export const boardCreateSchema = z.object({
  projectId: z.string().cuid(),
})

export const boardUpdateSchema = z.object({
  id: z.string().cuid(),
  projectId: z.string().cuid().optional(),
})
