import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const workspaces = await prisma.workspace.findMany({ include: { members: true, projects: true } })
  return NextResponse.json(workspaces)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const workspace = await prisma.workspace.create({ data: body })
    return NextResponse.json(workspace, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 400 })
  }
}
