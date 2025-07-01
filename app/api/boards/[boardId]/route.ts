import { NextResponse as BoardIdResponse } from 'next/server'
import { PrismaClient as BoardIdPrismaClient } from '@prisma/client'

const boardIdPrisma = new BoardIdPrismaClient()

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const board = await boardIdPrisma.board.findUnique({ where: { id: params.id } })
    if (!board) return BoardIdResponse.json({ error: 'Board not found' }, { status: 404 })
    return BoardIdResponse.json(board)
  } catch {
    return BoardIdResponse.json({ error: 'Failed to fetch board' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const board = await boardIdPrisma.board.update({ where: { id: params.id }, data: body })
    return BoardIdResponse.json(board)
  } catch {
    return BoardIdResponse.json({ error: 'Failed to update board' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await boardIdPrisma.board.delete({ where: { id: params.id } })
    return new BoardIdResponse(null, { status: 204 })
  } catch {
    return BoardIdResponse.json({ error: 'Failed to delete board' }, { status: 500 })
  }
}