import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;

  try {
    const issue = await prisma.issue.findUnique({
      where: { id: String(id) },
      include: {
        assignee: true,
        column: true,
        subtasks: true,
      },
    });

    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    res.status(200).json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issue' });
  }
}
