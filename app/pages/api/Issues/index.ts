import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const issues = await prisma.issue.findMany({
      include: {
        assignee: true,
        column: true,
        subtasks: true,
      },
    });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
}
