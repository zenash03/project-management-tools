import { NextResponse as UserIdResponse } from 'next/server'
import { PrismaClient as UserIdPrismaClient } from '@prisma/client'

const userIdPrisma = new UserIdPrismaClient()

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await userIdPrisma.user.findUnique({ where: { id: params.id } })
    if (!user) return UserIdResponse.json({ error: 'User not found' }, { status: 404 })
    return UserIdResponse.json(user)
  } catch {
    return UserIdResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const user = await userIdPrisma.user.update({ where: { id: params.id }, data: body })
    return UserIdResponse.json(user)
  } catch {
    return UserIdResponse.json({ error: 'Failed to update user' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await userIdPrisma.user.delete({ where: { id: params.id } })
    return new UserIdResponse(null, { status: 204 })
  } catch {
    return UserIdResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}