import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const issues = await prisma.issue.findMany()
  return NextResponse.json(issues)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newIssue = await prisma.issue.create({ data: body })
    return NextResponse.json(newIssue, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 400 })
  }
}
