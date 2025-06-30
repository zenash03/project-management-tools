import { NextResponse as ProjectIdResponse } from 'next/server'
import { PrismaClient as ProjectIdPrismaClient } from '@prisma/client'

const projectIdPrisma = new ProjectIdPrismaClient()

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const project = await projectIdPrisma.project.findUnique({ where: { id: params.id } })
    if (!project) return ProjectIdResponse.json({ error: 'Project not found' }, { status: 404 })
    return ProjectIdResponse.json(project)
  } catch {
    return ProjectIdResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const project = await projectIdPrisma.project.update({ where: { id: params.id }, data: body })
    return ProjectIdResponse.json(project)
  } catch {
    return ProjectIdResponse.json({ error: 'Failed to update project' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await projectIdPrisma.project.delete({ where: { id: params.id } })
    return new ProjectIdResponse(null, { status: 204 })
  } catch {
    return ProjectIdResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}