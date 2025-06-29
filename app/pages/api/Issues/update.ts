import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { issueSchema } from '@/lib/validation/issueSchema';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();

  const { id } = req.query;
  const parsed = issueSchema.partial().safeParse(req.body); // allow partial updates

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  try {
    const updated = await prisma.issue.update({
      where: { id: String(id) },
      data: parsed.data,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update issue' });
  }
}
