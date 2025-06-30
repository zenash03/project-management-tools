import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const projects = await prisma.project.findMany({ include: { board: true, issues: true } })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const project = await prisma.project.create({ data: body })
    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 400 })
  }
}
