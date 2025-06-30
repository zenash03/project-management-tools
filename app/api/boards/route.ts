import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const boards = await prisma.board.findMany({ include: { columns: true } })
  return NextResponse.json(boards)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const board = await prisma.board.create({ data: body })
    return NextResponse.json(board, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create board' }, { status: 400 })
  }
}
