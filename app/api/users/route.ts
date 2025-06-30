import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await prisma.user.create({ data: body })
    return NextResponse.json(user, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })
  }
}
