import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const { id } = req.query;

  try {
    await prisma.issue.delete({ where: { id: String(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete issue' });
  }
}
