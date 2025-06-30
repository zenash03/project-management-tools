import { z } from 'zod'

export const userCreateSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().url().optional(),
})

export const userUpdateSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  image: z.string().url().optional(),
})
export const userDeleteSchema = z.object({
  id: z.string().cuid(),
})
export type UserCreate = z.infer<typeof userCreateSchema>
export type UserUpdate = z.infer<typeof userUpdateSchema>
export type UserDelete = z.infer<typeof userDeleteSchema>