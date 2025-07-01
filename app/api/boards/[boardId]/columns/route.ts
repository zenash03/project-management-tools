// app/api/boards/[boardId]/columns/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
type Params = Promise<{ boardId: string }>

export async function GET(_: Request, { params }: { params: Params }) {
  try {
    const { boardId } = await params;

    const columns = await prisma.boardColumn.findMany({
      where: { boardId: boardId },
      orderBy: { order: 'asc' },
      include: {
        issues: {
          include: { assignee: true }
        }
      }
    })
    return NextResponse.json(columns)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch board columns' }, { status: 500 })
  }
}
