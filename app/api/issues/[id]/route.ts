import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const issue = await prisma.issue.findUnique({ where: { id: params.id } })
    if (!issue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    return NextResponse.json(issue)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch issue' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const issue = await prisma.issue.update({ where: { id: params.id }, data: body })
    return NextResponse.json(issue)
  } catch {
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.issue.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 })
  }
}